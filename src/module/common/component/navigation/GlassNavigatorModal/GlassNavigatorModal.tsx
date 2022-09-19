import { Backdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import GlassNavigator, { GlassNavigatorProps } from "module/common/component/navigation/GlassNavigator/GlassNavigator";

const GlassNavigatorModal = ({
    breadcrumbs,
    navbar: { back, onBack, title, logo } = {},
    children,
    style,
    extraScrollHeight,
    closable = true,
    scrollable,
    ...backdropProps
}: ExposedBackdropProps & GlassNavigatorProps): JSX.Element => {
    return (
        <Backdrop closable={closable} {...backdropProps}>
            {(_open, setOpen) => (
                <GlassNavigator
                    extraScrollHeight={extraScrollHeight}
                    breadcrumbs={breadcrumbs}
                    navbar={{
                        back: back && closable,
                        title,
                        logo,
                        onBack: onBack || (() => setOpen(false)),
                    }}
                    style={{ height: "90%", ...style }}
                    scrollable={scrollable}
                >
                    {children}
                </GlassNavigator>
            )}
        </Backdrop>
    );
};

export default GlassNavigatorModal;
