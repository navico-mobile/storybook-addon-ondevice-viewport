import React from 'react'
import { View, StyleSheet, Dimensions, ScaledSize } from 'react-native'
import Constants from './constants'
import { Viewport } from './models'
import { Channel } from './ViewportPanel'

interface ContainerProps {
  initialViewport?: Viewport
  showBoarder?: boolean
  channel: Channel
  children?: React.ReactNode
}
interface ContainerStates {
  viewport: Viewport
  showBoarder: boolean
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  borderStyle: { borderColor: 'green', borderWidth: 1 },
})
export default class Container extends React.Component<ContainerProps, ContainerStates> {
  hostWindow: ScaledSize

  constructor(props: ContainerProps) {
    super(props)
    this.hostWindow = Dimensions.get('window')
    const viewport: Viewport = props.initialViewport || {
      name: 'default',
      styles: { width: this.hostWindow.width, height: this.hostWindow.height },
      type: 'other',
    }
    const showBoarder = props.showBoarder || false
    this.state = { viewport: viewport, showBoarder }
  }

  componentDidMount() {
    const { channel } = this.props
    channel.on(Constants.CHANGED, this.onViewportChange)
    channel.on(Constants.SHOW_BOARDER, this.onShowBoarderChange)
  }

  componentWillUnmount() {
    const { channel } = this.props
    channel.removeListener(Constants.CHANGED, this.onViewportChange)
    channel.removeListener(Constants.SHOW_BOARDER, this.onShowBoarderChange)
  }

  onViewportChange = (viewportString?: string) => {
    try {
      const viewport: Viewport = JSON.parse(viewportString)
      console.warn(`viewport changed ${JSON.stringify(viewport)}`)
      this.setState({ viewport })
    } catch (e) {
      console.error(`viewport change error ${JSON.stringify(e)}`)
    }
  }
  onShowBoarderChange = (showBoarder: boolean) => {
    try {
      console.warn(`viewport show boarder ${showBoarder}`)
      this.setState({ showBoarder })
    } catch (e) {
      console.error(`viewport boarder change error ${JSON.stringify(e)}`)
    }
  }
  render() {
    const { viewport, showBoarder } = this.state
    const { children } = this.props
    const newWidthHeight = {
      width: Number(viewport?.styles.width),
      maxWidth: Number(viewport?.styles.width),
      height: Number(viewport?.styles.height),
      maxHeight: Number(viewport?.styles.height),
    }
    const boarderStyle = showBoarder ? styles.borderStyle : undefined
    return <View style={[styles.container, newWidthHeight, boarderStyle]}>{children}</View>
  }
}
