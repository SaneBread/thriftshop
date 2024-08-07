/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  main: () => (/* binding */ main)
});

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
;// CONCATENATED MODULE: ./src/types.ts
/**
 * Current state of a single outfit piece OR smashed piece of gear in the
 * player's posession, along with desired numbers
 */

/**
 * Current state of all outfit pieces in the player's posession and desired numbers
 */

/**
 * A reverse array of PlanSteps (last element is first action)
 * There will always be at least one PlanStep in there
 */
var Difficulty;
/**
 * Metadata that's not available in Mafia related to the Standard outfits of that year
 */

(function (Difficulty) {
  Difficulty[Difficulty["Normal"] = 0] = "Normal";
  Difficulty[Difficulty["Hardcore"] = 1] = "Hardcore";
})(Difficulty || (Difficulty = {}));

var Legend;

(function (Legend) {
  Legend["Need"] = "red";
  Legend["Complete"] = "black";
  Legend["Excess"] = "green";
})(Legend || (Legend = {}));
;// CONCATENATED MODULE: ./src/config.ts
var DESIRED_AMOUNTS = {
  hat: 1,
  weapon: 1,
  // !!! Consider 1-hand vs 2-hands
  "off-hand": 1,
  back: 1,
  shirt: 1,
  pants: 1,
  acc1: 1,
  pulverized: 0
};
var PERFORM_STEP_DELAY = 3;
var LIMIT_UP_TO_YEAR = 2015;
;// CONCATENATED MODULE: ./src/utils.ts

function isNonEmptyArray(arr) {
  return arr.length > 0;
}
function sum(a, b) {
  return a + b;
}
function sortAscending(a, b) {
  return a.year - b.year || a.difficulty - b.difficulty;
}
function sortDescending(a, b) {
  return sortAscending(b, a);
}
function printJSON(text) {
  (0,external_kolmafia_namespaceObject.printHtml)("<pre>".concat(JSON.stringify(text, null, 2), "</pre>"), false);
}
;// CONCATENATED MODULE: ./src/outfits.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var standardOutfits = [{
  year: 2024,
  name: "Adobe Armor",
  difficulty: Difficulty.Hardcore
}, {
  year: 2024,
  name: "Moss Mufti",
  difficulty: Difficulty.Normal
}, {
  year: 2023,
  name: "Ceramic Clothing",
  difficulty: Difficulty.Hardcore
}, {
  year: 2023,
  name: "Chiffon Chiffinery",
  difficulty: Difficulty.Normal
}, {
  year: 2022,
  name: "Flagstone Finery",
  difficulty: Difficulty.Hardcore
}, {
  year: 2022,
  name: "Loofah Loungewear",
  difficulty: Difficulty.Normal
}, {
  year: 2021,
  name: "Stained Glass Suit",
  difficulty: Difficulty.Hardcore
}, {
  year: 2021,
  name: "Velour Vestments",
  difficulty: Difficulty.Normal
}, {
  year: 2020,
  name: "Terra Cotta Tackle",
  difficulty: Difficulty.Hardcore
}, {
  year: 2020,
  name: "Paraffinalia",
  difficulty: Difficulty.Normal
}, {
  year: 2019,
  name: "Marble Materials",
  difficulty: Difficulty.Hardcore
}, {
  year: 2019,
  name: "Chalk Chostume",
  difficulty: Difficulty.Normal
}, {
  year: 2018,
  name: "Fiberglass Finery",
  difficulty: Difficulty.Hardcore
}, {
  year: 2018,
  name: "Gabardine Guise",
  difficulty: Difficulty.Normal
}, {
  year: 2017,
  name: "Wrought Wrappings",
  difficulty: Difficulty.Hardcore
}, {
  year: 2017,
  name: "Aeroutfit",
  difficulty: Difficulty.Normal
}, {
  year: 2016,
  name: "Bakelite Brigandine",
  difficulty: Difficulty.Hardcore
}, {
  year: 2016,
  name: "Wicker Wear",
  difficulty: Difficulty.Normal
}, {
  year: 2015,
  name: "Ceramic Suit",
  difficulty: Difficulty.Hardcore
}, {
  year: 2015,
  name: "Synthetic Suit",
  difficulty: Difficulty.Normal
}]
/**
 * !!! Debugging simplifier; delete!
 */
// .filter((a) => a.difficulty === Difficulty.Hardcore)
// .filter((a) => a.difficulty === Difficulty.Normal)

/**
 * Limit down to a certain year
 */
.filter(a => a.year >= LIMIT_UP_TO_YEAR)
/**
 * Add mafia derived info
 */
.map(o => {
  var pieces = (0,external_kolmafia_namespaceObject.outfitPieces)(o.name);

  if (!isNonEmptyArray(pieces)) {
    throw "Outfit ".concat(o.name, " doesn't contain any pieces!");
  }

  var smashesInto = Object.entries((0,external_kolmafia_namespaceObject.getRelated)(pieces[0], "pulverize"));

  if (!isNonEmptyArray(smashesInto)) {
    throw "Pieces of ".concat(o.name, " don't pulverize into anything!");
  }

  var pulverizesInto = (0,external_kolmafia_namespaceObject.toItem)(smashesInto[0][0]); // key of first item

  return _objectSpread(_objectSpread({}, o), {}, {
    pieces: pieces,
    pulverizesInto: pulverizesInto
  });
})
/**
 * Add next year's pulverizesInto as buyWith currency to this year's set
 */
.sort(sortDescending).reduce((result, outfit) => {
  var _nextYear$pulverizesI;

  var nextYear = result.find(o => o.difficulty === outfit.difficulty && o.year === outfit.year + 1);
  return [].concat(_toConsumableArray(result), [_objectSpread(_objectSpread({}, outfit), {}, {
    buyWith: (_nextYear$pulverizesI = nextYear === null || nextYear === void 0 ? void 0 : nextYear.pulverizesInto) !== null && _nextYear$pulverizesI !== void 0 ? _nextYear$pulverizesI : null
  })]);
}, []).sort(sortAscending);
;// CONCATENATED MODULE: ./src/discover.ts
function discover_toConsumableArray(arr) { return discover_arrayWithoutHoles(arr) || discover_iterableToArray(arr) || discover_unsupportedIterableToArray(arr) || discover_nonIterableSpread(); }

function discover_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function discover_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return discover_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return discover_arrayLikeToArray(o, minLen); }

function discover_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function discover_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return discover_arrayLikeToArray(arr); }

function discover_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function discover_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function discover_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { discover_ownKeys(Object(source), true).forEach(function (key) { discover_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { discover_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function discover_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function discover() {
  return standardOutfits.map(discoverOutfit).reduce(adjustOutfitsForPreviousYears, []);
}

function discoverOutfit(outfit) {
  var pieces = outfit.pieces.map(discoverOutfitPiece); // mapping a NonEmptyArray yields a NonEmptyArray

  var pulverizedPieces = discoverOutfitPiece(outfit.pulverizesInto);
  var desiredPieces = pieces.map(p => p.desired).reduce(sum);
  var excessPieces = pieces.map(p => p.excess).reduce(sum);
  var canSmashPieces = pieces.map(p => p.canPulverize).reduce(sum);
  var totalPieces = pieces.map(p => Math.min(p.total, p.desired)).reduce(sum);
  var needPieces = pieces.map(p => p.buy).reduce(sum);
  var toAcquirePieces = pieces.reduce((result, _ref) => {
    var item = _ref.item,
        toAcquire = _ref.toAcquire;
    return discover_objectSpread(discover_objectSpread({}, result), {}, discover_defineProperty({}, item.name, toAcquire));
  }, {});
  return discover_objectSpread(discover_objectSpread({}, outfit), {}, {
    pieces: pieces,
    desiredPieces: desiredPieces,
    excessPieces: excessPieces,
    canSmashPieces: canSmashPieces,
    totalPieces: totalPieces,
    needPieces: needPieces,
    pulverizedPieces: pulverizedPieces,
    toAcquirePieces: toAcquirePieces
  });
}

function discoverOutfitPiece(item) {
  var _DESIRED_AMOUNTS$slot;

  var slot = item.spleen > 0 ? "pulverized" : (0,external_kolmafia_namespaceObject.toSlot)(item).toString();
  var places = {
    inventory: (0,external_kolmafia_namespaceObject.itemAmount)(item),
    closet: (0,external_kolmafia_namespaceObject.closetAmount)(item),
    storage: (0,external_kolmafia_namespaceObject.storageAmount)(item),
    display: (0,external_kolmafia_namespaceObject.displayAmount)(item),
    equipped: (0,external_kolmafia_namespaceObject.equippedAmount)(item, true)
  };
  var total = Object.values(places).reduce(sum);
  var desired = (_DESIRED_AMOUNTS$slot = DESIRED_AMOUNTS[slot]) !== null && _DESIRED_AMOUNTS$slot !== void 0 ? _DESIRED_AMOUNTS$slot : 0;
  var toAcquire = Math.max(desired - total, 0);
  return {
    item: item,
    slot: slot,
    places: places,
    total: total,
    toAcquire: toAcquire,
    usable: places.inventory,
    desired: desired,
    buy: Math.max(desired - total, 0),
    excess: Math.max(total - desired, 0),
    canPulverize: slot === "pulverized" ? 0 : Math.max(Math.min(total - desired, places.inventory), 0) // Only smash pieces from inventory, and don't re-smash pulverized pieces

  };
}

function adjustOutfitsForPreviousYears(result, outfit) {
  var previousYear = result.find(otherOutfit => otherOutfit.difficulty === outfit.difficulty && otherOutfit.year === outfit.year - 1);
  return [].concat(discover_toConsumableArray(result), [discover_objectSpread(discover_objectSpread({}, outfit), amendTotalPiecesNeeded(outfit, previousYear))]);
}

function amendTotalPiecesNeeded(outfit, previousYear) {
  var _previousYear$needTot;

  var needPreviousYearsPieces = (_previousYear$needTot = previousYear === null || previousYear === void 0 ? void 0 : previousYear.needTotalPieces) !== null && _previousYear$needTot !== void 0 ? _previousYear$needTot : 0;
  return {
    needPreviousYearsPieces: needPreviousYearsPieces,
    needTotalPieces: Math.max(needPreviousYearsPieces - (outfit.pulverizedPieces.usable + outfit.canSmashPieces), 0) + outfit.needPieces
  };
}
;// CONCATENATED MODULE: ./src/present.ts
function present_toConsumableArray(arr) { return present_arrayWithoutHoles(arr) || present_iterableToArray(arr) || present_unsupportedIterableToArray(arr) || present_nonIterableSpread(); }

function present_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function present_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function present_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return present_arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || present_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function present_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return present_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return present_arrayLikeToArray(o, minLen); }

function present_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function presentPlan(plan) {
  (0,external_kolmafia_namespaceObject.print)();
  (0,external_kolmafia_namespaceObject.print)("ACTION PLAN", "blue");

  if (plan.length <= 1) {
    // 1 is initial balance
    (0,external_kolmafia_namespaceObject.print)("We can only look but have nothing to trade", "red");
  } else {
    plan.slice() // new array
    .reverse() // mutates in-place
    .forEach(transaction => {
      if ("action" in transaction) {
        var _transaction$action = transaction.action,
            type = _transaction$action.type,
            quantity = _transaction$action.quantity,
            item = _transaction$action.item;
        (0,external_kolmafia_namespaceObject.print)("".concat(type, " ").concat(quantity, " ").concat(item, ";"));
      }

      presentSpleenBalance(transaction);
    });
  }

  (0,external_kolmafia_namespaceObject.print)("END OF PLAN", "blue");
}

function presentSpleenBalance(transaction) {
  var relevantSpleenItemStrings = Object.entries(transaction.spleenItemsAfter).filter(_ref => {
    var _ref2 = _slicedToArray(_ref, 2),
        amount = _ref2[1];

    return amount > 0;
  }) // .filter(([spleenItemName]) => {
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
  .map(_ref3 => {
    var _ref4 = _slicedToArray(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return "".concat(v, " ").concat(k);
  });
  var printString = relevantSpleenItemStrings.length > 0 ? relevantSpleenItemStrings.join(", ") : "no relevant spleen items";
  (0,external_kolmafia_namespaceObject.print)("With ".concat(printString, ":"), "gray");
}

function presentState(state) {
  state.forEach(outfit => {
    var _outfit$buyWith, _outfit$buyWith2;

    (0,external_kolmafia_namespaceObject.print)("".concat(outfit.name, " (").concat(outfit.year, ", ").concat(Difficulty[outfit.difficulty], ")"), "blue");
    [].concat(present_toConsumableArray(outfit.pieces), [outfit.pulverizedPieces]).forEach(piece => {
      var needsContext = piece.total > piece.usable;
      var context = Object.entries(piece.places).filter(_ref5 => {
        var _ref6 = _slicedToArray(_ref5, 2),
            v = _ref6[1];

        return v > 0;
      }).map(_ref7 => {
        var _ref8 = _slicedToArray(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

        return "".concat(String(v), " in ").concat(k);
      }).join(", ");
      printQuantity("".concat(piece.total, "/").concat(piece.desired, " ").concat(piece.item.name, " (").concat(piece.slot, ")").concat(needsContext ? ": ".concat(context) : ""), piece.total - piece.desired);
    });
    var moreRuns = "more ".concat(Difficulty[outfit.difficulty], " Standard runs");
    printQuantity("-> ".concat(outfit.totalPieces, "/").concat(outfit.desiredPieces, " pieces of outfit completed"), outfit.totalPieces - outfit.desiredPieces);
    printQuantity("-> ".concat(outfit.needPieces, " ").concat((_outfit$buyWith = outfit.buyWith) !== null && _outfit$buyWith !== void 0 ? _outfit$buyWith : moreRuns, " needed to complete the outfit"), -outfit.needPieces);
    printQuantity("-> ".concat(outfit.needPreviousYearsPieces, " ").concat(outfit.pulverizesInto.name, " needed to complete previous years"), outfit.canSmashPieces - (outfit.needPreviousYearsPieces - outfit.pulverizedPieces.usable));
    printQuantity("-> ".concat(outfit.canSmashPieces, "/").concat(outfit.excessPieces, " pieces can be pulverized into ").concat(outfit.pulverizesInto.name, " from inventory"), outfit.canSmashPieces);
    printQuantity("-> ".concat(outfit.canSmashPieces + outfit.pulverizedPieces.usable, " ").concat(outfit.pulverizesInto.name, " can then be used as currency"), outfit.canSmashPieces);
    printQuantity("-> ".concat(outfit.needTotalPieces, " ").concat((_outfit$buyWith2 = outfit.buyWith) !== null && _outfit$buyWith2 !== void 0 ? _outfit$buyWith2 : moreRuns, " needed to complete this and previous years"), -outfit.needTotalPieces);
    (0,external_kolmafia_namespaceObject.print)();
  });
}
function printQuantity(message, balance) {
  var color = balance === 0 ? Legend.Complete : balance < 0 ? Legend.Need : Legend.Excess;
  (0,external_kolmafia_namespaceObject.print)(message, color);
}
;// CONCATENATED MODULE: ./src/plan.ts
function plan_toConsumableArray(arr) { return plan_arrayWithoutHoles(arr) || plan_iterableToArray(arr) || plan_unsupportedIterableToArray(arr) || plan_nonIterableSpread(); }

function plan_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function plan_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function plan_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return plan_arrayLikeToArray(arr); }

function plan_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function plan_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { plan_ownKeys(Object(source), true).forEach(function (key) { plan_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { plan_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function plan_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function plan_slicedToArray(arr, i) { return plan_arrayWithHoles(arr) || plan_iterableToArrayLimit(arr, i) || plan_unsupportedIterableToArray(arr, i) || plan_nonIterableRest(); }

function plan_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function plan_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return plan_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return plan_arrayLikeToArray(o, minLen); }

function plan_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function plan_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function plan_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




function balance(plan, spleenItem) {
  var currentBalance = plan[0].spleenItemsAfter;

  if (spleenItem == null) {
    return 0;
  }

  var itemBalance = currentBalance[spleenItem.name];

  if (typeof itemBalance == "undefined") {
    printJSON(currentBalance);
    (0,external_kolmafia_namespaceObject.abort)("Spleen item ".concat(spleenItem.name, " is not present in balance"));
  }

  return itemBalance;
}
function transact(plan, spleenItemDiff) {
  var currentBalance = plan[0].spleenItemsAfter;
  var changedBalance = Object.entries(spleenItemDiff).reduce((result, _ref) => {
    var _ref2 = plan_slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return plan_objectSpread(plan_objectSpread({}, result), {}, plan_defineProperty({}, k, v + balance(plan, (0,external_kolmafia_namespaceObject.toItem)(k))));
  }, {});
  return plan_objectSpread(plan_objectSpread({}, currentBalance), changedBalance);
}
function makePlan(state) {
  var spleenItemsAfter = state.reduce((result, o) => {
    return plan_objectSpread(plan_objectSpread({}, result), {}, plan_defineProperty({}, o.pulverizesInto.name, o.pulverizedPieces.usable));
  }, {});
  var initialBalance = {
    spleenItemsAfter: spleenItemsAfter
  };
  return state.sort(sortDescending).reduce((plan, outfit) => {
    return planActionsForOutfit(outfit, plan);
  }, [initialBalance]);
}

function planActionsForOutfit(outfit, plan) {
  return [buyPieces, pulverizeExcess, processTransitional].reduce((result, fn) => {
    return fn(outfit, result);
  }, plan);
}

function pulverizeExcess(outfit, plan) {
  return outfit.pieces.filter(piece => piece.canPulverize > 0).reduce((result, piece) => {
    var quantity = Math.min(piece.canPulverize, outfit.needPreviousYearsPieces);

    if (quantity <= 0) {
      return result;
    }

    var action = {
      type: "pulverize",
      quantity: quantity,
      item: piece.item
    };
    var spleenItemsAfter = transact(result, plan_defineProperty({}, outfit.pulverizesInto.name, quantity));
    return [{
      action: action,
      spleenItemsAfter: spleenItemsAfter,
      outfit: outfit
    }].concat(plan_toConsumableArray(result));
  }, plan);
}

function processTransitional(outfit, plan) {
  var _outfit$buyWith$name, _outfit$buyWith;

  var quantity = Math.min(outfit.needPreviousYearsPieces, balance(plan, outfit.buyWith));

  if (!quantity) {
    return plan;
  }

  var item = outfit.pieces[0].item;
  var acquireAction = {
    type: "buy",
    item: item,
    quantity: quantity
  };
  var spleenItemsAfterAcquire = transact(plan, plan_defineProperty({}, (_outfit$buyWith$name = (_outfit$buyWith = outfit.buyWith) === null || _outfit$buyWith === void 0 ? void 0 : _outfit$buyWith.name) !== null && _outfit$buyWith$name !== void 0 ? _outfit$buyWith$name : "null", -quantity));
  var acquireTransation = {
    action: acquireAction,
    spleenItemsAfter: spleenItemsAfterAcquire,
    outfit: outfit
  };
  var pulverizeAction = {
    type: "pulverize",
    item: item,
    quantity: quantity
  };
  var spleenItemsAfterPulverize = transact([acquireTransation].concat(plan_toConsumableArray(plan)), plan_defineProperty({}, outfit.pulverizesInto.name, quantity));
  var pulverizeTransaction = {
    action: pulverizeAction,
    spleenItemsAfter: spleenItemsAfterPulverize,
    outfit: outfit
  };
  return [pulverizeTransaction, acquireTransation].concat(plan_toConsumableArray(plan));
}

function buyPieces(outfit, plan) {
  return Object.entries(outfit.toAcquirePieces).reduce((result, _ref3) => {
    var _outfit$buyWith$name2, _outfit$buyWith2;

    var _ref4 = plan_slicedToArray(_ref3, 2),
        name = _ref4[0],
        amount = _ref4[1];

    var haveSpleenItems = balance(result, outfit.buyWith);

    if (haveSpleenItems <= 0 || amount <= 0) {
      return result;
    }

    var quantity = Math.min(haveSpleenItems, amount);
    var spleenItemsAfter = transact(result, plan_defineProperty({}, (_outfit$buyWith$name2 = (_outfit$buyWith2 = outfit.buyWith) === null || _outfit$buyWith2 === void 0 ? void 0 : _outfit$buyWith2.name) !== null && _outfit$buyWith$name2 !== void 0 ? _outfit$buyWith$name2 : "null", -quantity));
    var action = {
      type: "buy",
      quantity: quantity,
      item: (0,external_kolmafia_namespaceObject.toItem)(name)
    };
    return [{
      action: action,
      spleenItemsAfter: spleenItemsAfter,
      outfit: outfit
    }].concat(plan_toConsumableArray(result));
  }, plan);
}
;// CONCATENATED MODULE: ./src/perform.ts
function perform_slicedToArray(arr, i) { return perform_arrayWithHoles(arr) || perform_iterableToArrayLimit(arr, i) || perform_unsupportedIterableToArray(arr, i) || perform_nonIterableRest(); }

function perform_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function perform_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return perform_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return perform_arrayLikeToArray(o, minLen); }

function perform_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function perform_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function perform_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




function perform_confirm() {
  if (!(0,external_kolmafia_namespaceObject.userConfirm)("Do you want to start thriftshopping?")) {
    (0,external_kolmafia_namespaceObject.abort)("Fine, think about it some more");
  }

  (0,external_kolmafia_namespaceObject.print)("Let's go then!", "green");
}

function perform(plan) {
  perform_confirm();
  plan.slice().reverse().forEach(transaction => {
    if ("action" in transaction) {
      var _transaction$action = transaction.action,
          type = _transaction$action.type,
          quantity = _transaction$action.quantity,
          item = _transaction$action.item;
      (0,external_kolmafia_namespaceObject.print)("Next up: ".concat(type, " ").concat(quantity, " ").concat(item.name), "blue");
      (0,external_kolmafia_namespaceObject.wait)(PERFORM_STEP_DELAY);
      performAction(transaction.action);
    }

    validate(transaction.spleenItemsAfter);
  });
  (0,external_kolmafia_namespaceObject.print)("All possible vintage gear acquired!", "green");
}

function validate(SpleenItemMap) {
  Object.entries(SpleenItemMap).forEach(_ref => {
    var _ref2 = perform_slicedToArray(_ref, 2),
        spleenItem = _ref2[0],
        shouldHave = _ref2[1];

    var doHave = (0,external_kolmafia_namespaceObject.itemAmount)((0,external_kolmafia_namespaceObject.toItem)(spleenItem));

    if (doHave !== shouldHave) {
      (0,external_kolmafia_namespaceObject.abort)("Glitch in the matrix: Expected to have ".concat(shouldHave, " ").concat(spleenItem, ", but only found ").concat(doHave, "."));
    }
  });
}

function performAction(_ref3) {
  var type = _ref3.type,
      quantity = _ref3.quantity,
      item = _ref3.item;

  if (type === "buy") {
    return (0,external_kolmafia_namespaceObject.buy)(item.seller, quantity, item);
  }

  if (type === "pulverize") {
    var result = (0,external_kolmafia_namespaceObject.cliExecute)("pulverize ".concat(quantity, " ").concat(item.name));

    if (!result) {
      (0,external_kolmafia_namespaceObject.abort)("Pulverization failed");
    }

    return true;
  }

  (0,external_kolmafia_namespaceObject.abort)("Unidentified action: \"".concat(type, "\""));
}
;// CONCATENATED MODULE: ./src/thriftshop.ts




function main(args) {
  var doShow = (args === null || args === void 0 ? void 0 : args.split(" ").find(a => a === "look")) || !(args !== null && args !== void 0 && args.length);
  var doPlan = args === null || args === void 0 ? void 0 : args.split(" ").find(a => a === "list");
  var doShop = args === null || args === void 0 ? void 0 : args.split(" ").find(a => a === "shop");
  var state = discover();

  if (doShow) {
    presentState(state);
  }

  var plan = makePlan(state);

  if (doPlan || doShop) {
    presentPlan(plan);
  }

  if (doShop) {
    perform(plan);
  }
}
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;