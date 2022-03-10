import { CopyIcon } from "icons";
import * as Clipboard from "expo-clipboard";
import { IconButton, IconButtonProps, IconButtonStyles, useToast } from "react-native-components";

interface CopyToClipboardIconProps extends Omit<IconButtonProps, "children"> {
    text: string;
    style?: IconButtonStyles;
    message?: string;
}

const CopyToClipboardIcon = ({ text, style, message, ...rest }: CopyToClipboardIconProps): JSX.Element => {
    const { showToast } = useToast();

    const copyToClipboard = () => {
        Clipboard.setString(text);
        if (message) showToast(message, { type: "success" });
    };

    return (
        <IconButton {...rest} style={style} onPress={() => copyToClipboard()}>
            <CopyIcon />
        </IconButton>
    );
};

export default CopyToClipboardIcon;
