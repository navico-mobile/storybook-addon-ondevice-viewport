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
    const initialViewPort = getInitialViewPort(data)
    addons.getChannel().emit(Events.SET, data)
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
