import { StyleSheet, StyleProp, TextStyle } from "react-native"
import styled, { css } from "styled-components/native";
import { theme } from "module/common/style/theme";
import { ChipVariant, ChipRootProps } from "./Chip.types";

const variantRootStyles: Record<ChipVariant, ReturnType<typeof css>> = {
    light: css(() => ({
        backgroundColor: theme.palette.lighterGray,
    })),
    dark: css({
        backgroundColor: theme.palette.black
    }),
};

const variantLabelStyles: Record<ChipVariant, ReturnType<typeof css>> = {
    light: css(() => ({
        color: theme.palette.darkFont,
    })),
    dark: css({
        color: theme.palette.white
    }),
};

export const ChipRoot = styled.View<ChipRootProps>(({ theme, variant }) => {
    return css`
    height:48px;
    align-self: flex-start;
    padding: 0 20px;
    align-items: center;
    display:flex;
    justify-content: center;
    ${variantRootStyles[variant || "light"]};
    border-radius: ${theme.borders.chipBorder}
    `;
});

export const ChipLabel = styled.Text<ChipRootProps>(({ theme, variant }) => {
    return css`
    font-size: 18px;
    margin-bottom: 2px;
    color: #363636;
    ${variantLabelStyles[variant || "light"]};
    `;
});


export const shadowStyle = StyleSheet.create({
    shadow: {
        shadowColor: theme.palette.fullBlack,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 12,
    },
    innerWhiteShadow: {
        shadowColor: theme.palette.white,
        shadowOffset: {
            width: 0,
            height: -6,
        },
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: -2,
    }
})