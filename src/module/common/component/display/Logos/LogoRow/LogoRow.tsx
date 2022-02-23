import { Row } from "react-native-components";
import Logotip from "../Logotip/Logotip";
import Isotip from "../Isotip/Isotip";
import { AppearanceProps } from "module/common/types";

const LogoRow = ({ appearance = "dark" }: Partial<AppearanceProps>): JSX.Element => {
    return (
        <Row alignItems={"center"} justifyContent={"center"} style={{alignSelf: "flex-start"}} gap={8}>
            <Isotip size={"sm"} appearance={appearance} />
            <Logotip appearance={appearance} size={"md"} />
        </Row>
    );
};

export default LogoRow;
