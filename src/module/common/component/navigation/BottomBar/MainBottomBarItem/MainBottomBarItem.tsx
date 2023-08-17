import { ButtonProps } from "module/common/component/input/Button/Button.types";
import { MainBottomBarItemRoot } from "./MainBottomBarItem.styles";
import { Col, SvgIconProps } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { JSXElementConstructor } from "react";
import useThemeMode from "module/common/hook/useThemeMode";
import { theme } from "config/theme/theme";

export interface MainBottomBarItemProps extends ButtonProps {
    Icon: JSXElementConstructor<SvgIconProps>;
    label?: string;
}

const MainBottomBarItem = ({ Icon, label, ...rest }: MainBottomBarItemProps): JSX.Element => {
    const mode = useThemeMode();

    const textColor = mode === "light" ? theme.palette.background : theme.palette.text;

    return (
        <MainBottomBarItemRoot variant="contrast" size="lg" {...rest}>
            <Col flex={1} justifyContent="center" alignItems="center">
                <Icon style={{ color: textColor }} />
                {label && (
                    <Typography variant="body4Strong" style={{ color: textColor }}>
                        {label}
                    </Typography>
                )}
            </Col>
        </MainBottomBarItemRoot>
    );
};

export default MainBottomBarItem;
