import React from 'react';
import { ScaledSize } from 'react-native';
import { Viewport } from './models';
import { Channel } from './ViewportPanel';
interface ContainerProps {
    initialViewport?: Viewport;
    showBoarder?: boolean;
    channel: Channel;
    children?: React.ReactNode;
}
interface ContainerStates {
    viewport: Viewport;
    showBoarder: boolean;
}
export default class Container extends React.Component<ContainerProps, ContainerStates> {
    hostWindow: ScaledSize;
    constructor(props: ContainerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onViewportChange: (viewportString?: string) => void;
    onShowBoarderChange: (showBoarder: boolean) => void;
    render(): JSX.Element;
}
export {};
