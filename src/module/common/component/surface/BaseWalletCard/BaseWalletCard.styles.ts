import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

import Chip from "module/common/component/display/Chip/Chip";

export const BaseWalletCardRoot = styled(Col, { flex: 1, gap: 20, alignItems: "center", justifyContent: "center" })(() => {
    return {
        width: "100%",
        height: "100%",
    };
});

export const ImportedWalletChip = styled(Chip)(() => {
    return {
        position: "absolute",
        top: 0,
        right: 0,
    };
});
