import { useBasePage } from "../hooks/useBasePage";
import { BasePageContentRoot } from "./BasePageContent.styles";
import { BasePageContentProps } from "./BasePageContent.types";

export function BasePageContent({ children, style, header: headerProp, watchStatusBar: watchStatusBarProp }: BasePageContentProps) {
    const { watchStatusBar, header } = useBasePage();
    return (
        <BasePageContentRoot header={headerProp ?? header} watchStatusBar={watchStatusBarProp ?? watchStatusBar} style={style}>
            {children}
        </BasePageContentRoot>
    );
}
