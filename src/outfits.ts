import { getRelated, Item, outfitPieces, toItem } from "kolmafia"

export enum Difficulty {
  "Normal",
  "Hardcore",
}

/**
 * Metadata that's not available in Mafia related to the Standard outfits of that year
 */
export type OutfitConfig = {
  year: number
  name: string
  pulverizesInto: Item
  /**
   * The Pulverized piece of next year's gear that's needed as currency in the
   * Armory and Leggery.
   * null for current year that cant be bought yet.
   */
  buyWith: Item | null
  pieces: Array<Item>
  difficulty: Difficulty
}

export function sortAscending<T extends { year: number; difficulty: Difficulty }>(
  a: T,
  b: T
): number {
  return a.year - b.year || a.difficulty - b.difficulty
}
export function sortDescending<T extends { year: number; difficulty: Difficulty }>(
  a: T,
  b: T
): number {
  return sortAscending(b, a)
}

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
  .filter((a) => a.difficulty === Difficulty.Normal)
  /**
   * Add mafia derived info
   */
  .map((o) => {
    const pieces = outfitPieces(o.name)
    const pulverizesInto = toItem(Object.keys(getRelated(pieces[0], "pulverize"))[0])
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
  .sort((a, b) => a.year - b.year || a.difficulty - b.difficulty)
