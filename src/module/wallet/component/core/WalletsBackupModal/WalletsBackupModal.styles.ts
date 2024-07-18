import styled from "@peersyst/react-native-styled";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { WalletsBackupModalTabs } from "./WalletsBackupModal";

export const WalletBackupModalRoot = styled(CardNavigatorModal)(({ dimensions, index }) => ({
    minHeight: index === WalletsBackupModalTabs.QUIZ ? dimensions.height * 0.5 : dimensions.height * 0.85,
}));
