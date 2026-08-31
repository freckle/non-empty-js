import {vi} from 'vitest'

import {expectTypeOf} from 'expect-type'
import {
  mkNonEmpty,
  mkNonEmptyFromJust,
  mkNonEmptySingleton,
  mkNonEmptyFromHead,
  mkNonEmptyFromLast,
  mapOnNonEmpty,
  lastOnNonEmpty,
  headOnNonEmpty,
  tailOnNonEmpty,
  initOnNonEmpty,
  nonEmptyToArray,
  unconsOnNonEmpty,
  flattenOnNonEmpty,
  groupAllWith,
  groupBy,
  type NonEmptyArray
} from './index.js'

describe('NonEmpty', () => {
  describe('type NonEmptyArray', () => {
    it('retains type variable', () => {
      const numbers = [1, 2, 3]
      expectTypeOf(numbers).not.toMatchTypeOf<NonEmptyArray<number>>()
    })
  })

  describe('mkNonEmpty', () => {
    test('should return null when passing empty array', () => {
      const arr = mkNonEmpty([])
      expect(arr).toEqual(null)
    })

    test('should return a non empty array when passing an array with elements', () => {
      const neArr = mkNonEmpty([1, 2])
      expect(neArr).toEqual([1, 2])
      expect(Array.isArray(neArr)).toBeTruthy()
    })
  })

  describe('mkNonEmptyFromJust', () => {
    test('should return a non empty array when passing an array with elements', () => {
      expect(mkNonEmptyFromJust([1, 2])).toEqual([1, 2])
    })

    test('should throw when passing an empty array', () => {
      expect(() => mkNonEmptyFromJust([])).toThrow()
    })
  })

  describe('mkNonEmptySingleton', () => {
    test('should return a non empty array when passing an element', () => {
      const neArr = mkNonEmptySingleton(1)
      expect(neArr).toEqual([1])
      expect(Array.isArray(neArr)).toBeTruthy()
    })
  })

  describe('mkNonEmptyFromHead', () => {
    test('should return a non empty array when passing an element and an empty array', () => {
      const neArr = mkNonEmptyFromHead(1, [])
      expect(neArr).toEqual([1])
      expect(Array.isArray(neArr)).toBeTruthy()
    })

    test('should return a non empty array when passing an element and an array', () => {
      const neArr = mkNonEmptyFromHead(1, [2])
      expect(neArr).toEqual([1, 2])
      expect(Array.isArray(neArr)).toBeTruthy()
    })
  })

  describe('mkNonEmptyFromLast', () => {
    test('should return a non empty array when passing an element and an empty array', () => {
      const neArr = mkNonEmptyFromLast([], 2)
      expect(neArr).toEqual([2])
      expect(Array.isArray(neArr)).toBeTruthy()
    })

    test('should return a non empty array when passing an element and an array', () => {
      const neArr = mkNonEmptyFromLast([1], 2)
      expect(neArr).toEqual([1, 2])
      expect(Array.isArray(neArr)).toBeTruthy()
    })
  })

  describe('mapOnNonEmpty', () => {
    test('should apply the function and stay non empty', () => {
      const neArr = mkNonEmptyFromHead(1, [2, 3])
      expect(mapOnNonEmpty(neArr, (x: number) => x * 2)).toEqual([2, 4, 6])
    })
  })

  describe('lastOnNonEmpty', () => {
    test('should return a the last element of a non empty array', () => {
      const neArr = mkNonEmptyFromHead(1, [2])
      const res = lastOnNonEmpty(neArr)
      expect(res).toEqual(2)
    })

    test('should throw an error when trying to get the last element on an empty array', () => {
      const invalidNEArr = [] as unknown as NonEmptyArray<number>
      expect(() => lastOnNonEmpty(invalidNEArr)).toThrow()
    })
  })

  describe('headOnNonEmpty', () => {
    test('should return a the first element of a non empty array', () => {
      const neArr = mkNonEmptyFromHead(1, [2])
      const res = headOnNonEmpty(neArr)
      expect(res).toEqual(1)
    })

    test('should throw an error when trying to get the first element on an empty array', () => {
      const invalidNEArr = [] as unknown as NonEmptyArray<number>
      expect(() => headOnNonEmpty(invalidNEArr)).toThrow()
    })
  })

  describe('tailOnNonEmpty', () => {
    test('should return a the tail of a non empty array', () => {
      const neArr = mkNonEmptyFromHead(1, [2])
      const res = tailOnNonEmpty(neArr)
      expect(Array.isArray(res)).toBeTruthy()
      expect(res).toEqual([2])
    })

    test('should return an empty tail when non empty array contains only one element', () => {
      const neArr = mkNonEmptySingleton(1)
      const res = tailOnNonEmpty(neArr)
      expect(Array.isArray(res)).toBeTruthy()
      expect(res).toEqual([])
    })
  })

  describe('initOnNonEmpty', () => {
    test('should return a the tail of a non empty array', () => {
      const neArr = mkNonEmptyFromHead(1, [2])
      const res = initOnNonEmpty(neArr)
      expect(Array.isArray(res)).toBeTruthy()
      expect(res).toEqual([1])
    })

    test('should return an empty list when non empty array contains only one element', () => {
      const neArr = mkNonEmptySingleton(1)
      const res = initOnNonEmpty(neArr)
      expect(Array.isArray(res)).toBeTruthy()
      expect(res).toEqual([])
    })
  })

  describe('nonEmptyToArray', () => {
    test('should return the same elements as a plain array', () => {
      const neArr = mkNonEmptyFromHead(1, [2])
      const res = nonEmptyToArray(neArr)
      expect(Array.isArray(res)).toBeTruthy()
      expect(res).toEqual([1, 2])
    })
  })

  describe('unconsOnNonEmpty', () => {
    test('should split into head and tail', () => {
      expect(unconsOnNonEmpty(mkNonEmptyFromHead(1, [2, 3]))).toEqual([1, [2, 3]])
    })

    test('should return an empty tail for a singleton', () => {
      expect(unconsOnNonEmpty(mkNonEmptySingleton(1))).toEqual([1, []])
    })
  })

  describe('flattenOnNonEmpty', () => {
    test('should concatenate the nested arrays', () => {
      const nested = mkNonEmptyFromHead(mkNonEmptyFromHead(1, [2]), [mkNonEmptySingleton(3)])
      expect(flattenOnNonEmpty(nested)).toEqual([1, 2, 3])
    })
  })

  describe('groupAllWith', () => {
    it('returns empty given empty', () => expect(groupAllWith(x => x, [])).toEqual([]))

    it('puts a singleton by itself', () => expect(groupAllWith(x => x, [42])).toEqual([[42]]))

    it('respects the grouping key', () =>
      expect(groupAllWith(x => x > 0, [1, -2, 2, 0, -1])).toEqual([
        [-2, 0, -1],
        [1, 2]
      ]))

    it('is stable', () => expect(groupAllWith(() => 42, [4, 2, 42])).toEqual([[4, 2, 42]]))

    it('sorts by key', () =>
      expect(groupAllWith(x => x, [99, -1, 0, 42, -42])).toEqual([[-42], [-1], [0], [42], [99]]))

    // Not necessarily testing a desired behavior. More showing/documenting a
    // consequence of the implementation that callers should be aware of.
    it('calls key at least once per value', () => {
      const key = vi.fn(() => 42)
      const values = [1, 2, 3]
      groupAllWith(key, values)
      expect(key.mock.calls.length).toBeGreaterThan(values.length)
    })
  })

  describe(groupBy.name, () => {
    it('returns empty given empty', () => expect(groupBy(x => x, [])).toEqual(new Map()))

    it('puts a singleton by itself', () =>
      expect(groupBy(x => x, [42])).toEqual(new Map([[42, [42]]])))

    it('respects the grouping key', () =>
      expect(groupBy(x => x > 0, [1, -1, -2, 2, 0])).toEqual(
        new Map([
          [false, [-1, -2, 0]],
          [true, [1, 2]]
        ])
      ))

    it('is stable', () =>
      expect(groupBy(() => 42, [4, 2, 42])).toEqual(new Map([[42, [4, 2, 42]]])))

    const values = [99, -1, 0, 42, -42]

    it('does not sort by key', () =>
      expect(groupBy(x => x, values)).toEqual(new Map(values.map(v => [v, [v]]))))

    it('calls key once per value', () => {
      const key = vi.fn(() => 42)
      const values = [1, 2, 3]
      groupBy(key, values)
      expect(key.mock.calls.length).toEqual(values.length)
    })
  })
})
