import {
  closetAmount,
  displayAmount,
  equippedAmount,
  getRelated,
  Item,
  itemAmount,
  outfitPieces,
  print,
  Slot,
  SlotType,
  storageAmount,
  toItem,
  toPlural,
  toSlot,
} from "kolmafia"
import { Difficulty, OutfitConfig, standardOutfits } from "./outfits"
import { Logger, Verbosity } from "./log"

/**
 * Todo list
 * [ ] count smashable items (total in inv only minus desired)
 * [ ] detect available pre-pulverized items (only in inv)
 * [ ] consider possible 1-handed vs 2-handed weapons
 */

const logger = new Logger(Verbosity.info)

type SlotAmounts = {
  [s in SlotType]?: number
}

const desiredAmounts: SlotAmounts = {
  hat: 1,
  weapon: 1, // !!! Consider 1-hand vs 2-hands
  "off-hand": 1,
  back: 1,
  shirt: 1,
  pants: 1,
  acc1: 1,
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

type ItemSearchResult = [
  amountInInventory: number,
  amountElsewhere: number,
  ...searchResults: string[]
]

// function amountAnywhere(i: Item): ItemSearchResult {
//   const initialValue: ItemSearchResult = [itemAmount(i), 0]
//   return [
//     closetAmount,
//     displayAmount,
//     function allEquippedAmount(e: Item) {
//       return equippedAmount(e, true)
//     }, // Also check current familiar equips to be exhaustive
//     storageAmount,
//   ].reduce<ItemSearchResult>(([inv, other, ...results], f) => {
//     const result = f(i)
//     const text = result > 0 ? [`${result} in ${f.name}`] : []
//     result > 0 && logger.log(Verbosity.debug, `[${i.name}] ${f.name}: ${result}`)
//     return [inv, other + result, ...results, ...text]
//   }, initialValue)
// }

// function pulverizesInto(i: Item): Item {
//   return Item.get(Object.keys(getRelated(i, "pulverize"))[0])
// }

// export function brrr(): void {
//   printHtml("<h1>Thriftshop</h1>")
//   print()
//   const initialValue: ShoppingList = []
//   const result = standardOutfits.reduce((list: ShoppingList, o: OutfitConfig): ShoppingList => {
//     logger.log(Verbosity.info, `${o.year}: ${o.name} (${Difficulty[o.type]})`, "blue")
//     const init: ShoppingList[number]["items"] = Object()
//     const items = outfitPieces(o.name).reduce(
//       (acc: ShoppingList[number]["items"], i: Item): ShoppingList[number]["items"] => {
//         const [inventoryAmount, otherAmount, ...searchResults] = amountAnywhere(i)
//         const totalAmount = inventoryAmount + otherAmount
//         const slot = toSlot(i).toString()
//         const desiredAmount = desiredAmounts[slot] ?? 0
//         const color =
//           totalAmount === desiredAmount ? "green" : totalAmount < desiredAmount ? "red" : "purple"
//         const context =
//           otherAmount > 0 ? `(${inventoryAmount} in inventory, ${searchResults.join(", ")})` : ""
//         logger.log(
//           Verbosity.info,
//           `${totalAmount}/${desiredAmount} ${i.name} (${slot}) ${context}`,
//           color
//         )
//         return { ...acc, [i.name]: Math.max(desiredAmount - totalAmount, 0) }
//       },
//       init
//     )

//     const desiredAmount = Object.values(items).reduce((a, b) => a + b)
//     if (o.currency === null) {
//       logger.log(Verbosity.info, `Do more runs`)
//       return list
//     }
//     const [inventoryAmount, otherAmount, ...searchResults] = amountAnywhere(toItem(o.currency))
//     const totalAmount = inventoryAmount + otherAmount
//     const context =
//       otherAmount > 0 ? `(${inventoryAmount} in inventory, ${searchResults.join(", ")})` : ""
//     const color =
//       totalAmount === desiredAmount ? "green" : totalAmount < desiredAmount ? "red" : "purple"
//     logger.log(
//       Verbosity.info,
//       `${totalAmount}/${desiredAmount} ${o.currency} (pulverized) ${context}`,
//       color
//     )
//     return [
//       {
//         fromSet: o,
//         items: { ...items, [o.currency]: Math.max(desiredAmount - totalAmount, 0) },
//         total: desiredAmount,
//       },
//       ...list,
//     ]
//   }, initialValue)
// }

type ItemState = {
  item: Item
  slot: Slot | null
  places: { inventory: number; closet: number; storage: number; display: number; equipped: number }
  total: number
  usable: number
  desired: number
  needCurrency: number
  canSmash: number
}

type OutfitState = {
  outfit: OutfitConfig
  pieces: Array<ItemState>
}

type State = Array<OutfitState>

function sum(a: number, b: number): number {
  return a + b
}

function discoverOutfitPiece(item: Item): ItemState {
  const slot = toSlot(item)

  const places: ItemState["places"] = {
    inventory: itemAmount(item),
    closet: closetAmount(item),
    storage: storageAmount(item),
    display: displayAmount(item),
    equipped: equippedAmount(item, true),
  }

  const total = Object.values(places).reduce(sum)
  const desired = desiredAmounts[slot.toString()] ?? 0

  return {
    item,
    slot,
    places,
    total,
    usable: places.inventory,
    desired,
    needCurrency: Math.max(desired - total, 0),
    canSmash: Math.max(Math.min(total - desired, places.inventory), 0), // Only smash pieces from inventory
  }
}

function discoverOutfit(outfit: OutfitConfig): OutfitState {
  const pieces: OutfitState["pieces"] = outfitPieces(outfit.name).map(discoverOutfitPiece)
  return {
    outfit,
    pieces,
  }
}

export function discover(): State {
  return standardOutfits.map(discoverOutfit)
}

export function show(state: State): void {
  enum Legend {
    Need = "red",
    Ok = "green",
    Excess = "purple",
  }
  state.forEach((outfit) => {
    logger.log(
      Verbosity.info,
      `${outfit.outfit.name} (${outfit.outfit.year}, ${Difficulty[outfit.outfit.type]})`,
      "blue"
    )
    logger.logJSON(Verbosity.debug, outfit.pieces)
    outfit.pieces.forEach((piece) => {
      const legend =
        piece.total === piece.desired
          ? Legend.Ok
          : piece.total < piece.desired
          ? Legend.Need
          : Legend.Excess
      logger.log(
        Verbosity.info,
        `${piece.total}/${piece.desired} ${piece.item.name} (${piece.slot})`,
        legend
      )
    })

    const totalDesired = outfit.pieces.map((p) => p.desired).reduce(sum)
    const smashable = outfit.pieces.map((p) => p.canSmash).reduce(sum)
    const totalHave = outfit.pieces.map((p) => Math.min(p.total, p.desired)).reduce(sum)
    const needed = outfit.pieces.map((p) => p.needCurrency).reduce(sum)
    const smashesInto = Object.keys(getRelated(outfit.pieces[0].item, "pulverize"))[0]

    const currency = outfit.outfit.currency
      ? discoverOutfitPiece(toItem(outfit.outfit.currency))
      : null

    logger.log(Verbosity.info, `-> ${totalHave}/${totalDesired} pieces of set`)
    if (currency && outfit.outfit.currency) {
      logger.log(
        Verbosity.info,
        `-> ${needed} ${outfit.outfit.currency} needed to complete, have ${currency.total}`
      )
    }
    logger.log(Verbosity.info, `-> ${smashable} pieces can be smashed for ${smashesInto}`)
    logger.log(Verbosity.info, "")
  })
}

export function main(): void {
  const state = discover()
  show(state)
  // plan()
  // confirm()
  // do()
}
