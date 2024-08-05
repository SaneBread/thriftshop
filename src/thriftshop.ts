import { printHtml } from "kolmafia"
import { discover } from "./discover"
import { presentPlan, presentState } from "./present"
import { makePlan } from "./plan"
import { perform } from "./perform"

export function main(args: string): void {
  const doShow = args?.split(" ").find((a) => a === "show") || !args?.length
  const doPlan = args?.split(" ").find((a) => a === "plan")
  const doShop = args?.split(" ").find((a) => a === "shop")

  const state = discover()
  if (doShow) {
    presentState(state)
  }

  const plan = makePlan(state)
  if (doPlan || doShop) {
    presentPlan(plan)
  }

  if (doShop) {
    perform(plan)
  }
}

/**
 * ## Todo list
 *
 * [ ] consider possible 1-handed vs 2-handed weapons and obey mafia prefs for
 * slots
 */
