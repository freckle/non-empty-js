import { first, flatten, last, map, sortBy } from 'lodash';
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
    return fromJust(mkNonEmpty(map(nonEmpty, f)), 'Array that should have been non-empty was empty');
}
export function lastOnNonEmpty(array) {
    const lastElem = last(array);
    if (lastElem === undefined) {
        throw new TypeError("This definitely shouldn't happen! The types declare this array to be non-empty");
    }
    else {
        return lastElem;
    }
}
export function headOnNonEmpty(array) {
    const firstElem = first(array);
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
    return fromJust(mkNonEmpty(flatten(nonEmptyToArray(array))), 'Array that should have been non-empty was empty');
}
// https://hackage.haskell.org/package/base-4.18.1.0/docs/Data-List-NonEmpty.html#v:groupAllWith
// `key` is used for sorting and equality comparisons. It is called at least
// twice per item
export function groupAllWith(key, array) {
    const sorted = sortBy(array, key);
    const results = [];
    sorted.forEach(v => {
        const lastGroup = last(results);
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
