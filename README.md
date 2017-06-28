# ghub-cli
Redirect to a npm package's GitHub page from your terminal, if available

# usage
recommended for use with [npx](https://github.com/zkat/npx)

```sh
> npx ghub-cli express
The GitHub url for express is https://github.com/expressjs/express
Opening in browser...

> npx ghub-cli --help
Usage: ghub-cli <moduleName> [--no-open --quiet]

opens a browser to the GitHub repository for <moduleName>

  -n, --no-open  only prints the url but does not open a browser
  -q, --quiet    suppresses console output
  -h, --help     prints this help
  -v, --version  prints the version of ghub-cli
```

or, install globally:
```sh
> npm i -g ghub-cli
> ghub-cli express
The GitHub url for express is https://github.com/expressjs/express
Opening in browser...
```

# thanks
inspired by [ghub.io](https://www.npmjs.com/package/ghub), thank you [@juliangruber](https://github.com/juliangruber)!

# what about npm.im?
there's an npm cli package called [`npm-url`](https://www.npmjs.com/package/npm-url) so you can
```sh
> npx npm-url express
```

# license
ISC
