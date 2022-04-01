import styled from "@peersyst/react-native-styled";
import Glass from "module/common/component/surface/Glass/Glass";

export const EditWalletModalRoot = styled(Glass)(({ dimensions: { height } }) => ({
    height: height > 680 ? height * 0.6 : height * 0.55,
}));
