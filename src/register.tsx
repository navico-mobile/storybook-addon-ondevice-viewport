import * as React from 'react'
import { addons, types } from '@storybook/addons'

import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants'

import ViewportPanel from './ViewportPanel'

addons.register(ADDON_ID, (api) => {
  const channel = addons.getChannel()
  addons.addPanel(PANEL_ID, {
    title: 'viewport',
    render: ({ active }) => <ViewportPanel channel={channel} api={api} active={active} />,
    paramKey: PARAM_KEY,
  })
})
