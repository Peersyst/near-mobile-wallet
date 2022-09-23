import { Backdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigator, { CardNavigatorProps } from "module/common/component/navigation/CardNavigator/CardNavigator";

const CardNavigatorModal = ({
    navbar: { back, onBack, ...restNavProps } = {},
    children,
    style,
    closable = true,
    ...backdropProps
}: ExposedBackdropProps & CardNavigatorProps): JSX.Element => {
    return (
        <Backdrop closable={closable} {...backdropProps}>
            {(_open, setOpen) => (
                <CardNavigator
                    navbar={{
                        back: back && closable,
                        onBack: onBack || (() => setOpen(false)),
                        ...restNavProps,
                    }}
                    style={{ height: "90%", ...style }}
                >
                    {children}
                </CardNavigator>
            )}
        </Backdrop>
    );
};

export default CardNavigatorModal;
