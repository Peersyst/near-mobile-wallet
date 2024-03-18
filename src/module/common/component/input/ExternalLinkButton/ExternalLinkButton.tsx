import Button from "../Button/Button";
import { ButtonProps } from "../Button/Button.types";
import { ExternalLinkIcon } from "module/common/icons/ExternalLinkIcon";
import { Linking } from "react-native";

export interface ExternalLinkButtonProps extends Omit<ButtonProps, "children" | "onPress" | "leftIcon" | "rightIcon" | "type" | "onPress"> {
    label: string;
    url: string;
    showIcon?: boolean;
    positionIcon?: "left" | "right";
}

function ExternalLinkButton({ label, url, showIcon, positionIcon = "left", ...rest }: ExternalLinkButtonProps) {
    function handlePress() {
        Linking.openURL(url);
    }

    const showExternalLinkIconLeft = showIcon && positionIcon === "left" ? <ExternalLinkIcon style={{ fontSize: 20 }} /> : undefined;
    const showExternalLinkIconRight = showIcon && positionIcon === "right" ? <ExternalLinkIcon style={{ fontSize: 20 }} /> : undefined;

    return (
        <Button onPress={handlePress} leftIcon={showExternalLinkIconLeft} rightIcon={showExternalLinkIconRight} {...rest}>
            {label}
        </Button>
    );
}

export default ExternalLinkButton;
