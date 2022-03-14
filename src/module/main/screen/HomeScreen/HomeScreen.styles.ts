import styled from "@peersyst/react-native-styled";
import { Paper } from "react-native-components";

export const CardBackground = styled(Paper, { elevation: 2 })(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "90%",
    backgroundColor: theme.palette.lighterGray,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowOffset: {
        height: -2,
        width: 0,
    },
    shadowRadius: 6,
    elevation: -1,
    zIndex: -1,
}));
