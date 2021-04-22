## `detect-invalid-imports`

Description of transform. (CHANGE THIS)

### Example
#### Before
```js
EXAMPLE INPUT CODE (️CHANGE THIS)
```

#### After
```js
EXAMPLE OUTPUT CODE (️CHANGE THIS)
```

#### How to run

> Replace ``<file_or_dirs_and_globs>`` with for example `./../packhelp/landing/**/*.ts`
```sh
yarn run jscodeshift \
  -t transforms/detect-invalid-imports \
  --extensions=ts \
  --parser=ts \
  --ignore-pattern=./../**/node_modules/** \
  <file_or_dirs_and_globs>
```

