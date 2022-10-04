import { Col } from "@peersyst/react-native-components";
import { empty_folder } from "images";
import { EmptyListComponentImage } from "./EmptyListComponent.styles";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "../Typography/Typography";

const EmptyListComponent = (): JSX.Element => {
    const translate = useTranslate("error");
    return (
        <Col alignItems="center" style={{ marginTop: "10%" }}>
            <Typography variant="body1Strong" fontWeight="bold" textTransform="uppercase">
                {translate("nothing_to_show")}
            </Typography>
            <EmptyListComponentImage source={empty_folder} accessibilityRole="image" />
        </Col>
    );
};

export default EmptyListComponent;
