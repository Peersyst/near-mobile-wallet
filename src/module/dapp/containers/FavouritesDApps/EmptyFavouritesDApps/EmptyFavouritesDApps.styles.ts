import styled from "@peersyst/react-native-styled";
import { EmptyStarIcon } from "icons";

export const EmptyFavouritesDAppsIcon = styled(EmptyStarIcon)(({ theme }) => ({
    color: theme.palette.primary,
}));
