import styled from "@peersyst/react-native-styled";
import { AppearanceProps } from "module/common/types";
import { ReactElement } from "react";
import { View } from "react-native";

export interface HeaderRootProps extends AppearanceProps{
    children: ReactElement;
}

export const HeaderRoot = styled(View)<HeaderRootProps>(({ theme }) => {
    return {
        width: "100%",
        height: 108,
        paddingBottom: 10,
        justifyContent: "flex-end",
        paddingHorizontal:15,
    }
});