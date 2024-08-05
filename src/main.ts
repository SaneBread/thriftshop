import {
  closetAmount,
  displayAmount,
  equippedAmount,
  Item,
  itemAmount,
  outfit,
  outfitPieces,
  print,
  Slot,
  SlotType,
  storageAmount,
  toSlot,
} from "kolmafia"
import { Difficulty, OutfitConfig, sortDescending, standardOutfits } from "./outfits"

/**
 * Todo list
 * [ ] count smashable items (total in inv only minus desired)
 * [ ] detect available pre-pulverized items (only in inv)
 * [ ] consider possible 1-handed vs 2-handed weapons and obey mafia prefs for slots
 */

/**
 * Current state of all outfit pieces in the player's posession and desired numbers
 */
type SimpleOutfitState = Omit<OutfitConfig, "pieces"> & {
  pieces: Array<ItemState>
  /**
   * Sum of all desired pieces
   */
  desiredPieces: number
  /**
   * Total excess pieces of gear in the player's posession
   */
  excessPieces: number
  /**
   * Total excess pieces of gear that can be smashed
   */
  canSmashPieces: number
  /**
   * Total pieces of gear in possession
   */
  totalPieces: number
  /**
   * Pieces of smashed NEXT YEAR gear that is needed as currency to acquire this
   * year's full set
   */
  needPieces: number
  /**
   * Number of pulverized pieces of gear from this set exist are in the player's posession
   */
  pulverizedPieces: ItemState
}

type DerivedOutfitState = {
  /**
   * Total sum of excess pieces of gear needed to smash into currency to satisfy
   * ALL previous years' desires
   */
  needPreviousYearsPieces: number
  /**
   * Total sum of excess pieces of gear needed to smash into currency to satisfy
   * ALL previous years' AND this year's desires
   */
  needTotalPieces: number
}

type OutfitState = SimpleOutfitState & DerivedOutfitState

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

type SlotAmounts = {
  [s in SlotType | "pulverized"]?: number
}

const desiredAmounts: SlotAmounts = {
  hat: 1,
  weapon: 1, // !!! Consider 1-hand vs 2-hands
  "off-hand": 1,
  back: 1,
  shirt: 1,
  pants: 1,
  acc1: 1,
  pulverized: 0,
}
// const desiredAmounts: SlotAmounts = {
//   hat: 2,
//   weapon: 3, // !!! Consider 1-hand vs 2-hands
//   "off-hand": 2,
//   back: 2,
//   shirt: 1,
//   pants: 2,
//   acc1: 1,
// }

/**
 * Current state of a single outfit piece OR smashed piece of gear in the
 * player's posession, along with desired numbers
 */
type ItemState = {
  item: Item
  /**
   * The slot the equipment goes into, or null for a spleen/currency item
   */
  slot: SlotType | "pulverized"
  /**
   * A count of how many pieces of gear were found in which prt of the player's
   * posession.
   */
  places: {
    inventory: number
    closet: number
    storage: number
    display: number
    equipped: number
  }
  /**
   * Sum total of all pieces found
   */
  total: number
  /**
   * The number of pieces found in the player's inventory, which are the only
   * ones we will consider for smashing purposes.
   */
  usable: number
  /**
   * The desired number of pieces we want, based on the slot
   */
  desired: number
  /**
   * The number of NEXT YEAR's currency items we need to complete the desired
   * number for this piece
   */
  buy: number
  /**
   * The number of excess pieces of this gear (anywhere) that could
   * theoretically be smashed to buy previous years' outfit pieces
   */
  excess: number
  /**
   * The number of usable, excess pieces of this gear (in inventory) that we can
   * smash to buy previous years' outfit pieces
   */
  canPulverize: number
}

type State = Array<OutfitState>

function sum(a: number, b: number): number {
  return a + b
}

function printQuantity(message: string, balance: number, zeroIsGood = true) {
  enum Legend {
    Need = "red",
    Neutral = "black",
    Complete = "black",
    Excess = "green",
  }
  // enum Legend {
  //   Need = "red",
  //   Neutral = "black",
  //   Complete = "green",
  //   Excess = "purple",
  // }
  const color =
    balance === 0
      ? zeroIsGood
        ? Legend.Complete
        : Legend.Neutral
      : balance < 0
      ? Legend.Need
      : Legend.Excess
  print(message, color)
}

function discoverOutfitPiece(item: Item): ItemState {
  const slot = item.spleen > 0 ? ("pulverized" as const) : toSlot(item).toString()

  const places: ItemState["places"] = {
    inventory: itemAmount(item),
    closet: closetAmount(item),
    storage: storageAmount(item),
    display: displayAmount(item),
    equipped: equippedAmount(item, true),
  }

  const total = Object.values(places).reduce(sum)
  const desired = desiredAmounts[slot] ?? 0

  return {
    item,
    slot,
    places,
    total,
    usable: places.inventory,
    desired,
    buy: Math.max(desired - total, 0),
    excess: Math.max(total - desired, 0),
    canPulverize:
      slot === "pulverized" ? 0 : Math.max(Math.min(total - desired, places.inventory), 0), // Only smash pieces from inventory, and don't re-smash pulverized pieces
  }
}

function discoverOutfit(outfit: OutfitConfig): SimpleOutfitState {
  const pieces = outfitPieces(outfit.name).map(discoverOutfitPiece)
  const pulverizedPieces = discoverOutfitPiece(outfit.pulverizesInto)
  const desiredPieces = pieces.map((p) => p.desired).reduce(sum)
  const excessPieces = pieces.map((p) => p.excess).reduce(sum)
  const canSmashPieces = pieces.map((p) => p.canPulverize).reduce(sum)
  const totalPieces = pieces.map((p) => Math.min(p.total, p.desired)).reduce(sum)
  const needPieces = pieces.map((p) => p.buy).reduce(sum)

  return {
    ...outfit,
    pieces,
    desiredPieces,
    excessPieces,
    canSmashPieces,
    totalPieces,
    needPieces,
    pulverizedPieces,
  }
}

function adjustOutfitsForPreviousYears(
  result: OutfitState[],
  outfit: SimpleOutfitState
): OutfitState[] {
  const previousYear = result.find(
    (otherOutfit) =>
      otherOutfit.difficulty === outfit.difficulty && otherOutfit.year === outfit.year - 1
  )

  return [
    ...result,
    {
      ...outfit,
      ...amendTotalPiecesNeeded(outfit, previousYear),
    },
  ]
}

function amendTotalPiecesNeeded(
  outfit: SimpleOutfitState,
  previousYear?: OutfitState
): DerivedOutfitState {
  const needPreviousYearsPieces = previousYear?.needTotalPieces ?? 0
  return {
    needPreviousYearsPieces: needPreviousYearsPieces,
    needTotalPieces:
      Math.max(
        needPreviousYearsPieces - (outfit.pulverizedPieces.usable + outfit.canSmashPieces),
        0
      ) + outfit.needPieces,
  }
}

function discover(): State {
  return standardOutfits.map(discoverOutfit).reduce(adjustOutfitsForPreviousYears, [])
}

function show(state: State): void {
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

type RunPlan = {
  actions: string[]
}

function planActionsForOutfit(plan: RunPlan, outfit: OutfitState) {
  return plan
}

function plan(state: OutfitState[]): RunPlan {
  const initialPlan = { actions: [] }
  return state.sort(sortDescending).reduce(planActionsForOutfit, initialPlan)
}

export function main(): void {
  const state = discover()
  show(state)
  plan(state)
  // confirm()
  // do()
}
