import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScaledSize,
  Dimensions,
  Switch,
} from 'react-native'
import { AddonStore } from '@storybook/addons'
import { API } from '@storybook/api'

import Events from './constants'

import { INITIAL_VIEWPORTS, DEFAULT_VIEWPORT_NAME } from './defaults'
import { Viewport, ViewportMap, ViewportAddonParameter } from './models'

export type Channel = ReturnType<AddonStore['getChannel']>
interface Props {
  channel: Channel
  api: API
  active: boolean
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 100,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
  },
  title: {
    fontSize: 16,
  },
})

interface States {
  selected: string
  showBoarder: boolean
  disable: boolean
  viewports: ViewportMap
}

function getValidViewports(viewportMap: ViewportMap, defaultWindow: ScaledSize): Viewport[] {
  const samllerThanWindow = Object.values(viewportMap).filter(
    (v) => v.styles.width < defaultWindow.width && v.styles.height < defaultWindow.height
  )
  const defaultViewport: Viewport = {
    name: DEFAULT_VIEWPORT_NAME,
    styles: { width: defaultWindow.width, height: defaultWindow.height },
    type: 'other',
  }
  return [defaultViewport, ...samllerThanWindow]
}
const defaultState = {
  selected: DEFAULT_VIEWPORT_NAME,
  showBoarder: false,
  viewports: INITIAL_VIEWPORTS,
  disable: false,
}
export default class ViewportPanel extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = defaultState
  }
  componentDidMount() {
    this.props.channel.on(Events.SET, this.onSetParameters)
  }

  componentWillUnmount() {
    this.props.channel.removeListener(Events.SET, this.onSetParameters)
  }

  onSetParameters = (parameters: ViewportAddonParameter) => {
    const selected = parameters.defaultViewport || defaultState.selected
    const disable = parameters.disable || defaultState.disable
    const showBoarder = parameters.showBoarder || defaultState.showBoarder
    const viewports = parameters.viewports || defaultState.viewports
    this.setState({ showBoarder, viewports, disable, selected })
  }

  onViewportSelect = (viewport: Viewport) => {
    const { channel } = this.props
    this.setState({ selected: viewport.name })
    channel.emit(Events.CHANGED, JSON.stringify(viewport))
  }
  onViewportBorderChanged = (showBoarder: boolean) => {
    const { channel } = this.props
    this.setState({ showBoarder })
    channel.emit(Events.SHOW_BOARDER, showBoarder)
  }
  renderItem = ({ item }: { item: Viewport }) => {
    const { selected } = this.state
    const title = `${item.name}: (${item.styles.width}x${item.styles.height})`

    const backgroundColor = item.name === selected ? 'aquamarine' : 'ghostwhite'
    const color = item.name === selected ? 'rebeccapurple' : 'black'

    return (
      <TouchableOpacity
        onPress={() => this.onViewportSelect(item)}
        style={{ ...styles.item, backgroundColor }}>
        <Text style={{ ...styles.title, color }}>{title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { active } = this.props
    if (!active || !this.state) {
      return null
    }
    const { selected, showBoarder, disable, viewports } = this.state
    if (disable) {
      return <View>{`Viewport is disabled`}</View>
    }

    const viewportsList = getValidViewports(viewports, Dimensions.get('window'))
    return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text>{'Show viewport border: '}</Text>
          <Switch onValueChange={this.onViewportBorderChanged} value={showBoarder} />
        </View>

        <FlatList
          data={viewportsList}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.name}
          extraData={selected}
        />
      </View>
    )
  }
}
