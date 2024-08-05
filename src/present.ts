import { abort, print } from "kolmafia"
import { Balance, Difficulty, Legend, Transaction } from "./types"
import { RunPlan, State } from "./types"
import { printJSON } from "./config"

export function presentPlan(plan: RunPlan): void {
  print()
  print("ACTION PLAN", "blue")
  if (plan.length <= 1) {
    // 1 is initial balance
    print("We can only look but have nothing to trade", "red")
  } else {
    plan
      .slice() // new array
      .reverse() // mutates in-place
      .forEach((transaction) => {
        if ("action" in transaction) {
          const { type, quantity, item } = transaction.action
          print(`${type} ${quantity} ${item};`)
        }
        presentSpleenBalance(transaction)
      })
  }
  print("END OF PLAN", "blue")
}

function presentSpleenBalance(transaction: Balance | Transaction): void {
  const relevantSpleenItemStrings = Object.entries(transaction.spleenItemsAfter)
    .filter(([, amount]) => amount > 0)
    // .filter(([spleenItemName]) => {
    //   if (!("action" in transaction)) {
    //     return true
    //   }
    //   switch (transaction.action.type) {
    //     case "buy":
    //       return spleenItemName === transaction.outfit.buyWith?.name ?? false
    //     case "pulverize":
    //       return spleenItemName === transaction.outfit.pulverizesInto.name
    //     default:
    //       abort(`Invalid action encountered: ${transaction.action.type}`)
    //   }
    // })
    .map(([k, v]) => `${v} ${k}`)

  const printString =
    relevantSpleenItemStrings.length > 0
      ? relevantSpleenItemStrings.join(", ")
      : "no relevant spleen items"
  print(`With ${printString}:`, "gray")
}

export function presentState(state: State): void {
  state.forEach((outfit) => {
    print(`${outfit.name} (${outfit.year}, ${Difficulty[outfit.difficulty]})`, "blue")
    ;[...outfit.pieces, outfit.pulverizedPieces].forEach((piece) => {
      const needsContext = piece.total > piece.usable
      const context = Object.entries(piece.places)
        .filter(([, v]) => v > 0)
        .map(([k, v]) => `${String(v)} in ${k}`)
        .join(", ")
      printQuantity(
        `${piece.total}/${piece.desired} ${piece.item.name} (${piece.slot})${
          needsContext ? `: ${context}` : ""
        }`,
        piece.total - piece.desired
      )
    })

    const moreRuns = `more ${Difficulty[outfit.difficulty]} Standard runs`

    printQuantity(
      `-> ${outfit.totalPieces}/${outfit.desiredPieces} pieces of outfit completed`,
      outfit.totalPieces - outfit.desiredPieces
    )
    printQuantity(
      `-> ${outfit.needPieces} ${outfit.buyWith ?? moreRuns} needed to complete the outfit`,
      -outfit.needPieces
    )
    printQuantity(
      `-> ${outfit.needPreviousYearsPieces} ${outfit.pulverizesInto.name} needed to complete previous years`,
      outfit.canSmashPieces - (outfit.needPreviousYearsPieces - outfit.pulverizedPieces.usable)
    )
    printQuantity(
      `-> ${outfit.canSmashPieces}/${outfit.excessPieces} pieces can be pulverized into ${outfit.pulverizesInto.name} from inventory`,
      outfit.canSmashPieces
    )
    printQuantity(
      `-> ${outfit.canSmashPieces + outfit.pulverizedPieces.usable} ${
        outfit.pulverizesInto.name
      } can then be used as currency`,
      outfit.canSmashPieces
    )
    printQuantity(
      `-> ${outfit.needTotalPieces} ${
        outfit.buyWith ?? moreRuns
      } needed to complete this and previous years`,
      -outfit.needTotalPieces
    )
    print()
  })
}
export function printQuantity(message: string, balance: number): void {
  const color = balance === 0 ? Legend.Complete : balance < 0 ? Legend.Need : Legend.Excess
  print(message, color)
}
