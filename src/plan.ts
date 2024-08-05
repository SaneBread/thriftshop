import { toItem } from "kolmafia"
import { sortDescending, standardOutfits } from "./outfits"
import { Action, EmptyPlanStep, OutfitState, RunPlan } from "./types"

export function makePlan(state: OutfitState[]): RunPlan {
  const rolloverCurrencyMap: { [s: string]: number } = {}
  return state.sort(sortDescending).reduce<RunPlan>(
    ([previousActions, firstStep], outfit) => {
      const [actions, nextStep] = planActionsForOutfit(outfit, rolloverCurrencyMap, firstStep)
      return [[...previousActions, ...actions], nextStep]
    },
    [[], {} as EmptyPlanStep]
  )
}

function findYearFrom(outfit: OutfitState, diff: number) {
  return standardOutfits.find(
    (otherOutfit) =>
      otherOutfit.difficulty === outfit.difficulty && otherOutfit.year === outfit.year + diff
  )
}

function pulverizeExcess(outfit: OutfitState, lastStep: EmptyPlanStep): RunPlan {
  const initialValue: RunPlan = [[], lastStep]
  return outfit.pieces
    .filter((piece) => piece.canPulverize > 0)
    .reduce((result, piece): RunPlan => {
      const [previousActions, nextStep] = result
      const quantity = Math.min(piece.canPulverize, outfit.needPreviousYearsPieces)
      if (!quantity) {
        return result
      }
      const action: Action = { type: "pulverize", quantity, item: piece.item }
      const previousYearsCurrency = nextStep.previousYearsCurrency + quantity
      return [[...previousActions, { ...nextStep, action }], { ...nextStep, previousYearsCurrency }]
    }, initialValue)
}
function processTransitional(outfit: OutfitState, lastStep: EmptyPlanStep): RunPlan {
  const quantity = Math.min(outfit.needPreviousYearsPieces, lastStep.currencyLeft)
  if (!quantity) {
    return [[], lastStep]
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const item = outfit.pieces[0]!.item
  const acquireAction: Action = {
    type: "buy",
    item,
    quantity,
  }
  const currencyLeft = lastStep.currencyLeft - quantity
  const pulverizeAction: Action = { type: "pulverize", item, quantity }
  const previousYearsCurrency = lastStep.previousYearsCurrency + quantity

  return [
    [
      { ...lastStep, action: acquireAction },
      { ...lastStep, action: pulverizeAction, currencyLeft },
    ],
    { ...lastStep, currencyLeft, previousYearsCurrency },
  ]
}
function planActionsForOutfit(
  outfit: OutfitState,
  rolloverCurrencies: { [s: string]: number },
  lastStepOfLastYear?: EmptyPlanStep
): RunPlan {
  const previousYearCoin = findYearFrom(outfit, -1)?.pulverizesInto.name
  const firstStepOfTheYear: EmptyPlanStep = {
    outfit,
    currencyLeft: lastStepOfLastYear?.previousYearsCurrency ?? 0,
    previousYearsCurrency: rolloverCurrencies[previousYearCoin!] ?? 0,
  }
  return [buyPieces, pulverizeExcess, processTransitional].reduce<RunPlan>(
    (result, fn) => {
      const [initialActions, firstStep] = result
      const [actions, lastStep] = fn(outfit, firstStep)
      return [[...initialActions, ...actions], lastStep]
    },
    [[], firstStepOfTheYear]
  )
}

function buyPieces(outfit: OutfitState, lastStep: EmptyPlanStep): RunPlan {
  const initialValue: RunPlan = [[], lastStep]
  return Object.entries(outfit.toAcquirePieces).reduce((result, [name, amount]): RunPlan => {
    const [previousActions, nextStep] = result
    if (!nextStep.currencyLeft || !amount) {
      return result
    }
    const quantity = Math.min(nextStep.currencyLeft, amount)
    const currencyLeft = nextStep.currencyLeft - quantity
    const action: Action = { type: "buy", quantity, item: toItem(name) }
    // const action = `buy ${spend} ${name}`
    return [[...previousActions, { ...nextStep, action }], { ...nextStep, currencyLeft }]
  }, initialValue)
}
