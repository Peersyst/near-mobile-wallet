import Typography from "module/common/component/display/Typography/Typography";
import { Col } from "@peersyst/react-native-components";
import { EmptyFavouritesDAppsIcon } from "./EmptyFavouritesDApps.styles";
import useTranslate from "module/common/hook/useTranslate";

function EmptyFavouritesDApps() {
    const translate = useTranslate();

    return (
        <Col alignItems="center" gap={12}>
            <EmptyFavouritesDAppsIcon />
            <Col gap={6}>
                <Typography variant="body3Strong" textAlign="center">
                    {translate("emptyFavouritesDAppsTitle")}
                </Typography>
                <Typography variant="body3Light" light textAlign="center">
                    {translate("emptyFavouritesDAppsDescription")}
                </Typography>
            </Col>
        </Col>
    );
}

export default EmptyFavouritesDApps;
