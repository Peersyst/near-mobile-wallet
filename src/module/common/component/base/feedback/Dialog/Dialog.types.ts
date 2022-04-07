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
