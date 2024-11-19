import styled from "@peersyst/react-native-styled";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";

export const DAppWebViewModalRoot = styled(CardNavigatorModal)(() => ({
    height: "100%",
    body: {
        padding: 0,
        paddingBottom: 0,
    },
}));
