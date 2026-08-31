# non-empty-js

Construct and operate on non-empty arrays with type-safety

## Install

```sh
pnpm add @freckle/non-empty
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
