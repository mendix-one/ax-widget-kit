/**
 * This file was generated from AXResetpswForm.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface AXResetpswFormContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    emailAttr?: EditableValue<string>;
    onSubmit?: ActionValue;
    onNavigateSignIn?: ActionValue;
}

export interface AXResetpswFormPreviewProps {
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    emailAttr: string;
    onSubmit: {} | null;
    onNavigateSignIn: {} | null;
}
