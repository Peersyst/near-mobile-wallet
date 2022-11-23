import BasePage from "module/common/component/layout/BasePage/BasePage";
import styled from "@peersyst/react-native-styled";

export const FullScreenModalContent = styled(BasePage, { header: false })(({ theme }) => ({
    backgroundColor: theme.palette.blue,
}));
