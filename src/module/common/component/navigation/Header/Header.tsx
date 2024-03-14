import { SettingsIcon } from "icons";
import LinearLogo from "../../display/LinearBgLogo/LinearBgLogo";
import { HeaderRoot, HeaderSettingsButton } from "./Header.styles";
import { Row } from "@peersyst/react-native-components";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "../MainNavigatorGroup/MainScreens";
import useWalletGradient from "module/wallet/hook/useWalletGradient";
import Chip from "../../display/Chip/Chip";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { useState } from "react";
import SelectNetwork from "module/settings/components/core/SelectNetwork/SelectNetwork";

const Header = (): JSX.Element => {
    const navigation = useNavigation();
    const [startColor, endColor] = useWalletGradient();
    const { network } = useRecoilValue(settingsState);
    const [openSelect, setOpenSelect] = useState(false);
    return (
        <HeaderRoot>
            <Row alignItems="center" justifyContent="center" flex={1}>
                <Row style={{ position: "absolute", left: 8 }}>
                    <Chip
                        label={network.toUpperCase()}
                        variant="filled"
                        size="sm"
                        style={{ backgroundColor: startColor, color: "white" }}
                        onPress={() => setOpenSelect(true)}
                    />
                    <SelectNetwork style={{ display: "none" }} isOpenExternal={openSelect} setOpenExternal={setOpenSelect} />
                </Row>
                <LinearLogo startColor={startColor} endColor={endColor} />
                <Row style={{ position: "absolute", right: 8 }}>
                    <HeaderSettingsButton onPress={() => navigation.navigate(MainScreens.SETTINGS)}>
                        <SettingsIcon />
                    </HeaderSettingsButton>
                </Row>
            </Row>
        </HeaderRoot>
    );
};

export default Header;
