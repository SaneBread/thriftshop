import type { Item, SlotType } from "kolmafia";
import { NonEmptyArray } from "./utils";

/**
 * Current state of a single outfit piece OR smashed piece of gear in the
 * player's posession, along with desired numbers
 */
export type ItemState = {
  item: Item;
  /**
   * The slot the equipment goes into, or null for a spleen/currency item
   */
  slot: SlotType | "pulverized";
  /**
   * A count of how many pieces of gear were found in which part of the player's
   * posession.
   */
  places: {
    inventory: number;
    closet: number;
    storage: number;
    display: number;
    equipped: number;
  };
  /**
   * Sum total of all pieces found
   */
  total: number;
  /**
   * How many of this piece to acquire
   */
  toAcquire: number;
  /**
   * The number of pieces found in the player's inventory, which are the only
   * ones we will consider for smashing purposes.
   */
  usable: number;
  /**
   * The desired number of pieces we want, based on the slot
   */
  desired: number;
  /**
   * The number of NEXT YEAR's currency items we need to complete the desired
   * number for this piece
   */
  buy: number;
  /**
   * The number of excess pieces of this gear (anywhere) that could
   * theoretically be smashed to buy previous years' outfit pieces
   */
  excess: number;
  /**
   * The number of usable, excess pieces of this gear (in inventory) that we can
   * smash to buy previous years' outfit pieces
   */
  canPulverize: number;
};

/**
 * Current state of all outfit pieces in the player's posession and desired numbers
 */
export type SimpleOutfitState = Omit<OutfitConfig, "pieces"> & {
  /**
   * Inventory metadata about the pieces that comprise this outfit
   */
  pieces: NonEmptyArray<ItemState>;
  /**
   * Sum of all desired pieces
   */
  desiredPieces: number;
  /**
   * Total excess pieces of gear in the player's posession
   */
  excessPieces: number;
  /**
   * Total excess pieces of gear that can be smashed
   */
  canSmashPieces: number;
  /**
   * Total pieces of gear in possession
   */
  totalPieces: number;
  /**
   * Pieces of smashed NEXT YEAR gear that is needed as currency to acquire this
   * year's full set
   */
  needPieces: number;
  /**
   * Number of pulverized pieces of gear from this set exist are in the player's posession
   */
  pulverizedPieces: ItemState;
  toAcquirePieces: Map<Item["name"], number>;
};
export type DerivedOutfitState = {
  /**
   * Total sum of excess pieces of gear needed to smash into currency to satisfy
   * ALL previous years' desires
   */
  needPreviousYearsPieces: number;
  /**
   * Total sum of excess pieces of gear needed to smash into currency to satisfy
   * ALL previous years' AND this year's desires
   */
  needTotalPieces: number;
};
export type OutfitState = SimpleOutfitState & DerivedOutfitState;
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type SlotAmounts = {
  [s in SlotType | "pulverized"]?: number;
};
export type State = Array<OutfitState>;

export type SpleenItemMap = { [s: string]: number };
export type Balance = {
  spleenItemsAfter: SpleenItemMap;
};
export type Action = {
  type: "buy" | "pulverize";
  item: Item;
  quantity: number;
};
export type Transaction = Balance & {
  outfit: OutfitState;
  action: Action;
};
/**
 * A reverse array of PlanSteps (last element is first action)
 * There will always be at least one PlanStep in there
 */
export type RunPlan = NonEmptyArray<Transaction | Balance>;

export enum Difficulty {
  "Normal",
  "Hardcore",
}

/**
 * Metadata that's not available in Mafia related to the Standard outfits of that year
 */
export type OutfitConfig = {
  year: number;
  name: string;
  pulverizesInto: Item;
  /**
   * The Pulverized piece of next year's gear that's needed as currency in the
   * Armory and Leggery.
   * null for current year that cant be bought yet.
   */
  buyWith: Item | null;
  pieces: NonEmptyArray<Item>;
  difficulty: Difficulty;
};

export enum Legend {
  Need = "red",
  Complete = "black",
  Excess = "green",
}
