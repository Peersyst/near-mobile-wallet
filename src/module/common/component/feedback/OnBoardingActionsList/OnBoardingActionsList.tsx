import { Col, Typography } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../input/Button/Button";

const OnBoardingActionsList = () => {
    const translate = useTranslate();
    return (
        <Col alignItems="center" gap={16}>
            <Typography variant="body3Strong" numberOfLines={2} textAlign="center" style={{ width: "60%" }}>
                {translate("theresNotTransactionsYetMeanwhileYouCan")}
            </Typography>
            <Button variant="primary" fullWidth>
                {translate("active")}
            </Button>
        </Col>
    );
};

export default OnBoardingActionsList;
