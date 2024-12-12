import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { icons } from './icons'
import theme from './theme'
import defaults from './defaults'
import { md3 } from 'vuetify/blueprints'

export const vuetify = createVuetify({
  blueprint: md3,
  components: {
    ...components,
    VDataTable
  },
  directives,
  icons,
  theme,
  defaults
})
