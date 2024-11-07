import { BaseBottomBarScreen } from "../BaseBottomBarScreen";

export function withBaseBottomBarScreen(Component: any) {
    return (props: any) => {
        return (
            <BaseBottomBarScreen>
                <Component {...props} />
            </BaseBottomBarScreen>
        );
    };
}
