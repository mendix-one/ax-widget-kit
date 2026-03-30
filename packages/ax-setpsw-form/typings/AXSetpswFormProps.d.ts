/**
 * This file was generated from AXSetpswForm.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface AXSetpswFormContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    passwordAttr?: EditableValue<string>;
    onSubmit?: ActionValue;
    onNavigateSignIn?: ActionValue;
}

export interface AXSetpswFormPreviewProps {
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    passwordAttr: string;
    onSubmit: {} | null;
    onNavigateSignIn: {} | null;
}
