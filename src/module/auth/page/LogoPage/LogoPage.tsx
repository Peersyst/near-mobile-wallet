import BasePage from "module/common/component/layout/BasePage/BasePage";
import LogoCol from "module/common/component/display/Logos/LogoCol/LogoCol";
import { LogoPageIconRoot } from "./LogoPage.styles";

export interface LogoPageProps {
    children?: React.ReactNode;
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
