import styled from "@peersyst/react-native-styled";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";

export const StakeModalRoot = styled(CardNavigatorModal)(({ dimensions }) => ({
    height: dimensions.height * 0.9,
}));
