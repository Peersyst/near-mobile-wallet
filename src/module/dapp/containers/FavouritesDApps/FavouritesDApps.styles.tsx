import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const FavouritesDAppsRoot = styled(Col)(({ theme }) => ({
    backgroundColor: theme.palette.background,
    borderRadius: theme.borderRadius,
    paddingHorizontal: 20,
    paddingVertical: 24,
    rowGap: 8,
}));
