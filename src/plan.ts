import { abort, Item, toItem } from "kolmafia";
import { sortDescending } from "./utils";
import { Action, OutfitState, RunPlan, SpleenItemMap } from "./types";
import { printJSON } from "./utils";

export function balance(plan: RunPlan, spleenItem: Item | null): number {
  const currentBalance = plan[0].spleenItemsAfter;
  if (spleenItem == null) {
    return 0;
  }

  const itemBalance = currentBalance[spleenItem.name];
  if (typeof itemBalance == "undefined") {
    printJSON(currentBalance);
    abort(`Spleen item ${spleenItem.name} is not present in balance`);
  }

  return itemBalance;
}

export function transact(plan: RunPlan, spleenItemDiff: SpleenItemMap): SpleenItemMap {
  const currentBalance = plan[0].spleenItemsAfter;
  const changedBalance = Object.entries(spleenItemDiff).reduce<SpleenItemMap>((result, [k, v]) => {
    return { ...result, [k]: v + balance(plan, toItem(k)) };
  }, {});

  return {
    ...currentBalance,
    ...changedBalance,
  };
}

export function makePlan(state: OutfitState[]): RunPlan {
  const spleenItemsAfter = state.reduce<SpleenItemMap>((result, o) => {
    return {
      ...result,
      [o.pulverizesInto.name]: o.pulverizedPieces.usable,
    };
  }, {});
  const initialBalance = { spleenItemsAfter };

  return state.sort(sortDescending).reduce<RunPlan>(
    (plan, outfit) => {
      return planActionsForOutfit(outfit, plan);
    },
    [initialBalance],
  );
}

function planActionsForOutfit(outfit: OutfitState, plan: RunPlan): RunPlan {
  return [buyPieces, pulverizeExcess, processTransitional].reduce<RunPlan>((result, fn) => {
    return fn(outfit, result);
  }, plan);
}

function pulverizeExcess(outfit: OutfitState, plan: RunPlan): RunPlan {
  return outfit.pieces
    .filter((piece) => piece.canPulverize > 0)
    .reduce((result, piece): RunPlan => {
      const quantity = Math.min(piece.canPulverize, outfit.needPreviousYearsPieces);
      if (quantity <= 0) {
        return result;
      }
      const action: Action = { type: "pulverize", quantity, item: piece.item };
      const spleenItemsAfter = transact(result, {
        [outfit.pulverizesInto.name]: quantity,
      });
      return [{ action, spleenItemsAfter, outfit }, ...result];
    }, plan);
}

function processTransitional(outfit: OutfitState, plan: RunPlan): RunPlan {
  const quantity = Math.min(outfit.needPreviousYearsPieces, balance(plan, outfit.buyWith));
  if (!quantity) {
    return plan;
  }

  const item = outfit.pieces[0].item;
  const acquireAction: Action = {
    type: "buy",
    item,
    quantity,
  };
  const spleenItemsAfterAcquire = transact(plan, { [outfit.buyWith?.name ?? "null"]: -quantity });
  const acquireTransation = {
    action: acquireAction,
    spleenItemsAfter: spleenItemsAfterAcquire,
    outfit,
  };

  const pulverizeAction: Action = { type: "pulverize", item, quantity };
  const spleenItemsAfterPulverize = transact([acquireTransation, ...plan], {
    [outfit.pulverizesInto.name]: quantity,
  });
  const pulverizeTransaction = {
    action: pulverizeAction,
    spleenItemsAfter: spleenItemsAfterPulverize,
    outfit,
  };

  return [pulverizeTransaction, acquireTransation, ...plan];
}

function buyPieces(outfit: OutfitState, plan: RunPlan): RunPlan {
  return Object.entries(outfit.toAcquirePieces).reduce((result, [name, amount]): RunPlan => {
    const haveSpleenItems = balance(result, outfit.buyWith);
    if (haveSpleenItems <= 0 || amount <= 0) {
      return result;
    }
    const quantity = Math.min(haveSpleenItems, amount);
    const spleenItemsAfter = transact(result, { [outfit.buyWith?.name ?? "null"]: -quantity });
    const action: Action = { type: "buy", quantity, item: toItem(name) };
    return [{ action, spleenItemsAfter, outfit }, ...result];
  }, plan);
}
