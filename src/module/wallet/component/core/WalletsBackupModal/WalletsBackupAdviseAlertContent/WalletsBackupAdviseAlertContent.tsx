import { Col } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import useDeviceSize, { DeviceSize } from "module/common/hook/useDeviceSize";
import { TypographyAdvise } from "./WalletsBackupAdviseAlertContent.styles";

const WalletsBackupAdviseAlertContent = (): JSX.Element => {
    const translate = useTranslate();
    const deviceSize = useDeviceSize();
    return (
        <Col gap={deviceSize === DeviceSize.SMALL ? 1 : 10}>
            <TypographyAdvise color="status.warning" variant="body3Strong" size={deviceSize}>
                {translate("backup_wallet_advise_text_2_title")}
            </TypographyAdvise>
            <TypographyAdvise color="status.warning" variant="body3Regular" size={deviceSize}>
                {translate("backup_wallet_advise_description")}
            </TypographyAdvise>
            <TypographyAdvise color="status.warning" variant="body3Regular" size={deviceSize}>
                {translate("backup_wallet_advise_description_2")}
            </TypographyAdvise>
        </Col>
    );
};

export default WalletsBackupAdviseAlertContent;
