import React from 'react';
import { AddonStore } from '@storybook/addons';
import { API } from '@storybook/api';
import { Viewport, ViewportMap, ViewportAddonParameter } from './models';
export declare type Channel = ReturnType<AddonStore['getChannel']>;
interface Props {
    channel: Channel;
    api: API;
    active: boolean;
}
interface States {
    selected: string;
    showBoarder: boolean;
    disable: boolean;
    viewports: ViewportMap;
}
export default class ViewportPanel extends React.Component<Props, States> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onStorySelected: () => void;
    onSetParameters: (parameters: ViewportAddonParameter) => void;
    onViewportSelect: (viewport: Viewport) => void;
    onViewportBorderChanged: (showBoarder: boolean) => void;
    renderItem: ({ item }: {
        item: Viewport;
    }) => JSX.Element;
    render(): JSX.Element;
}
export {};
