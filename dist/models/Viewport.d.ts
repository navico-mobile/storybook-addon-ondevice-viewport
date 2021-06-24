export declare type Styles = ViewportStyles;
export interface Viewport {
    name: string;
    styles: Styles;
    type: 'desktop' | 'mobile' | 'tablet' | 'other';
}
export interface ViewportStyles {
    height: number;
    width: number;
}
export interface ViewportMap {
    [key: string]: Viewport;
}
