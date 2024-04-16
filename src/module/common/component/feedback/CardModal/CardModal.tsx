import { Backdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import { ReactNode, useState } from "react";
import { Keyboard, LayoutChangeEvent, ViewStyle, useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CardModalBodyWrapper, CardModalContent, CardModalWrapper } from "./CardModal.styles";

export interface CardModalChildren {
    header: ReactNode;
    body: ReactNode;
}

export type CardModalProps = ExposedBackdropProps & {
    style?: ViewStyle;
    children: ((open: boolean, setOpen: (value: boolean) => unknown) => CardModalChildren) | CardModalChildren;
};

const CardModal = ({ children, style, open, closable = true, onClose, ...backdropProps }: CardModalProps): JSX.Element => {
    const [keyboardPaddingEnabled, setKeyboardPaddingEnabled] = useState(false);
    const { height } = useWindowDimensions();

    const handleLayout = (e: LayoutChangeEvent) => {
        setKeyboardPaddingEnabled(e.nativeEvent.layout.height < height * 0.65);
    };

    const handleOnClose = () => {
        Keyboard.dismiss();
        onClose?.();
    };

    return (
        <Backdrop closable={closable} onClose={handleOnClose} {...backdropProps} open={open}>
            {(open, setOpen) => {
                const { header, body } = typeof children === "function" ? children(open, setOpen) : children;
                return (
                    <CardModalContent style={style} enabled={keyboardPaddingEnabled} behavior="padding">
                        <CardModalWrapper onLayout={handleLayout}>
                            {header}
                            <KeyboardAwareScrollView
                                style={{ flex: 1, height: "100%" }}
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{ flexGrow: 1 }}
                                alwaysBounceVertical={false}
                                enableAutomaticScroll={!keyboardPaddingEnabled}
                            >
                                <CardModalBodyWrapper flex={1} onStartShouldSetResponder={() => true}>
                                    {body}
                                </CardModalBodyWrapper>
                            </KeyboardAwareScrollView>
                        </CardModalWrapper>
                    </CardModalContent>
                );
            }}
        </Backdrop>
    );
};

export default CardModal;
