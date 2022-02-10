import { StyleSheet } from "react-native"
import { theme } from "module/common/style/theme";
import { ChipStylesProps } from "./Chip.types";

export const ChipStyles = ({ variant }: ChipStylesProps) => StyleSheet.create({
    chipRoot: {
        height: 48,
        paddingHorizontal: 20,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        borderRadius: theme.borders.chipBorder,
        shadowColor: theme.palette.fullBlack,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 12,
        backgroundColor: variant === "light" ? (theme.palette.lighterGray) : (theme.palette.black)
    },
    notFullWidth: {
        alignSelf: "flex-start",
    },
    chipLabel: {
        fontSize: 18,
        marginBottom: 2,
        color: variant === "light" ? theme.palette.darkFont : theme.palette.white
    }
})