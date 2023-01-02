import { Backdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigator, { CardNavigatorProps } from "module/common/component/navigation/CardNavigator/CardNavigator";

export type CardNavigatorModalProps = ExposedBackdropProps & CardNavigatorProps;

const CardNavigatorModal = ({
    navbar: { back, onBack, ...restNavProps } = {},
    children,
    style,
    open,
    closable = true,
    onClose,
    ...backdropProps
}: CardNavigatorModalProps): JSX.Element => {
    return (
        <Backdrop closable={closable} onClose={onClose} {...backdropProps} open={open}>
            {(_open, setOpen) => (
                <CardNavigator
                    navbar={{
                        back: back && closable,
                        onBack:
                            onBack ||
                            (() => {
                                setOpen(false);
                                if (open !== undefined) onClose?.();
                            }),
                        ...restNavProps,
                    }}
                    style={style}
                >
                    {children}
                </CardNavigator>
            )}
        </Backdrop>
    );
};

export default CardNavigatorModal;
