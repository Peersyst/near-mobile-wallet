import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { ActionDetailsModalHeaderRootProps } from "./ActionDetailsModalHeader.types";
import { alpha } from "@peersyst/react-utils";

export const ActionDetailsModalHeaderRoot = styled(Row, { gap: 12 })<ActionDetailsModalHeaderRootProps>(
    ({ theme: { palette }, isActive }) => ({
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: isActive ? alpha(palette.primary, 0.06) : palette.overlay["4%"],
        borderRadius: 12,
        alignItems: "center",
    }),
);
