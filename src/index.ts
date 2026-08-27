import {fromJust} from '@freckle/maybe'

class NonEmpty<T> {
  0: T
}

export type NonEmptyArray<T> = Array<T> & NonEmpty<T>

export function mkNonEmpty<T>(array: Array<T>): NonEmptyArray<T> | null {
  return array.length === 0 ? null : (array as NonEmptyArray<T>)
}

export function mkNonEmptyFromJust<T>(array: Array<T>): NonEmptyArray<T> {
  return fromJust(mkNonEmpty(array), 'Array that should have been non-empty was empty')
}

export function mkNonEmptySingleton<T>(elem: T): NonEmptyArray<T> {
  return fromJust(
    mkNonEmpty([elem]),
    "This definitely shouldn't happen! We created a non empty array from an element"
  )
}

export function mkNonEmptyFromHead<T>(head: T, tail: Array<T>): NonEmptyArray<T> {
  return fromJust(
    mkNonEmpty([head].concat(tail)),
    "This definitely shouldn't happen! We created a non empty array from the head element and an array"
  )
}

export function mkNonEmptyFromLast<T>(init: Array<T>, last: T): NonEmptyArray<T> {
  return fromJust(
    mkNonEmpty(init.concat([last])),
    "This definitely shouldn't happen! We created a non empty array from the last element and an array"
  )
}

export function mapOnNonEmpty<T, U>(
  nonEmpty: NonEmptyArray<T>,
  f: (value: T, index: number, array: Array<T>) => U
): NonEmptyArray<U> {
  return fromJust(mkNonEmpty(nonEmpty.map(f)), 'Array that should have been non-empty was empty')
}

export function lastOnNonEmpty<T>(array: NonEmptyArray<T>): T {
  const lastElem = array.at(-1)
  if (lastElem === undefined) {
    throw new TypeError(
      "This definitely shouldn't happen! The types declare this array to be non-empty"
    )
  } else {
    return lastElem
  }
}

export function headOnNonEmpty<T>(array: NonEmptyArray<T>): T {
  const firstElem = array.at(0)
  if (firstElem === undefined) {
    throw new TypeError(
      "This definitely shouldn't happen! The types declare this array to be non-empty"
    )
  } else {
    return firstElem
  }
}

export function tailOnNonEmpty<T>(array: NonEmptyArray<T>): Array<T> {
  return array.slice(1)
}

export function initOnNonEmpty<T>(array: NonEmptyArray<T>): Array<T> {
  return array.slice(0, -1)
}

export function nonEmptyToArray<T>(array: NonEmptyArray<T>): Array<T> {
  return array as Array<T>
}

export function unconsOnNonEmpty<T>(array: NonEmptyArray<T>): [T, Array<T>] {
  return [headOnNonEmpty(array), tailOnNonEmpty(array)]
}

export function flattenOnNonEmpty<T>(array: NonEmptyArray<NonEmptyArray<T>>): NonEmptyArray<T> {
  return fromJust(
    mkNonEmpty(nonEmptyToArray(array).flat()),
    'Array that should have been non-empty was empty'
  )
}

// Keys that no relational operator can place: null, undefined and NaN all
// compare false against everything, so a bare `a < b` comparator would leave
// them wherever they started and groupAllWith would split them across groups.
// Ranking them puts each kind together and last, which is also the order
// lodash's sortBy produced before it was dropped: orderable keys ascending,
// then null, then undefined, then NaN.
function keyRank(value: unknown): number {
  if (value === null) return 1
  if (value === undefined) return 2
  if (typeof value === 'number' && Number.isNaN(value)) return 3
  return 0
}

function compareKeys<B>(a: B, b: B): number {
  const rankA = keyRank(a)
  const rankB = keyRank(b)

  if (rankA !== rankB) {
    return rankA - rankB
  }

  return rankA === 0 ? (a < b ? -1 : a > b ? 1 : 0) : 0
}

// https://hackage.haskell.org/package/base-4.18.1.0/docs/Data-List-NonEmpty.html#v:groupAllWith
// `key` is used for sorting and equality comparisons. It is called at least
// twice per item
export function groupAllWith<A, B>(key: (a: A) => B, array: Array<A>): Array<NonEmptyArray<A>> {
  // Decorated so key runs once per item for the sort rather than twice per
  // comparison. Array.prototype.sort is stable, so equal keys keep their
  // original order.
  const sorted = array
    .map((value): [B, A] => [key(value), value])
    .sort(([a], [b]) => compareKeys(a, b))
    .map(([, value]) => value)

  const results: Array<NonEmptyArray<A>> = []

  sorted.forEach(v => {
    const lastGroup = results.at(-1)

    // Item matches prior group so put it there
    if (lastGroup !== undefined && key(headOnNonEmpty(lastGroup)) === key(v)) {
      lastGroup.push(v)

      // Item doesn't match prior group (or group doesn't exist), make new group
    } else {
      results.push(mkNonEmptySingleton(v))
    }
  })

  return results
}

// Group results into non-empty groups. Note that the returned `Map` preserves
// The order of the original array, within groups (it doesn't sort like
//`groupAllWith`).
export function groupBy<A, B>(key: (a: A) => B, array: Array<A>): Map<B, NonEmptyArray<A>> {
  const results = new Map<B, NonEmptyArray<A>>()

  for (const value of array) {
    const k = key(value)
    const accum = results.get(k)

    if (accum === undefined) {
      results.set(k, mkNonEmptySingleton(value))
    } else {
      accum.push(value)
    }
  }

  return results
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
}
