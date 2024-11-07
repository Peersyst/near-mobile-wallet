import { useBasePage } from "../BasePage/hooks/useBasePage";
import { BaseBottomBarScreenRoot } from "./BaseBottomBarScreen.styles";
import { BaseBottomBarScreenProps } from "./BaseBottomBarScreen.types";

export function BaseBottomBarScreen({ children, style }: BaseBottomBarScreenProps) {
    const { watchStatusBar, header } = useBasePage();
    return (
        <BaseBottomBarScreenRoot header={header} watchStatusBar={watchStatusBar} style={style}>
            {children}
        </BaseBottomBarScreenRoot>
    );
}
