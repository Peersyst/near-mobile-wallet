import { useTranslate } from "module/common/hook/useTranslate";
import Button from "../Button/Button";
import { ButtonProps } from "../Button/Button.types";
import { ShareIcon } from "module/common/icons/ShareIcon";
import Typography from "../../display/Typography/Typography";
import { Row, SharePayload, useShare } from "@peersyst/react-native-components";

export interface ShareButtonProps extends Omit<ButtonProps, "children" | "onPress">, SharePayload {
    label?: string;
}

function ShareButton({ label, shareContent, options, ...rest }: ShareButtonProps) {
    const translate = useTranslate();
    const { share } = useShare();

    async function handlePress() {
        await share({ shareContent, options });
    }

    return (
        <Button {...rest} onPress={handlePress}>
            <Row gap={14}>
                <ShareIcon />
                <Typography variant="body2Strong">{label || translate("share")}</Typography>
            </Row>
        </Button>
    );
}

export default ShareButton;
