import { useState } from "react";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { Row } from "@peersyst/react-native-components";
import SelectNetwork from "module/settings/components/core/SelectNetwork/SelectNetwork";
import { ChipNetwork } from "./ChipSelectNetwork.styles";

const ChipSelectNetwork = (): JSX.Element => {
    const { network } = useRecoilValue(settingsState);
    const [openSelect, setOpenSelect] = useState(false);
    return (
        <Row style={{ position: "absolute", left: 8 }}>
            <ChipNetwork label={network.toUpperCase()} variant="filled" size="sm" onPress={() => setOpenSelect(true)} type={network} />
            <SelectNetwork style={{ display: "none" }} setOpenExternal={setOpenSelect} open={openSelect} />
        </Row>
    );
};

export default ChipSelectNetwork;
