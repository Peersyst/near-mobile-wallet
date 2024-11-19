import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { EmptyFavoriteIcon, FavoriteIcon } from "icons";

export const BrowserScreenHeaderInputRoot = styled(Row)(({ theme }) => ({
    backgroundColor: theme.palette.overlay["4%"],
    borderRadius: theme.borderRadiusMd,
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 20,
    paddingVertical: 12,
    columnGap: 10,
    flex: 1,
}));

export const FavouriteWebIcon = styled(FavoriteIcon)(({ theme }) => ({
    color: theme.palette.primary,
    fontSize: 16,
}));

export const NotFavouriteWebIcon = styled(EmptyFavoriteIcon)(({ theme }) => ({
    fontSize: 16,
    color: theme.palette.primary,
}));
