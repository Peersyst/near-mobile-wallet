import { ActivityIndicator } from "react-native";
import { Col } from "react-native-components";

export const Loader = (): JSX.Element => {
    return (
        <Col justifyContent="center" style={{ height: 250 }}>
            <ActivityIndicator color="black" size="large" />
        </Col>
    );
};
