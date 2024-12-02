import { discover } from "./discover";
import { presentPlan, presentState } from "./present";
import { makePlan } from "./plan";
import { perform } from "./perform";
import { Args } from "grimoire-kolmafia";
import { args } from "./args";

export function main(command?: string): void {
  Args.fill(args, command);

  const keys = Object.keys(args.commands) as (keyof typeof args.commands)[];
  if (args.help || keys.every((k) => !args.commands[k])) return Args.showHelp(args);

  const state = discover();
  if (args.commands.browse) {
    presentState(state);
  }

  const plan = makePlan(state);
  if (args.commands.plan || args.commands.shop) {
    presentPlan(plan);
  }

  if (args.commands.shop) {
    perform(plan);
  }
}
