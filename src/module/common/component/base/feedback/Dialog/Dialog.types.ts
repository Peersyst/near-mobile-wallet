/**
 * Type default: shows buttons in primary color
 * Type destructive: show buttons colors in warning color
 * Type positive: show buttons colors in success color
 */
export type DialogButtonType = "default" | "destructive" | "positive";

export interface DialogButton {
    text: string;
    onPress?: () => any;
    type?: DialogButtonType;
}

export interface DialogProps {
    title: string;
    message?: string;
    buttons?: DialogButton[];
}

export interface DialogOptionProps {
    type?: DialogButtonType;
}
