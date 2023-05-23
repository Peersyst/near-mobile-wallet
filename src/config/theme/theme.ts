import { createTheme } from "@peersyst/react-native-components";
import typography from "./typography";
import { CopyIcon } from "icons";

export const theme = createTheme({
    typography,
    borderRadius: 16,
    borderRadiusSm: 8,
    borderRadiusXs: 4,
    icons: {
        copy: CopyIcon,
    },
});
