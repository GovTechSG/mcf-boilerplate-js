# MyCareersFuture Boilerplates for Node Projects

[![Build Status](https://travis-ci.org/GovTechSG/mcf-boilerplate-js.svg?branch=master)](https://travis-ci.org/GovTechSG/mcf-boilerplate-js)

## Contents
- [`@mcf/logger`](./packages/logger) [![npm version](https://badge.fury.io/js/%40mcf%2Flogger.svg)](https://badge.fury.io/js/%40mcf%2Flogger)
- [`@mcf/provision-process`](./packages/provision-process) [![npm version](https://badge.fury.io/js/%40mcf%2Fprovision-process.svg)](https://badge.fury.io/js/%40mcf%2Fprovision-process)
- [`@mcf/server-boilerplate-middleware`](./packages/server-boilerplate-middleware) [![npm version](https://badge.fury.io/js/%40mcf%2Fserver-boilerplate-middleware.svg)](https://badge.fury.io/js/%40mcf%2Fserver-boilerplate-middleware)

## Contributing
### For Contributors
1. Git clone this product
2. Make changes in the relevant package under `./packages`
3. Push to the GitHub repository
4. Run `lerna publish` to publish changes

### For Non-Contributors
1. Fork this project
2. Make changes to the relevant packages under `./packages`
3. Push to your own `master` branch
4. Create a merge request

### Creating a new Package
Create a directory inside the `./packages` directory:

```bash
mkdir -p ./packages/package-name
```

Go into the package and initialise an NPM package:

```bash
cd ./packages/package-name;
npm init -f
```

Open the generated `package.json` file and:

1. Prefix the `.name` property with `@mcf/`.
2. Replace the `.main` property with `"dist/index.js"`
3. Copy and paste the following properties in to quickly get started for a package in ES6:

```json

  "scripts": {
    "build": "npx babel --presets=env src --out-dir dist --ignore '*.test.js' ",
    "lint": "npx eslint -c ../../.eslintrc.json .",
    "test-watch": "npx mocha --watch --require babel-register \"src/*.test.js\" \"src/**/*.test.js\" ",
    "test": "npx mocha --require babel-register \"dist/*.test.js\" \"dist/**/*.test.js\"",
    "pretest": "cd ./src && find ./ -name '*.test.js' | cpio -pdm ../dist",
    "posttest": "find ./dist -name '*.test.js' | xargs -I@ rm -rf @",
    "prestart": "npm run build"
  },
  "publishConfig": {
    "access": "public"
  },
  "private": false,
  "babel": {
    "presets": [
      "env"
    ],
    "ignore": [
      "node_modules"
    ]
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/GovTechSG/mcf-boilerplate-js.git"
  },
```