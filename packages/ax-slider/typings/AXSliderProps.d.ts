/**
 * This file was generated from AXSlider.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type ColorEnum = "primary" | "secondary";

export type SizeEnum = "small" | "medium";

export type ValueLabelDisplayEnum = "auto" | "on" | "off";

export interface AXSliderContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttr?: EditableValue<Big>;
    label?: DynamicValue<string>;
    min: number;
    max: number;
    step: number;
    disabled: boolean;
    marks: boolean;
    color: ColorEnum;
    size: SizeEnum;
    valueLabelDisplay: ValueLabelDisplayEnum;
    onChange?: ActionValue;
}

export interface AXSliderPreviewProps {
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    valueAttr: string;
    label: string;
    min: number | null;
    max: number | null;
    step: number | null;
    disabled: boolean;
    marks: boolean;
    color: ColorEnum;
    size: SizeEnum;
    valueLabelDisplay: ValueLabelDisplayEnum;
    onChange: {} | null;
}
