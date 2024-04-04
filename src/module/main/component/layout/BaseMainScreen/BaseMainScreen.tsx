import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { ReactNode } from "react";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { View } from "react-native";
import { BaseMainScreenRoot } from "module/main/component/layout/BaseMainScreen/BaseMainScreen.styles";

export interface BaseMainScreenProps extends NavbarProps {
    children: ReactNode;
}

const BaseMainScreen = ({ children, title, back, ...navbarProps }: BaseMainScreenProps): JSX.Element => {
    const renderNavbar = title || back;
    return (
        <BaseMainScreenRoot>
            {renderNavbar && <Navbar title={title} back={back} {...navbarProps} />}
            <View style={{ flex: 1 }}>{children}</View>
        </BaseMainScreenRoot>
    );
};

export default BaseMainScreen;
