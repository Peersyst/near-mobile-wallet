import Typography from "module/common/component/display/Typography/Typography";
import { Col } from "@peersyst/react-native-components";
import { EmptyFavouritesDAppsIcon } from "./EmptyFavouritesDApps.styles";

function EmptyFavouritesDApps() {
    return (
        <Col alignItems="center" gap={12}>
            <EmptyFavouritesDAppsIcon size={44} />
            <Col gap={2}>
                <Typography variant="body3Strong" textAlign="center">
                    You don’t have any favorites yet
                </Typography>
                <Typography variant="body3Light" light textAlign="center">
                    Add new dApps to your favorites by visiting their website and clicking on the star icon. You can also take a look at our
                    selection of top dApps
                </Typography>
            </Col>
        </Col>
    );
}

export default EmptyFavouritesDApps;
