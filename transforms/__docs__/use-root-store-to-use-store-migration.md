## `use-root-store-to-use-store-migration`

Transforms useRootStore() to

### Example
#### Before
```js
const { dielineService, authService, logger } = useRootStore()
```

#### After
```js
const dielineService = useStore(Stores.DielineService);
const authService = useStore(Stores.AuthService);
const logger = useStore(Stores.Logger);
```

#### How to run

> Replace ``<file_or_dirs_and_globs>`` with for example `./../packhelp/landing/**/*.ts`
```sh
yarn run jscodeshift \
  -t transforms/use-root-store-to-use-store-migration \
  --extensions=ts \
  --parser=ts \
  --ignore-pattern=./../**/node_modules/** \
  <file_or_dirs_and_globs>
```

