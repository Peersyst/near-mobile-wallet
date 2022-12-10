import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { CARD_NAVIGATOR_PADDING } from "module/common/component/navigation/CardNavigator/CardNavigator.styles";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { NARVAR_HEIGHT } from "module/common/component/navigation/Navbar/Navbar.styles";

export const AddWalletModalRoot = styled(CardNavigatorModal)(({ dimensions }) => ({
    minHeight: dimensions.height * 0.85,
}));

export const AddWalletModalContent = styled(Col)(({ dimensions }) => ({
    paddingTop: "3%",
    minHeight: dimensions.height * 0.85 - NARVAR_HEIGHT - CARD_NAVIGATOR_PADDING,
    flex: 1,
}));
