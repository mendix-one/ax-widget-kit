/**
 * This file was generated from AXUserMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue } from "mendix";

export interface AXUserMenuContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    userName?: DynamicValue<string>;
    userEmail?: DynamicValue<string>;
    onSignOut?: ActionValue;
    onProfile?: ActionValue;
    onSettings?: ActionValue;
}

export interface AXUserMenuPreviewProps {
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
    userName: string;
    userEmail: string;
    onSignOut: {} | null;
    onProfile: {} | null;
    onSettings: {} | null;
}
