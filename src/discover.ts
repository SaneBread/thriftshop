import {
  closetAmount,
  displayAmount,
  equippedAmount,
  Item,
  itemAmount,
  storageAmount,
  toSlot,
} from "kolmafia";
import { standardOutfits } from "./outfits";
import { OutfitConfig } from "./types";
import { DESIRED_AMOUNTS } from "./config";
import { State } from "./types";
import { DerivedOutfitState, ItemState, OutfitState, SimpleOutfitState } from "./types";
import { NonEmptyArray, sum } from "./utils";
import { args } from "./args";
import { $item } from "libram";

export function discover(): State {
  return standardOutfits.map(discoverOutfit).reduce(adjustOutfitsForPreviousYears, []);
}

function discoverOutfit(outfit: OutfitConfig): SimpleOutfitState {
  const pieces = outfit.pieces.map(discoverOutfitPiece) as NonEmptyArray<ItemState>; // mapping a NonEmptyArray yields a NonEmptyArray
  const pulverizedPieces = discoverOutfitPiece(outfit.pulverizesInto);
  const desiredPieces = pieces.map((p) => p.desired).reduce(sum);
  const excessPieces = pieces.map((p) => p.excess).reduce(sum);
  const canSmashPieces = pieces.map((p) => p.canPulverize).reduce(sum);
  const totalPieces = pieces.map((p) => Math.min(p.total, p.desired)).reduce(sum);
  const needPieces = pieces.map((p) => p.buy).reduce(sum);
  const toAcquirePieces = pieces.reduce<Map<Item["name"], number>>(
    (result, { item, toAcquire }) => ({ ...result, [item.name]: toAcquire }),
    {} as Map<Item["name"], number>,
  );

  return {
    ...outfit,
    pieces,
    desiredPieces,
    excessPieces,
    canSmashPieces,
    totalPieces,
    needPieces,
    pulverizedPieces,
    toAcquirePieces,
  };
}

function discoverOutfitPiece(item: Item): ItemState {
  const slot = item.spleen > 0 ? ("pulverized" as const) : toSlot(item).toString();
  const desired = DESIRED_AMOUNTS[slot] ?? 0;

  const places: ItemState["places"] = {
    inventory:
      item.spleen || args.config.oneshot === $item`none`
        ? itemAmount(item)
        : args.config.oneshot === item
          ? Math.max(0, desired - 1)
          : Math.max(1, itemAmount(item)),
    closet: closetAmount(item),
    storage: storageAmount(item),
    display: displayAmount(item),
    equipped: equippedAmount(item, true),
  };

  const total = Object.values(places).reduce(sum);
  const toAcquire = Math.max(desired - total, 0);

  return {
    item,
    slot,
    places,
    total,
    toAcquire,
    usable: places.inventory,
    desired,
    buy: Math.max(desired - total, 0),
    excess: Math.max(total - desired, 0),
    canPulverize:
      slot === "pulverized" ? 0 : Math.max(Math.min(total - desired, places.inventory), 0), // Only smash pieces from inventory, and don't re-smash pulverized pieces
  };
}

function adjustOutfitsForPreviousYears(
  result: OutfitState[],
  outfit: SimpleOutfitState,
): OutfitState[] {
  const previousYear = result.find(
    (otherOutfit) =>
      otherOutfit.difficulty === outfit.difficulty && otherOutfit.year === outfit.year - 1,
  );

  return [
    ...result,
    {
      ...outfit,
      ...amendTotalPiecesNeeded(outfit, previousYear),
    },
  ];
}

function amendTotalPiecesNeeded(
  outfit: SimpleOutfitState,
  previousYear?: OutfitState,
): DerivedOutfitState {
  const needPreviousYearsPieces = Math.max(
    0,
    (previousYear?.needTotalPieces ?? 0) - outfit.pulverizedPieces.usable,
  );
  return {
    needPreviousYearsPieces: needPreviousYearsPieces,
    needTotalPieces:
      Math.max(
        needPreviousYearsPieces - (outfit.pulverizedPieces.usable + outfit.canSmashPieces),
        0,
      ) + outfit.needPieces,
  };
}
