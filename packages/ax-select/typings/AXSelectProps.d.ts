/**
 * This file was generated from AXSelect.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type VariantEnum = "outlined" | "filled" | "standard";

export type SizeEnum = "small" | "medium";

export interface AXSelectOptionsType {
    optValue: string;
    optLabel?: DynamicValue<string>;
}

export interface AXSelectContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttr?: EditableValue<string>;
    label?: DynamicValue<string>;
    options: AXSelectOptionsType[];
    variant: VariantEnum;
    size: SizeEnum;
    disabled: boolean;
    fullWidth: boolean;
    helperText?: DynamicValue<string>;
    onChange?: ActionValue;
}

export interface AXSelectOptionsPreviewType {
    optValue: string;
    optLabel: string;
}

export interface AXSelectPreviewProps {
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    valueAttr: string;
    label: string;
    options: AXSelectOptionsPreviewType[];
    variant: VariantEnum;
    size: SizeEnum;
    disabled: boolean;
    fullWidth: boolean;
    helperText: string;
    onChange: {} | null;
}
