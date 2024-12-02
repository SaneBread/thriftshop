# Thriftshop

Trade in your hand-me-downs for some vintage gear!

## Installation

```
git checkout SaneBread/thriftshop release
```

## Things to do

```
Options:
  help - Show this message and exit.

Commands:
  browse - Will present an overview of all the known standard outfits, the pieces of it you own, how many more are needed for the full set, and how many can be pulverized to acquire previous years' outfits.
  plan - Will present a step-by-step list of actions to perform to maximize the number of previous years' outfits.
  shop - Will execute the aforementioned plan, and let you walk out the shop with some cool retro outfits!

Configuration:
  oneshot ITEM - Will attempt to shop for this specific item, ignoring everything else that you may be missing. This requires at least one excess piece of gear accessible from inventory. [default: none]
  wait NUMBER - Seconds to wait before executing each step of the plan [default: 3]
  yolo - DANGER. Will not ask for confirmation about anything. Potentially useful if you want to include this in a looping script [default: false]
```

## FAQ

### Can I trust this script to not go haywire and randomly pulverize my hard-earned standard gear?

_No_. That said, I did put in a bunch of failsaves to reduce the risk of such things happening. The browse and plan section are excrutiatingly verbose, and if during execution the expectations of the script are not met, it should immediately abort. You can also copy/paste individual lines from the plan, provides you have your `autoSatisfyWithCoinmasters` pref set to `true`. The script should only act on stuff in your inventory, so if you feel particularly nervous about seomthing, your closet is your friend.

### Can I target a specific item if I don't have enough to get all the gear from later years first?

Yes! Try the `oneshot` config option, something like this:

```
cls; thriftshop oneshot "aerogel anvil" browse plan
```

Note that in order to implement this, the numbers presented in the browse section will be fudged and you should not trust them. There's a big red warning to help remind you of that, too. If you want to see more accurate numbers, remove the `oneshot` option from your command.

## Todo list

- [ ] consider possible 1-handed vs 2-handed weapons, and single-equip accessories
- [ ] allow multiple copies per slot in accordance with mafia prefs
- [x] target a specific item
- [x] proper arg handling
- [x] write readme
