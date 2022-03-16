import { Animated, Backdrop, BackdropProps } from "react-native-components";
import GlassNavigator, { GlassNavigatorProps } from "module/common/component/navigation/GlassNavigator/GlassNavigator";

const SlidingGlassNavigator = Animated.createAnimatedComponent.slide(GlassNavigator, { direction: "up", appear: true });

const GlassNavigatorModal = ({
    breadcrumbs,
    navbar: { back, onBack, title, logo } = {},
    children,
    style,
    closable = true,
    ...backdropProps
}: Omit<BackdropProps, "children" | "style"> & GlassNavigatorProps): JSX.Element => (
    <Backdrop closable={closable} {...backdropProps}>
        {([open, setOpen]) => (
            <SlidingGlassNavigator
                in={open}
                breadcrumbs={breadcrumbs}
                navbar={{ back: back && closable, title, logo, onBack: onBack || (() => setOpen(false)) }}
                style={{ height: "90%", ...style }}
            >
                {children}
            </SlidingGlassNavigator>
        )}
    </Backdrop>
);

export default GlassNavigatorModal;
