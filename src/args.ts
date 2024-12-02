import { Args } from "grimoire-kolmafia";
import { $item } from "libram";

export const args = Args.create(
  "thriftshop",
  "Trade in your hand-me-downs for some vintage gear!",
  {
    commands: Args.group("Commands", {
      browse: Args.flag({
        help: "Will present an overview of all the known standard outfits, the pieces of it you own, how many more are needed for the full set, and how many can be pulverized to acquire previous years' outfits.",
        default: false,
        setting: "",
      }),
      plan: Args.flag({
        help: "Will present a step-by-step list of actions to perform to maximize the number of previous years' outfits.",
        default: false,
        setting: "",
      }),
      shop: Args.flag({
        help: "Will execute the aforementioned plan, and let you walk out the shop with some cool retro outfits!",
        default: false,
        setting: "",
      }),
    }),

    config: Args.group("Configuration", {
      oneshot: Args.item({
        help: "Will attempt to shop for this specific item, ignoring everything else that you may be missing. This requires at least one excess piece of gear accessible from inventory.",
        default: $item`none`,
        setting: "",
      }),
      wait: Args.number({
        help: "Seconds to wait before executing each step of the plan",
        default: 3,
        setting: "",
      }),
      yolo: Args.flag({
        help: "DANGER. Will not ask for confirmation about anything. Potentially useful if you want to include this in a looping script",
        default: false,
        setting: "",
      }),
    }),
  },
);
