import {
  mkNonEmpty,
  mkNonEmptySingleton,
  mkNonEmptyFromHead,
  mkNonEmptyFromLast,
  lastOnNonEmpty,
  headOnNonEmpty,
  tailOnNonEmpty,
  initOnNonEmpty,
  type NonEmptyArray
} from '.'

describe('NonEmpty', () => {
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
      // Here we need to force flow to create an invalid empty array
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
      // Here we need to force flow to create an invalid empty array
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
})
