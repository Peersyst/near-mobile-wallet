import styled from "@peersyst/react-native-styled";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";

export const AddWalletModalRoot = styled(CardNavigatorModal)(({ dimensions }) => ({
    minHeight: dimensions.height * 0.88,
}));
