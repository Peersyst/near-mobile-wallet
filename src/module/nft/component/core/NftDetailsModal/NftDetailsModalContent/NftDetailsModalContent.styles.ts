import styled from "@peersyst/react-native-styled";
import { CARD_MODAL_PADDING } from "module/common/component/feedback/CardModal/CardModal.styles";
import NftImage from "module/nft/component/display/NftImage/NftImage";

export const NftDetailsModalContentImage = styled(NftImage)(({ dimensions }) => ({
    width: dimensions.width - CARD_MODAL_PADDING * 2,
    height: dimensions.width - CARD_MODAL_PADDING * 2,
}));
