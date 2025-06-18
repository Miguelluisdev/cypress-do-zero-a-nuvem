const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'CYPRESS_RECORD_KEY', 
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
})
