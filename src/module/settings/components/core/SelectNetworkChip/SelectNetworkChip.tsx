import { useState } from "react";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { Row } from "@peersyst/react-native-components";
import SelectNetwork from "module/settings/components/core/SelectNetwork/SelectNetwork";
import { ChipNetwork } from "./SelectNetworkChip.styles";
import { ViewStyle } from "react-native";

export interface SelectNetworkChipProps {
    style?: ViewStyle;
}

const SelectNetworkChip = ({ style }: SelectNetworkChipProps): JSX.Element => {
    const { network } = useRecoilValue(settingsState);
    const [openSelect, setOpenSelect] = useState(false);
    return (
        <Row style={style}>
            <ChipNetwork label={network.toUpperCase()} variant="filled" size="sm" onPress={() => setOpenSelect(true)} type={network} />
            <SelectNetwork style={{ display: "none" }} onClose={() => setOpenSelect(false)} open={openSelect} />
        </Row>
    );
};

export default SelectNetworkChip;
