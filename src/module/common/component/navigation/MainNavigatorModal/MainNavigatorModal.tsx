import { Backdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import MainNavigator, { MainNavigatorProps } from "module/common/component/navigation/MainNavigator/MainNavigator";
import { useWindowDimensions } from "react-native";

const MainNavigatorModal = ({
    breadcrumbs,
    navbar: { back, onBack, title } = {},
    children,
    style,
    closable = true,
    scrollable,
    ...backdropProps
}: ExposedBackdropProps & MainNavigatorProps): JSX.Element => {
    const { height } = useWindowDimensions();

    return (
        <Backdrop closable={closable} {...backdropProps}>
            {(_open, setOpen) => (
                <MainNavigator
                    breadcrumbs={breadcrumbs}
                    navbar={{
                        back: back && closable,
                        title,

                        onBack: onBack || (() => setOpen(false)),
                    }}
                    style={{ height: height * 0.9, ...style }}
                    scrollable={scrollable}
                >
                    {children}
                </MainNavigator>
            )}
        </Backdrop>
    );
};

export default MainNavigatorModal;
