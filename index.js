#!/usr/bin/env node
// @ts-check
const { exec } = require('child_process')
const githubUrlToObject = require("github-url-to-object")
const opener = require('opener')
const package = require('./package.json')

async function getGithubUrl(moduleName) {
  const url = await new Promise((resolve, reject) => {
    exec(`npm view ${moduleName} repository.url`, (err, stdout) => {
      if (err) return reject(err)
      resolve(stdout.trim())
    })
  })

  const parsed = githubUrlToObject(url)
  if (!parsed) throw new Error('could not parse GitHub url for ' + moduleName)
  return parsed['https_url']
}

async function main (argv) {
  const moduleName = argv[2]
  const flags = argv.filter(arg => arg.startsWith('-')).reduce((o, a) => Object.assign(o, {[a]: true}), {})

  if ('-h' in flags || '--help' in flags) {
    console.log(`
Usage: ${argv[1]} <moduleName> [--no-open --quiet]

opens a browser to the GitHub repository for <moduleName>

  -n, --no-open  only prints the url but does not open a browser
  -q, --quiet    suppresses console output
  -h, --help     prints this help
  -v, --version  prints the version of ${argv[1]}

`)
    process.exit(0)
  }
  if ('-v' in flags || '--version' in flags) {
    console.log(package.version)
    process.exit(0)
  }

  const url = await getGithubUrl(moduleName)
  if ('-n' in flags || '--no-open' in flags) {
    console.log(url)
    process.exit(0)
  }
  if (!('-q' in flags || '--quiet' in flags)) {
    console.log(`The GitHub url for ${moduleName} is ${url}`)
    console.log('Opening in browser...')
  }
  opener(url)
}

if (process.mainModule.filename == __filename) main(process.argv).catch(e => {
  console.log(e.stack)
  process.exit(1)
})
