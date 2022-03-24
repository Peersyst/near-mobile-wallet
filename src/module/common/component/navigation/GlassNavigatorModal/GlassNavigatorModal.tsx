import { Backdrop, ExposedBackdropProps } from "react-native-components";
import GlassNavigator, { GlassNavigatorProps } from "module/common/component/navigation/GlassNavigator/GlassNavigator";
import { useWindowDimensions } from "react-native";

const GlassNavigatorModal = ({
    breadcrumbs,
    navbar: { back, onBack, title, logo } = {},
    children,
    style,
    closable = true,
    scrollable,
    ...backdropProps
}: ExposedBackdropProps & GlassNavigatorProps): JSX.Element => {
    const { height } = useWindowDimensions();
    
    return (
        <Backdrop closable={closable} {...backdropProps}>
            {(_open, setOpen) => (
                <GlassNavigator
                    breadcrumbs={breadcrumbs}
                    navbar={{
                        back: back && closable,
                        title,
                        logo,
                        onBack: onBack || (() => setOpen(false)),
                    }}
                    style={{ height: height * 0.9, ...style }}
                    scrollable={scrollable}
                >
                    {children}
                </GlassNavigator>
            )}
        </Backdrop>
    );
};

export default GlassNavigatorModal;
