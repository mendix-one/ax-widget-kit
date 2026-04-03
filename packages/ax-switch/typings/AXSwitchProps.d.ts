/**
 * This file was generated from AXSwitch.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type ColorEnum = "primary" | "secondary" | "success" | "warning" | "error" | "info";

export type SizeEnum = "small" | "medium";

export type LabelPlacementEnum = "end" | "start" | "top" | "bottom";

export interface AXSwitchContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    checkedAttr?: EditableValue<boolean>;
    label?: DynamicValue<string>;
    color: ColorEnum;
    size: SizeEnum;
    disabled: boolean;
    labelPlacement: LabelPlacementEnum;
    onChange?: ActionValue;
}

export interface AXSwitchPreviewProps {
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    checkedAttr: string;
    label: string;
    color: ColorEnum;
    size: SizeEnum;
    disabled: boolean;
    labelPlacement: LabelPlacementEnum;
    onChange: {} | null;
}
