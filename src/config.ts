import { printHtml } from "kolmafia"
import { SlotAmounts } from "./types"

export const DESIRED_AMOUNTS: SlotAmounts = {
  hat: 1,
  weapon: 1, // !!! Consider 1-hand vs 2-hands
  "off-hand": 1,
  back: 1,
  shirt: 1,
  pants: 1,
  acc1: 1,
  pulverized: 0,
}

export const PERFORM_STEP_DELAY = 3 as const
export const LIMIT_UP_TO_YEAR = 2015 as const

export function printJSON(text: unknown): void {
  printHtml(`<pre>${JSON.stringify(text, null, 2)}</pre>`, false)
}
