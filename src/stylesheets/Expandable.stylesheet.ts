import { Expandable, ExpandableContent, ExpandableDisplay } from "@peersyst/react-native-components";
import { stylesheet } from "@peersyst/react-native-styled";

export const expandableStylesheet = stylesheet(Expandable)(({ fromTheme }) => ({
    // Comments : not working with theme palette.altOverlay.8% ni palette.altOverlay["8%"], so using "#26262614" instead
    borderColor: "#26262614",
    borderWidth: 1,
    borderRadius: 8,
    $open: {
        borderColor: fromTheme("palette.purple"),
        borderWidth: 2,
    },
}));

export const expandableDisplayStylesheet = stylesheet(ExpandableDisplay)(({ fromTheme }) => ({
    fontSize: fromTheme("typography.body2Strong.fontSize"),
    fontFamily: fromTheme("typography.body2Strong.fontFamily"),
    fontWeight: fromTheme("typography.body2Strong.fontWeight"),

    $icon: {
        fontSize: 16,
    },

    $open: {
        $icon: {
            color: fromTheme("palette.purple"),
        },
    },
}));

export const expandableContentStylesheet = stylesheet(ExpandableContent)(() => ({
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 0,
}));
