const findPkg = require('pkg-up')
const fs = require('fs-extra')
const merge = require('lodash.mergewith')
const { parse: parseYaml } = require('yaml')
const path = require('path')
const replace = require('replace-in-file')

const { asyncGlob } = require('./util')

// ---------------------------------------------------------------------------------------------

/**
 * Converts YAML changelog data to Markdown and writes it to the project's CHANGELOG.md file.
 *
 */
const updateChangelog = async (newVersion, config) => {
  const { source, destination } = config

  // Ensure source path exists
  if (!await fs.pathExists(source)) {
    throw new Error(`Source path doesn't exist`)
  }

  // Parse matching files
  const matchedFiles = await asyncGlob(`${source}/**/*.y?(a)ml`)
  const parsedFiles = await Promise.all(matchedFiles.map(async (matchedPath) => {
    return parseYaml(await fs.readFile(matchedPath, 'utf8'))
  }))

  // Merge parsed entries
  const entries = merge({ new: [], updated: [], fixed: [] }, ...parsedFiles, (dest, src) => {
    if (Array.isArray(dest)) {
      return dest.concat(src)
    }
  })
}
