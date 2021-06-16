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
import { Viewport, ViewportMap } from './models'

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

export default class ViewportPanel extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = { selected: DEFAULT_VIEWPORT_NAME, showBoarder: false }
  }

  onViewportSelect = (viewport: Viewport) => {
    const { channel } = this.props
    this.setState({ selected: viewport.name })
    channel.emit(Events.UPDATE, JSON.stringify(viewport))
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
    const { selected, showBoarder } = this.state
    if (!active) {
      return null
    }
    const viewports = getValidViewports(INITIAL_VIEWPORTS, Dimensions.get('window'))
    return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text>{'Show viewport border: '}</Text>
          <Switch
            // trackColor={{ false: "#767577", true: "#81b0ff" }}
            // thumbColor={showBoarder ? "#f5dd4b" : "#f4f3f4"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={this.onViewportBorderChanged}
            value={showBoarder}
          />
        </View>

        <FlatList
          data={viewports}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.name}
          extraData={selected}
        />
      </View>
    )
  }
}
