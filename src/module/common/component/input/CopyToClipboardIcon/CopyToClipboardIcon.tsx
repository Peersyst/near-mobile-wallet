import { CopyIcon } from "icons";
import * as Clipboard from "expo-clipboard";
import { IconButton, IconButtonProps, IconButtonStyles } from "react-native-components";

interface CopyToClipboardIconProps extends Omit<IconButtonProps, "children"> {
    text: string;
    style?: IconButtonStyles;
}

const CopyToClipboardIcon = ({ text, style, withAnimation, ...rest }: CopyToClipboardIconProps): JSX.Element => {
    const copyToClipboard = () => {
        Clipboard.setString(text);
    };

    return (
        <IconButton {...rest} style={style} onPress={() => copyToClipboard()} withAnimation={withAnimation}>
            <CopyIcon />
        </IconButton>
    );
};

export default CopyToClipboardIcon;
