import { Col } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";

const WalletsBackupAdviseAlertContent = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <Col gap={2}>
            <Typography color="orange" variant="body3Strong">
                {translate("backup_wallet_advise_text_2_title")}
            </Typography>
            <Typography color="orange" variant="body3Regular">
                {translate("backup_wallet_advise_text_2_text")}
            </Typography>
            <Typography color="orange" variant="body3Regular">
                {translate("backup_wallet_advise_text_2_text_2")}
            </Typography>
        </Col>
    );
};

export default WalletsBackupAdviseAlertContent;
