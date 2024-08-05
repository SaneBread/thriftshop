export enum Difficulty {
  "Normal",
  "Hardcore",
}

export type OutfitConfig = {
  year: number
  name: string
  currency: string | null
  type: Difficulty
}

export const standardOutfits: OutfitConfig[] = [
  {
    year: 2024,
    name: "Adobe Armor",
    currency: null,
    type: Difficulty.Hardcore,
  },
  {
    year: 2024,
    name: "Moss Mufti",
    currency: null,
    type: Difficulty.Normal,
  },
  {
    year: 2023,
    name: "Ceramic Clothing",
    currency: "adobe assortment",
    type: Difficulty.Hardcore,
  },
  {
    year: 2023,
    name: "Chiffon Chiffinery",
    currency: "moss mulch",
    type: Difficulty.Normal,
  },
  {
    year: 2022,
    name: "Flagstone Finery",
    currency: "ceramic scree",
    type: Difficulty.Hardcore,
  },
  {
    year: 2022,
    name: "Loofah Loungewear",
    currency: "chiffon carbage",
    type: Difficulty.Normal,
  },
  {
    year: 2021,
    name: "Stained Glass Suit",
    currency: "flagstone flagments",
    type: Difficulty.Hardcore,
  },
  {
    year: 2020,
    name: "Terra Cotta Tackle",
    currency: "stained glass shards",
    type: Difficulty.Hardcore,
  },
  {
    year: 2019,
    name: "Marble Materials",
    currency: "terra cotta tidbits",
    type: Difficulty.Hardcore,
  },
  {
    year: 2018,
    name: "Fiberglass Finery",
    currency: "marble molecules",
    type: Difficulty.Hardcore,
  },
  {
    year: 2017,
    name: "Wrought Wrappings",
    currency: "fiberglass fibers",
    type: Difficulty.Hardcore,
  },
  {
    year: 2016,
    name: "Bakelite Brigandine",
    currency: "wrought-iron flakes",
    type: Difficulty.Hardcore,
  },
  {
    year: 2015,
    name: "Ceramic Suit",
    currency: "bakelite bits",
    type: Difficulty.Hardcore,
  },
  {
    year: 2021,
    name: "Velour Vestments",
    currency: "loofah lumps",
    type: Difficulty.Normal,
  },
].sort((a, b) => a.year - b.year || a.type - b.type)
