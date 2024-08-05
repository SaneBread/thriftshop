import { print } from "kolmafia"
import { Difficulty, Legend } from "./types"
import { Optional, PlanStep, RunPlan, State } from "./types"

export function presentPlan([actions, lastStep]: RunPlan): void {
  print()
  print("ACTION PLAN", "blue")
  const fullPlan: Optional<PlanStep, "action">[] = [...actions, lastStep]
  fullPlan.forEach(({ outfit, currencyLeft, previousYearsCurrency, action }) => {
    const currency = outfit.buyWith ? ` ${currencyLeft} ${outfit.buyWith.name} and` : ""
    print(`With${currency} ${previousYearsCurrency} ${outfit.pulverizesInto.name}:`, "gray")
    if (!action) {
      return
    }
    const { type, quantity, item } = action
    print(`${type} ${quantity} ${item};`)
  })
  print("END OF PLAN", "blue")
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
