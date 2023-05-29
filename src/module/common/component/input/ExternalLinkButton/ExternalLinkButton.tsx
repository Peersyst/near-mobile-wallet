import Button from "../Button/Button";
import { ButtonProps } from "../Button/Button.types";
import { ExternalLinkIcon } from "module/common/icons/ExternalLinkIcon";
import { Linking } from "react-native";

export interface ExternalLinkButtonProps extends Omit<ButtonProps, "children" | "onPress" | "leftIcon" | "rightIcon" | "type" | "onPress"> {
    label: string;
    url: string;
}

function ExternalLinkButton({ label, url, ...rest }: ExternalLinkButtonProps) {
    function handlePress() {
        Linking.openURL(url);
    }

    return (
        <Button {...rest} onPress={handlePress} leftIcon={<ExternalLinkIcon style={{ fontSize: 24 }} />}>
            {label}
        </Button>
    );
}

export default ExternalLinkButton;
