/**
 * This file was generated from AXToggleButton.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type ColorEnum = "primary" | "secondary" | "success" | "warning" | "error" | "info";

export type SizeEnum = "small" | "medium" | "large";

export type OrientationEnum = "horizontal" | "vertical";

export interface AXToggleButtonOptionsType {
    optValue: string;
    optLabel?: DynamicValue<string>;
}

export interface AXToggleButtonOptionsPreviewType {
    optValue: string;
    optLabel: string;
}

export interface AXToggleButtonContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttr?: EditableValue<string>;
    options: AXToggleButtonOptionsType[];
    exclusive: boolean;
    color: ColorEnum;
    size: SizeEnum;
    orientation: OrientationEnum;
    disabled: boolean;
    fullWidth: boolean;
    onChange?: ActionValue;
}

export interface AXToggleButtonPreviewProps {
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    valueAttr: string;
    options: AXToggleButtonOptionsPreviewType[];
    exclusive: boolean;
    color: ColorEnum;
    size: SizeEnum;
    orientation: OrientationEnum;
    disabled: boolean;
    fullWidth: boolean;
    onChange: {} | null;
}
