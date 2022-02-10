import { StyleSheet } from "react-native"
import { theme } from "module/common/style/theme";


export const TextLogoStyles =  StyleSheet.create({
    TextLogoRoot: {
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
    },
    TextRoot: {
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    SecondText: {
        marginLeft: 1,
        fontWeight: "bold"
    },
    TextLogoFont: {
        fontSize: 23,
        textTransform: "uppercase",
    },
    Icon: {
        color: theme.palette.black,
        fontSize: 37
    }
}) 