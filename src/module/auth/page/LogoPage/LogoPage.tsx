import BasePage from "module/common/component/layout/BasePage/BasePage";
import LogoCol from "module/common/component/display/Logos/LogoCol/LogoCol";
import { ReactNode } from "react";
import { LogoIcon } from "icons";
import { View } from "react-native";

export interface LogoPageProps {
    children: React.ReactNode;
}

const LogoPage = ({ children }: LogoPageProps): JSX.Element => {
    return (
        <BasePage appearance="dark" header={false}>
            <View style={{flex: 1}}>
                <LogoIcon style={{color: "white"}} size={"100%"} />
            </View>

            <LogoCol size={"md"} appearance={"light"} />
            {children}
        </BasePage>
    );
};

export default LogoPage;
