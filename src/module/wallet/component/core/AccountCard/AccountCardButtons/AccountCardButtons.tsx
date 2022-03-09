import styled from "@peersyst/react-native-styled";
import { alpha } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import { Row } from "react-native-components";

const CardButton = styled(Button, { size: "sm", variant: "outlined" })<{ position: "left" | "right" }>(({ theme, position }) => ({
    borderTopRightRadius: position === "left" ? 0 : undefined,
    borderBottomRightRadius: position === "left" ? 0 : undefined,
    borderTopLeftRadius: position === "right" ? 0 : undefined,
    borderBottomLeftRadius: position === "right" ? 0 : undefined,
    borderLeftWidth: position === "left" ? 0 : 1,
    borderRightWidth: position === "left" ? 1 : 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "red",
    outlined: {
        color: theme.palette.white,
        borderColor: theme.palette.white,
        textTransform: "none",
    },
    backgroundColor: alpha(theme.palette.white, 0.3),
}));

const AccountCardButtons = (): JSX.Element => {
    return (
        <Row justifyContent="center">
            <CardButton position="left">Send</CardButton>
            {/* <CardButton position="right">Right</CardButton> */}
        </Row>
    );
};

export default AccountCardButtons;
