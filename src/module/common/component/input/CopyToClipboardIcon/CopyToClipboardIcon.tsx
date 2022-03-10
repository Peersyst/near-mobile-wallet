import { CopyIcon } from "icons";
import * as Clipboard from "expo-clipboard";
import { IconButton, IconButtonProps, IconButtonStyles } from "react-native-components";

interface CopyToClipboardIconProps extends Omit<IconButtonProps, "children"> {
    text: string;
    style?: IconButtonStyles;
}

const CopyToClipboardIcon = ({ text, style, ...rest }: CopyToClipboardIconProps): JSX.Element => {
    const copyToClipboard = () => {
        Clipboard.setString(text);
    };

    return (
        <IconButton {...rest} style={style} onPress={() => copyToClipboard()}>
            <CopyIcon />
        </IconButton>
    );
};

export default CopyToClipboardIcon;
