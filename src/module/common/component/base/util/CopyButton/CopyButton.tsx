import * as Clipboard from "expo-clipboard";
import { CopyButtonProps } from "./CopyButton.types";
import { useToast } from "../../feedback/ToastProvider";
import { IconButton } from "../../input/IconButton";
import { CopyIcon } from "../../assets/icons";

const CopyButton = ({ text, style, message, ...rest }: CopyButtonProps): JSX.Element => {
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

export default CopyButton;
