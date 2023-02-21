import styled from "@peersyst/react-native-styled";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";

export const WalletBackupModalRoot = styled(CardNavigatorModal)(({ dimensions }) => ({
    minHeight: dimensions.height * 0.85,
}));
