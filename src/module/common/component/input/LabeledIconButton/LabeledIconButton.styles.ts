import styled from "@peersyst/react-native-styled";
import Button from "../Button/Button";

export const LabeledIconButtonButton = styled(Button)(() => {
    return {
        height: 48,
        width: 80,
        paddingHorizontal: 18,
        paddingVertical: 12,
    };
});
