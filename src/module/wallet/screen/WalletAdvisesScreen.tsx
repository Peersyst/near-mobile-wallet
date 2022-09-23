import { Col } from "@peersyst/react-native-components";
import { useEffect, useState } from "react";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import AdviseGroup from "module/common/component/display/AdviseGroup/AdviseGroup";
import { AdviseProps } from "module/common/component/display/Advise/Advise";

export interface WalletAdvisesScreenProps {
    ensureReading?: boolean;
    nextScreenText: string;
    onNextScreen: () => void;
}

const WalletAdvisesScreen = ({ onNextScreen, ensureReading = true, nextScreenText }: WalletAdvisesScreenProps): JSX.Element => {
    const [index, setIndex] = useState(0);
    const [hasVisitedLastAdvise, setHasVisitedLastAdvise] = useState(false);
    const translate = useTranslate();

    const advises: Omit<AdviseProps, "number">[] = [
        { title: translate("advise1_title"), text: translate("advise1_text") },
        { title: translate("advise2_title"), text: translate("advise2_text") },
        { title: translate("advise3_title"), text: translate("advise3_text") },
    ];

    useEffect(() => {
        if (index === advises.length - 1) setHasVisitedLastAdvise(true);
    }, [index]);

    return (
        <Col flex={1} gap={24}>
            <AdviseGroup index={index} onIndexChange={setIndex} advises={advises} />
            <Button disabled={ensureReading && !hasVisitedLastAdvise} fullWidth onPress={onNextScreen}>
                {nextScreenText}
            </Button>
        </Col>
    );
};

export default WalletAdvisesScreen;
