import fs from 'node:fs'
import signale from 'signale'

import { pathToBuild } from '../etc/paths.js'

fs.rmSync(pathToBuild, {
  recursive: true,
  force: true
})

signale.success(`Build directory cleaned successfully!`)
