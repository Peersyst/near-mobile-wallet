import styled, { css } from "styled-components/native";

export const ButtonRoot = styled.View(
    ({ theme }) => css`
        height: 40px;
        padding: 0 5px;
        background-color: ${theme.palette.primary};
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    `,
);
