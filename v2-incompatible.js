import { showIncompatiblePluginDialog } from '@sanity/incompatible-plugin'
import packageJson from './package.json'
const { name, version, sanityExchangeUrl } = packageJson

export default showIncompatiblePluginDialog({
  name: name,
  versions: {
    v3: version,
    v2: undefined,
  },
  sanityExchangeUrl,
})
