import { fromJust } from '@freckle/maybe';
class NonEmpty {
    0;
}
export function mkNonEmpty(array) {
    return array.length === 0 ? null : array;
}
export function mkNonEmptyFromJust(array) {
    return fromJust(mkNonEmpty(array), 'Array that should have been non-empty was empty');
}
export function mkNonEmptySingleton(elem) {
    return fromJust(mkNonEmpty([elem]), "This definitely shouldn't happen! We created a non empty array from an element");
}
export function mkNonEmptyFromHead(head, tail) {
    return fromJust(mkNonEmpty([head].concat(tail)), "This definitely shouldn't happen! We created a non empty array from the head element and an array");
}
export function mkNonEmptyFromLast(init, last) {
    return fromJust(mkNonEmpty(init.concat([last])), "This definitely shouldn't happen! We created a non empty array from the last element and an array");
}
export function mapOnNonEmpty(nonEmpty, f) {
    return fromJust(mkNonEmpty(nonEmpty.map(f)), 'Array that should have been non-empty was empty');
}
export function lastOnNonEmpty(array) {
    const lastElem = array.at(-1);
    if (lastElem === undefined) {
        throw new TypeError("This definitely shouldn't happen! The types declare this array to be non-empty");
    }
    else {
        return lastElem;
    }
}
export function headOnNonEmpty(array) {
    const firstElem = array.at(0);
    if (firstElem === undefined) {
        throw new TypeError("This definitely shouldn't happen! The types declare this array to be non-empty");
    }
    else {
        return firstElem;
    }
}
export function tailOnNonEmpty(array) {
    return array.slice(1);
}
export function initOnNonEmpty(array) {
    return array.slice(0, -1);
}
export function nonEmptyToArray(array) {
    return array;
}
export function unconsOnNonEmpty(array) {
    return [headOnNonEmpty(array), tailOnNonEmpty(array)];
}
export function flattenOnNonEmpty(array) {
    return fromJust(mkNonEmpty(nonEmptyToArray(array).flat()), 'Array that should have been non-empty was empty');
}
// Keys that no relational operator can place: null, undefined and NaN all
// compare false against everything, so a bare `a < b` comparator would leave
// them wherever they started and groupAllWith would split them across groups.
// Ranking them puts each kind together and last, which is also the order
// lodash's sortBy produced before it was dropped: orderable keys ascending,
// then null, then undefined, then NaN.
function keyRank(value) {
    if (value === null)
        return 1;
    if (value === undefined)
        return 2;
    if (typeof value === 'number' && Number.isNaN(value))
        return 3;
    return 0;
}
function compareKeys(a, b) {
    const rankA = keyRank(a);
    const rankB = keyRank(b);
    if (rankA !== rankB) {
        return rankA - rankB;
    }
    return rankA === 0 ? (a < b ? -1 : a > b ? 1 : 0) : 0;
}
// https://hackage.haskell.org/package/base-4.18.1.0/docs/Data-List-NonEmpty.html#v:groupAllWith
// `key` is used for sorting and equality comparisons. It is called at least
// twice per item
export function groupAllWith(key, array) {
    // Decorated so key runs once per item for the sort rather than twice per
    // comparison. Array.prototype.sort is stable, so equal keys keep their
    // original order.
    const sorted = array
        .map((value) => [key(value), value])
        .sort(([a], [b]) => compareKeys(a, b))
        .map(([, value]) => value);
    const results = [];
    sorted.forEach(v => {
        const lastGroup = results.at(-1);
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
// Group results into non-empty groups. Note that the returned `Map` preserves
// The order of the original array, within groups (it doesn't sort like
//`groupAllWith`).
export function groupBy(key, array) {
    const results = new Map();
    for (const value of array) {
        const k = key(value);
        const accum = results.get(k);
        if (accum === undefined) {
            results.set(k, mkNonEmptySingleton(value));
        }
        else {
            accum.push(value);
        }
    }
    return results;
}
export default {
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
