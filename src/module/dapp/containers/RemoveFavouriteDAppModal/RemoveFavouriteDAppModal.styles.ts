import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { DeleteIcon } from "icons";

export const RemoveFavouriteDAppModalIcon = styled(DeleteIcon)(({ theme }) => ({
    color: theme.palette.status.error,
}));

export const CardNavigatorModalContent = styled(Row)(() => ({
    columnGap: 8,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
}));
