import BasePage from "module/common/component/layout/BasePage/BasePage";
import LogoCol from "module/common/component/display/Logos/LogoCol/LogoCol";
import { LogoPageIconRoot } from "./LogoPage.styles";
import { ReactNode } from "react";

export interface LogoPageProps {
    children?: ReactNode;
}

const LogoPage = ({ children }: LogoPageProps): JSX.Element => {
    return (
        <BasePage appearance="dark" header={false}>
            <LogoPageIconRoot>
                <LogoCol />
            </LogoPageIconRoot>
            {children}
        </BasePage>
    );
};

export default LogoPage;
