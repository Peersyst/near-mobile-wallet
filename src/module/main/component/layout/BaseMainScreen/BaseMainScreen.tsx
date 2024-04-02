import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { ReactNode } from "react";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { View } from "react-native";
import { BaseMainScreenRoot } from "module/main/component/layout/BaseMainScreen/BaseMainScreen.styles";
import { BaseMainVariant } from "./BaseMainScreen.stypes";

export interface BaseMainScreenProps extends NavbarProps {
    children: ReactNode;
    variant?: BaseMainVariant;
}

const BaseMainScreen = ({ children, variant = BaseMainVariant.WHITE, ...navbarProps }: BaseMainScreenProps): JSX.Element => {
    return (
        <BaseMainScreenRoot variant={variant}>
            {Object.entries(navbarProps).length > 0 && <Navbar {...navbarProps} />}
            <View style={{ flex: 1 }}>{children}</View>
        </BaseMainScreenRoot>
    );
};

export default BaseMainScreen;
