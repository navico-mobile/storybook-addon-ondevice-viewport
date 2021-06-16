import * as React from 'react'

import addons, { makeDecorator } from '@storybook/addons'

import Container from './Container'
export const withViewports = makeDecorator({
  name: 'withViewports',
  parameterName: 'viewports',
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: true,
  wrapper: (getStory, context, { options, parameters }) => {
    return <Container channel={addons.getChannel()}>{getStory(context)}</Container>
  },
})
