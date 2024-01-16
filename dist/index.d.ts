import { type ArrayIterator, type ListIterator } from 'lodash';
declare class NonEmpty<T> {
    0: T;
}
export declare type NonEmptyArray<T> = Array<T> & NonEmpty<T>;
export declare function mkNonEmpty<T>(array: Array<T>): NonEmptyArray<T> | null;
export declare function mkNonEmptyFromJust<T>(array: Array<T>): NonEmptyArray<T>;
export declare function mkNonEmptySingleton<T>(elem: T): NonEmptyArray<T>;
export declare function mkNonEmptyFromHead<T>(head: T, tail: Array<T>): NonEmptyArray<T>;
export declare function mkNonEmptyFromLast<T>(init: Array<T>, last: T): NonEmptyArray<T>;
export declare function mapOnNonEmpty<T, U>(nonEmpty: NonEmptyArray<T>, f: ListIterator<T, U> | ArrayIterator<T, U>): NonEmptyArray<U>;
export declare function lastOnNonEmpty<T>(array: NonEmptyArray<T>): T;
export declare function headOnNonEmpty<T>(array: NonEmptyArray<T>): T;
export declare function tailOnNonEmpty<T>(array: NonEmptyArray<T>): Array<T>;
export declare function initOnNonEmpty<T>(array: NonEmptyArray<T>): Array<T>;
export declare function nonEmptyToArray<T>(array: NonEmptyArray<T>): Array<T>;
export declare function unconsOnNonEmpty<T>(array: NonEmptyArray<T>): [T, Array<T>];
export declare function flattenOnNonEmpty<T>(array: NonEmptyArray<NonEmptyArray<T>>): NonEmptyArray<T>;
export declare function groupAllWith<A, B>(key: (a: A) => B, array: Array<A>): Array<NonEmptyArray<A>>;
declare const _default: {
    mkNonEmpty: typeof mkNonEmpty;
    mkNonEmptySingleton: typeof mkNonEmptySingleton;
    mkNonEmptyFromHead: typeof mkNonEmptyFromHead;
    mkNonEmptyFromLast: typeof mkNonEmptyFromLast;
    lastOnNonEmpty: typeof lastOnNonEmpty;
    headOnNonEmpty: typeof headOnNonEmpty;
    tailOnNonEmpty: typeof tailOnNonEmpty;
    unconsOnNonEmpty: typeof unconsOnNonEmpty;
    initOnNonEmpty: typeof initOnNonEmpty;
    nonEmptyToArray: typeof nonEmptyToArray;
};
export default _default;
