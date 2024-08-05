import { getRelated, outfitPieces, toItem } from "kolmafia"
import { Difficulty, OutfitConfig } from "./types"
import { LIMIT_UP_TO_YEAR } from "./config"
import { isNonEmptyArray, sortAscending, sortDescending } from "./utils"

export const standardOutfits: OutfitConfig[] = [
  {
    year: 2024,
    name: "Adobe Armor",
    difficulty: Difficulty.Hardcore,
  },
  {
    year: 2024,
    name: "Moss Mufti",
    difficulty: Difficulty.Normal,
  },
  {
    year: 2023,
    name: "Ceramic Clothing",
    difficulty: Difficulty.Hardcore,
  },
  {
    year: 2023,
    name: "Chiffon Chiffinery",
    difficulty: Difficulty.Normal,
  },
  {
    year: 2022,
    name: "Flagstone Finery",
    difficulty: Difficulty.Hardcore,
  },
  {
    year: 2022,
    name: "Loofah Loungewear",
    difficulty: Difficulty.Normal,
  },
  {
    year: 2021,
    name: "Stained Glass Suit",
    difficulty: Difficulty.Hardcore,
  },
  {
    year: 2021,
    name: "Velour Vestments",
    difficulty: Difficulty.Normal,
  },
  {
    year: 2020,
    name: "Terra Cotta Tackle",
    difficulty: Difficulty.Hardcore,
  },
  {
    year: 2020,
    name: "Paraffinalia",
    difficulty: Difficulty.Normal,
  },
  {
    year: 2019,
    name: "Marble Materials",
    difficulty: Difficulty.Hardcore,
  },
  {
    year: 2019,
    name: "Chalk Chostume",
    difficulty: Difficulty.Normal,
  },
  {
    year: 2018,
    name: "Fiberglass Finery",
    difficulty: Difficulty.Hardcore,
  },
  {
    year: 2018,
    name: "Gabardine Guise",
    difficulty: Difficulty.Normal,
  },
  {
    year: 2017,
    name: "Wrought Wrappings",
    difficulty: Difficulty.Hardcore,
  },
  {
    year: 2017,
    name: "Aeroutfit",
    difficulty: Difficulty.Normal,
  },
  {
    year: 2016,
    name: "Bakelite Brigandine",
    difficulty: Difficulty.Hardcore,
  },
  {
    year: 2016,
    name: "Wicker Wear",
    difficulty: Difficulty.Normal,
  },
  {
    year: 2015,
    name: "Ceramic Suit",
    difficulty: Difficulty.Hardcore,
  },
  {
    year: 2015,
    name: "Synthetic Suit",
    difficulty: Difficulty.Normal,
  },
]
  /**
   * !!! Debugging simplifier; delete!
   */
  // .filter((a) => a.difficulty === Difficulty.Hardcore)
  // .filter((a) => a.difficulty === Difficulty.Normal)
  /**
   * Limit down to a certain year
   */
  .filter((a) => a.year >= LIMIT_UP_TO_YEAR)
  /**
   * Add mafia derived info
   */
  .map((o) => {
    const pieces = outfitPieces(o.name)
    if (!isNonEmptyArray(pieces)) {
      throw `Outfit ${o.name} doesn't contain any pieces!`
    }
    const smashesInto = Object.entries(getRelated(pieces[0], "pulverize"))
    if (!isNonEmptyArray(smashesInto)) {
      throw `Pieces of ${o.name} don't pulverize into anything!`
    }
    const pulverizesInto = toItem(smashesInto[0][0]) // key of first item
    return { ...o, pieces, pulverizesInto }
  })
  /**
   * Add next year's pulverizesInto as buyWith currency to this year's set
   */
  .sort(sortDescending)
  .reduce<OutfitConfig[]>((result, outfit) => {
    const nextYear = result.find(
      (o) => o.difficulty === outfit.difficulty && o.year === outfit.year + 1
    )
    return [...result, { ...outfit, buyWith: nextYear?.pulverizesInto ?? null }]
  }, [])
  .sort(sortAscending)
