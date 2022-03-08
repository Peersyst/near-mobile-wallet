import { CopyIcon } from "icons";
import { IconButton, IconButtonStyles } from "../IconButton";
import { Clipboard } from "react-native";

interface CopyToClipboardIconProps {
    text: string;
    style?: IconButtonStyles;
}

const CopyToClipboardIcon = ({ text, style }: CopyToClipboardIconProps): JSX.Element => {
    const copyToClipboard = () => {
        Clipboard.setString(text);
    };

    return (
        <IconButton style={style} onPress={copyToClipboard}>
            <CopyIcon />
        </IconButton>
    );
};

export default CopyToClipboardIcon;
