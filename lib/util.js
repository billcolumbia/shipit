const glob = require('glob')

// ---------------------------------------------------------------------------------------------

/**
 * Promise wrapper for `glob`.
 *
 * @param {string} pattern Glob pattern.
 * @param {object} options Options to pass to glob call.
 *
 * @returns {Promise<string[]>}
 */
const asyncGlob = (pattern, options = {}) => new Promise((resolve, reject) => {
  glob(pattern, options, (err, matched) => {
    if (err) {
      reject(err)
      return
    }
    resolve(matched)
  })
})

// ---------------------------------------------------------------------------------------------

module.exports = { asyncGlob }
