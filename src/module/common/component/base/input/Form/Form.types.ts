import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface FieldState {
    valid?: boolean;
    value: any;
}

export type FormProps = {
    /**
     * onSubmit handler
     */
    onSubmit: (data: any) => any;
    /**
     * onInvalid handler
     */
    onInvalid?: () => any;
    /**
     * Form style
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Form children
     */
    children: ReactNode;
};

export interface FieldNotification {
    valid?: boolean;
    name: string;
    value: any;
}

export interface FormContextInterface {
    notifyForm: (notification: FieldNotification) => void;
    valid: boolean;
    submitted: boolean;
    handleSubmit: () => any;
}
