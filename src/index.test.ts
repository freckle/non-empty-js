import {expectTypeOf} from 'expect-type'
import {
  mkNonEmpty,
  mkNonEmptySingleton,
  mkNonEmptyFromHead,
  mkNonEmptyFromLast,
  lastOnNonEmpty,
  headOnNonEmpty,
  tailOnNonEmpty,
  initOnNonEmpty,
  groupAllWith,
  type NonEmptyArray
} from '.'

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

  describe('lastOnNonEmpty', () => {
    test('should return a the last element of a non empty array', () => {
      const neArr = mkNonEmptyFromHead(1, [2])
      const res = lastOnNonEmpty(neArr)
      expect(res).toEqual(2)
    })

    test('should throw an error when trying to get the last element on an empty array', () => {
      const invalidNEArr: NonEmptyArray<any> = [] as any
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
      const invalidNEArr: NonEmptyArray<any> = [] as any
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
      const key = jest.fn().mockReturnValue(42)
      const values = [1, 2, 3]
      groupAllWith(key, values)
      expect(key.mock.calls.length).toBeGreaterThan(values.length)
    })
  })
})
