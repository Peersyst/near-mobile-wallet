import { Row } from "react-native-components";
import Logotip from "../Logotip/Logotip";
import Isotip from "../Isotip/Isotip";

const LogoRow = (): JSX.Element => {
    return (
        <Row alignItems={"center"} justifyContent={"center"} gap={8}>
            <Isotip size={"xs"} animation={false} />
            <Logotip size={"md"} />
        </Row>
    );
};

export default LogoRow;
