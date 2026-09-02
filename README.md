# non-empty-js

Construct and operate on non-empty arrays with type-safety

## Install

```sh
pnpm add @freckle/non-empty
```

## Usage

`NonEmptyArray<T>` is a regular `Array<T>` with a type-level guarantee that it has at least one element. There's no runtime wrapper — a `NonEmptyArray<T>` value is a plain array, so every `Array.prototype` method still works on it.

### Construct

```ts
import {mkNonEmpty, mkNonEmptySingleton, mkNonEmptyFromHead, mkNonEmptyFromLast, mkNonEmptyFromJust} from '@freckle/non-empty'

mkNonEmpty([1, 2, 3]) // NonEmptyArray<number>
mkNonEmpty([]) // null

mkNonEmptySingleton('a') // NonEmptyArray<string>, always non-null
mkNonEmptyFromHead('a', ['b', 'c']) // NonEmptyArray<string>, always non-null
mkNonEmptyFromLast(['a', 'b'], 'c') // NonEmptyArray<string>, always non-null

// Throws if the array turns out to be empty. For call sites that already know
// (from other logic) that the array can't be empty, and would rather crash
// loudly than thread `| null` through.
mkNonEmptyFromJust(possiblyEmptyArray)
```

### Access

```ts
import {headOnNonEmpty, lastOnNonEmpty, tailOnNonEmpty, initOnNonEmpty, unconsOnNonEmpty, nonEmptyToArray} from '@freckle/non-empty'

headOnNonEmpty(xs) // T, no `| undefined`
lastOnNonEmpty(xs) // T, no `| undefined`
tailOnNonEmpty(xs) // Array<T> — everything but the head
initOnNonEmpty(xs) // Array<T> — everything but the last
unconsOnNonEmpty(xs) // [T, Array<T>] — head and tail together
nonEmptyToArray(xs) // Array<T> — drops the non-empty guarantee, e.g. to pass to an API that expects a plain array
```

### Transform

```ts
import {mapOnNonEmpty, flattenOnNonEmpty} from '@freckle/non-empty'

mapOnNonEmpty(xs, x => x * 2) // NonEmptyArray<number> — map that preserves non-emptiness
flattenOnNonEmpty(xss) // NonEmptyArray<T> — flattens a NonEmptyArray<NonEmptyArray<T>>
```

### Group

```ts
import {groupAllWith, groupBy} from '@freckle/non-empty'

// Sorts by `key`, then groups adjacent equal keys. Each group is non-empty.
groupAllWith(x => x.category, items) // Array<NonEmptyArray<Item>>

// Groups by `key` without sorting; a `Map` preserves the original array's
// order within each group.
groupBy(x => x.category, items) // Map<Category, NonEmptyArray<Item>>
```

## Development

- **Package manager**: pnpm (Node version pinned in `.nvmrc`)
- `pnpm build` — `tsc`, emits to `dist/`
- `pnpm test` — Vitest
- `pnpm coverage` — Vitest with coverage, gated at 70% (lines/branches/functions/statements)
- `pnpm typecheck` — `tsc --noEmit`, includes test files
- `pnpm lint` — ESLint
- `pnpm format` / `pnpm format-check` — Prettier
- `pnpm knip` — unused files/dependencies/exports
- CI runs all of the above on every PR, plus a check that `dist/` is up to date

## Versioning and release process

See [RELEASE.md](./RELEASE.md).

---

[LICENSE](./LICENSE)
