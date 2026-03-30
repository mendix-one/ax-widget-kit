/**
 * This file was generated from AXAuthPage.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type PageEnum = "signIn" | "signUp" | "resetPass";

export interface AXAuthPageContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    page: PageEnum;
    showSSO: boolean;
    emailAttr?: EditableValue<string>;
    passwordAttr?: EditableValue<string>;
    fullNameAttr?: EditableValue<string>;
    tagline?: DynamicValue<string>;
    brandDescription?: DynamicValue<string>;
    onSubmit?: ActionValue;
    onNavigateSignIn?: ActionValue;
    onNavigateSignUp?: ActionValue;
    onNavigateResetPass?: ActionValue;
    onGoogleSSO?: ActionValue;
    onMicrosoftSSO?: ActionValue;
}

export interface AXAuthPagePreviewProps {
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
    page: PageEnum;
    showSSO: boolean;
    emailAttr: string;
    passwordAttr: string;
    fullNameAttr: string;
    tagline: string;
    brandDescription: string;
    onSubmit: {} | null;
    onNavigateSignIn: {} | null;
    onNavigateSignUp: {} | null;
    onNavigateResetPass: {} | null;
    onGoogleSSO: {} | null;
    onMicrosoftSSO: {} | null;
}
