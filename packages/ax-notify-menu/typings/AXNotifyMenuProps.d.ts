/**
 * This file was generated from AXNotifyMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue } from "mendix";

export interface AXNotifyMenuContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    title?: DynamicValue<string>;
    onNotifyClick?: ActionValue;
}

export interface AXNotifyMenuPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    title: string;
    onNotifyClick: {} | null;
}
