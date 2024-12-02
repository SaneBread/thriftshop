import { abort, buy, cliExecute, itemAmount, print, toItem, userConfirm, wait } from "kolmafia";
import { Action, RunPlan, SpleenItemMap } from "./types";
import { args } from "./args";

function confirm() {
  if (args.config.yolo) {
    print("YOLO!!!1", "orange");
    wait(args.config.wait);
    return;
  }
  if (!userConfirm(`Do you want to start thriftshopping?`)) {
    abort("Fine, think about it some more");
  }
  print("Let's go then!", "green");
}

export function perform(plan: RunPlan): void {
  confirm();
  plan
    .slice()
    .reverse()
    .forEach((transaction) => {
      if ("action" in transaction) {
        const { type, quantity, item } = transaction.action;
        print();
        print(`Next up: ${type} ${quantity} ${item.name}`, "blue");
        wait(args.config.wait);
        performAction(transaction.action);
      }
      validate(transaction.spleenItemsAfter);
    });
  print(`All possible vintage gear acquired!`, "green");
}

function validate(SpleenItemMap: SpleenItemMap) {
  Object.entries(SpleenItemMap).forEach(([spleenItem, shouldHave]) => {
    const doHave = itemAmount(toItem(spleenItem));
    if (doHave !== shouldHave) {
      abort(
        `Glitch in the matrix: Expected to have ${shouldHave} ${spleenItem}, but only found ${doHave}.`,
      );
    }
  });
}

function performAction({ type, quantity, item }: Action) {
  if (type === "buy") {
    return buy(item.seller, quantity, item);
  }
  if (type === "pulverize") {
    const result = cliExecute(`pulverize ${quantity} ${item.name}`);
    if (!result) {
      abort("Pulverization failed");
    }
    return true;
  }
  abort(`Unidentified action: "${type}"`);
}
