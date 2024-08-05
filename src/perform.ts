import {
  abort,
  buy,
  cliExecute,
  cliExecuteOutput,
  itemAmount,
  print,
  userConfirm,
  wait,
} from "kolmafia"
import { Action, EmptyPlanStep, RunPlan } from "./types"
import { PERFORM_STEP_DELAY } from "./config"

function confirm() {
  if (!userConfirm(`Do you want to start thriftshopping?`)) {
    abort("Fine, think about it some more")
  }
  print("Let's go then!", "green")
}

export function perform(plan: RunPlan): void {
  confirm()
  const [steps, finalState] = plan
  steps.forEach(({ action, ...state }) => {
    validate(state)
    print(`Next up: ${action.type} ${action.quantity} ${action.item.name}`, "blue")
    wait(PERFORM_STEP_DELAY)
    performAction(action)
  })
  validate(finalState)
  print(`All possible vintage gear acquired!`, "green")
}

function validate({ outfit, currencyLeft, previousYearsCurrency }: EmptyPlanStep) {
  if (outfit.buyWith && itemAmount(outfit.buyWith) !== currencyLeft) {
    abort(
      `Glitch in the matrix: Expected to have ${currencyLeft} ${
        outfit.buyWith.name
      }, but only found ${itemAmount(outfit.buyWith)}.`
    )
  }
  if (outfit.pulverizesInto && itemAmount(outfit.pulverizesInto) !== previousYearsCurrency) {
    abort(
      `Glitch in the matrix: Expected to have ${previousYearsCurrency} ${
        outfit.pulverizesInto.name
      }, but only found ${itemAmount(outfit.pulverizesInto)}.`
    )
  }
}

function performAction({ type, quantity, item }: Action) {
  if (type === "buy") {
    return buy(item.seller, quantity, item)
  }
  if (type === "pulverize") {
    const result = cliExecute(`pulverize ${quantity} ${item.name}`)
    if (!result) {
      abort("Pulverization failed")
    }
    return true
  }
  abort(`Unidentified action: "${type}"`)
}
