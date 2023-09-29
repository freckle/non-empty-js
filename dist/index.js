"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupAllWith = exports.flattenOnNonEmpty = exports.unconsOnNonEmpty = exports.nonEmptyToArray = exports.initOnNonEmpty = exports.tailOnNonEmpty = exports.headOnNonEmpty = exports.lastOnNonEmpty = exports.mapOnNonEmpty = exports.mkNonEmptyFromLast = exports.mkNonEmptyFromHead = exports.mkNonEmptySingleton = exports.mkNonEmptyFromJust = exports.mkNonEmpty = void 0;
const first_1 = __importDefault(require("lodash/first"));
const last_1 = __importDefault(require("lodash/last"));
const map_1 = __importDefault(require("lodash/map"));
const flatten_1 = __importDefault(require("lodash/flatten"));
const sortBy_1 = __importDefault(require("lodash/sortBy"));
const maybe_1 = require("@freckle/maybe");
class NonEmpty {
}
function mkNonEmpty(array) {
    return array.length === 0 ? null : array;
}
exports.mkNonEmpty = mkNonEmpty;
function mkNonEmptyFromJust(array) {
    return (0, maybe_1.fromJust)(mkNonEmpty(array), 'Array that should have been non-empty was empty');
}
exports.mkNonEmptyFromJust = mkNonEmptyFromJust;
function mkNonEmptySingleton(elem) {
    return (0, maybe_1.fromJust)(mkNonEmpty([elem]), "This definitely shouldn't happen! We created a non empty array from an element");
}
exports.mkNonEmptySingleton = mkNonEmptySingleton;
function mkNonEmptyFromHead(head, tail) {
    return (0, maybe_1.fromJust)(mkNonEmpty([head].concat(tail)), "This definitely shouldn't happen! We created a non empty array from the head element and an array");
}
exports.mkNonEmptyFromHead = mkNonEmptyFromHead;
function mkNonEmptyFromLast(init, last) {
    return (0, maybe_1.fromJust)(mkNonEmpty(init.concat([last])), "This definitely shouldn't happen! We created a non empty array from the last element and an array");
}
exports.mkNonEmptyFromLast = mkNonEmptyFromLast;
function mapOnNonEmpty(nonEmpty, f) {
    return (0, maybe_1.fromJust)(mkNonEmpty((0, map_1.default)(nonEmpty, f)), 'Array that should have been non-empty was empty');
}
exports.mapOnNonEmpty = mapOnNonEmpty;
function lastOnNonEmpty(array) {
    const lastElem = (0, last_1.default)(array);
    if (lastElem === undefined) {
        throw new TypeError("This definitely shouldn't happen! The types declare this array to be non-empty");
    }
    else {
        return lastElem;
    }
}
exports.lastOnNonEmpty = lastOnNonEmpty;
function headOnNonEmpty(array) {
    const firstElem = (0, first_1.default)(array);
    if (firstElem === undefined) {
        throw new TypeError("This definitely shouldn't happen! The types declare this array to be non-empty");
    }
    else {
        return firstElem;
    }
}
exports.headOnNonEmpty = headOnNonEmpty;
function tailOnNonEmpty(array) {
    return array.slice(1);
}
exports.tailOnNonEmpty = tailOnNonEmpty;
function initOnNonEmpty(array) {
    return array.slice(0, -1);
}
exports.initOnNonEmpty = initOnNonEmpty;
function nonEmptyToArray(array) {
    return array;
}
exports.nonEmptyToArray = nonEmptyToArray;
function unconsOnNonEmpty(array) {
    return [headOnNonEmpty(array), tailOnNonEmpty(array)];
}
exports.unconsOnNonEmpty = unconsOnNonEmpty;
function flattenOnNonEmpty(array) {
    return (0, maybe_1.fromJust)(mkNonEmpty((0, flatten_1.default)(nonEmptyToArray(array))), 'Array that should have been non-empty was empty');
}
exports.flattenOnNonEmpty = flattenOnNonEmpty;
// https://hackage.haskell.org/package/base-4.18.1.0/docs/Data-List-NonEmpty.html#v:groupAllWith
// `key` is used for sorting and equality comparisons. It is called at least
// twice per item
function groupAllWith(key, array) {
    const sorted = (0, sortBy_1.default)(array, key);
    const results = [];
    sorted.forEach(v => {
        const lastGroup = (0, last_1.default)(results);
        // Item matches prior group so put it there
        if (lastGroup !== undefined && key(headOnNonEmpty(lastGroup)) === key(v)) {
            lastGroup.push(v);
            // Item doesn't match prior group (or group doesn't exist), make new group
        }
        else {
            results.push(mkNonEmptySingleton(v));
        }
    });
    return results;
}
exports.groupAllWith = groupAllWith;
exports.default = {
    mkNonEmpty,
    mkNonEmptySingleton,
    mkNonEmptyFromHead,
    mkNonEmptyFromLast,
    lastOnNonEmpty,
    headOnNonEmpty,
    tailOnNonEmpty,
    unconsOnNonEmpty,
    initOnNonEmpty,
    nonEmptyToArray
};
