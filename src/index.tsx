import * as React from 'react'

import addons, { makeDecorator } from '@storybook/addons'

import Container from './Container'
import { ViewportAddonParameter } from './models'
import Events from './constants'

function getInitialViewPort(parameters: ViewportAddonParameter) {
  if (parameters.defaultViewport && parameters.viewports) {
    return parameters.viewports[parameters.defaultViewport]
  }
  return undefined
}
export const withViewports = makeDecorator({
  name: 'withViewports',
  parameterName: 'viewports',
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const data: ViewportAddonParameter = parameters || options || {}
    if (data.viewports || data.showBoarder || data.defaultViewport || data.disable) {
      //if this parameter are different, set to viewport panel
      addons.getChannel().emit(Events.SET, data)
    }
    const initialViewPort = getInitialViewPort(data)
    return (
      <Container
        channel={addons.getChannel()}
        showBoarder={data.showBoarder}
        initialViewport={initialViewPort}>
        {getStory(context)}
      </Container>
    )
  },
})
