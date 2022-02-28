import { Row } from "react-native-components";
import Logotip from "../Logotip/Logotip";
import Isotip from "../Isotip/Isotip";

const LogoRow = (): JSX.Element => {
    return (
        <Row alignItems={"center"} justifyContent={"center"} gap={8}>
            <Isotip size={"sm"} />
            <Logotip size={"md"} />
        </Row>
    );
};

export default LogoRow;
