import first from 'lodash/first'
import last from 'lodash/last'
import map from 'lodash/map'
import flatten from 'lodash/flatten'
import {type ArrayIterator, type ListIterator} from 'lodash'
import {fromJust} from '@freckle/maybe'

class NonEmpty {}

export type NonEmptyArray<T> = Array<T> & NonEmpty

export function mkNonEmpty<T>(array: Array<T>): NonEmptyArray<T> | undefined | null {
  return array.length === 0 ? null : (array as any as NonEmptyArray<T>)
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
  f: ListIterator<T, U> | ArrayIterator<T, U>
): NonEmptyArray<U> {
  return fromJust(mkNonEmpty(map(nonEmpty, f)), 'Array that should have been non-empty was empty')
}

export function lastOnNonEmpty<T>(array: NonEmptyArray<T>): T {
  const lastElem = last(array)
  if (lastElem === null || lastElem === undefined) {
    throw new TypeError(
      "This definitely shouldn't happen! The types declare this array to be non-empty"
    )
  } else {
    return lastElem
  }
}

export function headOnNonEmpty<T>(array: NonEmptyArray<T>): T {
  const firstElem = first(array)
  if (firstElem === null || firstElem === undefined) {
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
    mkNonEmpty(flatten(nonEmptyToArray(array))),
    'Array that should have been non-empty was empty'
  )
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
