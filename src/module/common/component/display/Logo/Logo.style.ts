import styled from "@peersyst/react-native-styled";
import { LogoIcon } from "icons";
import { getTextColor } from "utils/getTextColor";
import { LogoRootProps, SizeRelationType } from "./Logo.types";

export const LogoRoot = styled(LogoIcon)<LogoRootProps>(({ theme, appearance, fontSize }) => {
    const color = getTextColor(theme);
    return {
        ...color[appearance],
        fontSize: fontSize,
    };
});

export const sizeRelations: SizeRelationType = {
    horizontal: {
        sm: {
            logoSize: 12,
            gap: 2,
        },
        md: {
            logoSize: 23,
            gap: 4,
        },
        lg: {
            logoSize: 42,
            gap: 8,
        },
        xl: {
            logoSize: 42,
            gap: 8,
        },
    },
    vertical: {
        sm: {
            logoSize: 50,
            gap: 2,
        },
        md: {
            logoSize: 90,
            gap: 4,
        },
        lg: {
            logoSize: 150,
            gap: 10,
        },
        xl: {
            logoSize: 42,
            gap: 8,
        },
    },
};
