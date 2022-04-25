import { HeaderRoot, HeaderToolbar } from "./Header.styles";
import LogoRow from "module/common/component/display/Logos/LogoRow/LogoRow";
import { IconButton, Row } from "react-native-components";
import { SettingsIcon } from "icons";
import useNavigation from "../../../hook/useNavigation";
export interface HeaderProps {
    showIcons?: boolean;
}
const Header = ({ showIcons = true }: HeaderProps): JSX.Element => {
    const navigation = useNavigation();
    return (
        <HeaderRoot elevation={6} square>
            <HeaderToolbar>
                <Row alignItems="center" justifyContent="space-between" flex={1}>
                    <LogoRow />
                    {showIcons && (
                        <Row gap={16}>
                            <IconButton onPress={() => navigation.navigate("Settings")}>
                                <SettingsIcon />
                            </IconButton>
                        </Row>
                    )}
                </Row>
            </HeaderToolbar>
        </HeaderRoot>
    );
};
export default Header;
