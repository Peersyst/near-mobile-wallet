import { Col, ScrollView, Typography } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";

const StakingScreen = (): JSX.Element => {
    return (
        <BaseMainScreen>
            <ScrollView>
                <Col style={{ padding: 20, backgroundColor: "#f5f5f5" }} gap={10}>
                    <Typography variant="body1Strong">Variant</Typography>
                    <Button variant="primary">Click me</Button>
                    <Button variant="secondary">Click me</Button>
                    <Button variant="tertiary">Click me</Button>
                    <Button variant="outlined">Click me</Button>
                    <Button variant="text">Click me</Button>
                    <Typography variant="body1Strong">Sizes</Typography>
                    <Button variant="primary" size="sm">
                        Click me
                    </Button>
                    <Button variant="primary" size="md">
                        Click me
                    </Button>
                    <Button variant="primary" size="lg">
                        Click me
                    </Button>
                    <Typography variant="body1Strong">Disabled</Typography>
                    <Button variant="primary" size="sm" disabled>
                        Click me
                    </Button>
                    <Button variant="outlined" size="sm" disabled>
                        Click me
                    </Button>
                </Col>
            </ScrollView>
        </BaseMainScreen>
    );
};

export default StakingScreen;
