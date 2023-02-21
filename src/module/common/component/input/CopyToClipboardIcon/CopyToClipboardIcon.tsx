import { CopyIcon, FilledCopyIcon } from "icons";
import * as Clipboard from "expo-clipboard";
import { IconButton, IconButtonProps, IconButtonStyles, useToast } from "@peersyst/react-native-components";

interface CopyToClipboardIconProps extends Omit<IconButtonProps, "children"> {
    text: string;
    style?: IconButtonStyles;
    toastMessage?: string;
    filled?: boolean;
}

const CopyToClipboardIcon = ({ text, style, toastMessage, filled, ...rest }: CopyToClipboardIconProps): JSX.Element => {
    const { showToast } = useToast();

    const copyToClipboard = () => {
        Clipboard.setStringAsync(text);
        if (toastMessage) showToast(toastMessage, { type: "success" });
    };

    return (
        <IconButton {...rest} style={style} onPress={() => copyToClipboard()}>
            {filled ? <FilledCopyIcon /> : <CopyIcon />}
        </IconButton>
    );
};

export default CopyToClipboardIcon;
