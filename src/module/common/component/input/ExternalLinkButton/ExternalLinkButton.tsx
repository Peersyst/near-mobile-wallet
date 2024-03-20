import Button from "../Button/Button";
import { ButtonProps } from "../Button/Button.types";
import { ExternalLinkIcon } from "module/common/icons/ExternalLinkIcon";
import { Linking } from "react-native";

export interface ExternalLinkButtonProps extends Omit<ButtonProps, "children" | "onPress" | "leftIcon" | "rightIcon" | "type" | "onPress"> {
    label: string;
    url: string;
    showIcon?: boolean;
}

function ExternalLinkButton({ label, url, showIcon, ...rest }: ExternalLinkButtonProps) {
    function handlePress() {
        Linking.openURL(url);
    }

    return (
        <Button onPress={handlePress} leftIcon={showIcon ? <ExternalLinkIcon style={{ fontSize: 24 }} /> : undefined} {...rest}>
            {label}
        </Button>
    );
}

export default ExternalLinkButton;
