import { support } from "images";
import { SupportCardRoot, SupportImage } from "./SupportCard.styles";
import Typography from "module/common/component/display/Typography/Typography";
import useTranslate from "module/common/hook/useTranslate";
import { Col } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { Linking } from "react-native";
import { config } from "config";

const SupportCard = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <SupportCardRoot variant="white">
            <Col gap={24} alignItems="center">
                <SupportImage source={support} />
                <Typography variant="body3Strong" textAlign="center">
                    {translate("supportCardText")}
                </Typography>
                <Button variant="primary" onPress={() => Linking.openURL(config.discordUrl)}>
                    {config.discordUrl}
                </Button>
            </Col>
        </SupportCardRoot>
    );
};

export default SupportCard;
