/**
 * This file was generated from AXRadioGroup.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type ColorEnum = "primary" | "secondary" | "success" | "warning" | "error" | "info";

export type SizeEnum = "small" | "medium";

export interface AXRadioGroupOptionsType {
    optValue: string;
    optLabel?: DynamicValue<string>;
}

export interface AXRadioGroupContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttr?: EditableValue<string>;
    label?: DynamicValue<string>;
    options: AXRadioGroupOptionsType[];
    row: boolean;
    color: ColorEnum;
    size: SizeEnum;
    disabled: boolean;
    onChange?: ActionValue;
}

export interface AXRadioGroupOptionsPreviewType {
    optValue: string;
    optLabel: string;
}

export interface AXRadioGroupPreviewProps {
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    valueAttr: string;
    label: string;
    options: AXRadioGroupOptionsPreviewType[];
    row: boolean;
    color: ColorEnum;
    size: SizeEnum;
    disabled: boolean;
    onChange: {} | null;
}
