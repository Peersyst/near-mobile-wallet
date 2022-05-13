import { HeaderRoot } from "./Header.styles";
import Toolbar from "../../layout/Toolbar/Toolbar";
import LogoRow from "module/common/component/display/Logos/LogoRow/LogoRow";
import { IconButton, Row } from "react-native-components";
import { SettingsIcon } from "icons";
import useNavigation from "../../../hook/useNavigation";
import RefreshButton from "module/wallet/component/input/RefreshButton/RefreshButton";
import FaucetButton from "module/wallet/component/input/FaucetButton/FaucetButton";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";

export interface HeaderProps {
    showIcons?: boolean;
}

const Header = ({ showIcons = true }: HeaderProps): JSX.Element => {
    const navigation = useNavigation();
    const { network } = useRecoilValue(settingsState);
    return (
        <HeaderRoot elevation={6} square>
            <Toolbar>
                <Row alignItems="center" justifyContent="space-between" flex={1}>
                    <LogoRow />
                    {showIcons && (
                        <Row gap={16}>
                            {network === "testnet" && <FaucetButton />}
                            <RefreshButton />
                            <IconButton onPress={() => navigation.navigate("Settings")}>
                                <SettingsIcon />
                            </IconButton>
                        </Row>
                    )}
                </Row>
            </Toolbar>
        </HeaderRoot>
    );
};

export default Header;
