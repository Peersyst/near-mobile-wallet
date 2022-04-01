import { Col, Row } from "react-native-components";
import { translate } from "locale";
import AdviseCardGroup from "module/common/component/display/AdviseCardGroup/AdviseCardGroup";
import { useState } from "react";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import Button from "module/common/component/input/Button/Button";
import { AdviseCardProps } from "module/common/component/display/AdviseCard/AdviseCard.types";
import { image } from "asset/image";
import { AdviseImage, AdviseImageCont } from "./WalletAdvisesScreen.styles";
import { useWindowDimensions } from "react-native";

export interface WalletAdvisesScreenProps {
    useTimer?: boolean;
    nextScreenText: string;
    onNextScreen: () => void;
}

const advisesImages = [image.lock, image.notes, image.key];

const WalletAdvisesScreen = ({ onNextScreen, useTimer = true, nextScreenText }: WalletAdvisesScreenProps): JSX.Element => {
    const [index, setIndex] = useState(0);
    const advisesTimer = useTimer ? 5 : 0;

    const advises: Omit<AdviseCardProps, "number">[] = [
        { title: translate("advise1_title"), text: translate("advise1_text"), timer: advisesTimer },
        { title: translate("advise2_title"), text: translate("advise2_text"), timer: advisesTimer },
        {
            title: translate("advise3_title"),
            text: translate("advise3_text"),
            timer: advisesTimer,
        },
    ];
    
    return (
        <Col flex={1} gap={20}>
            <AdviseImageCont>
                <AdviseImage source={advisesImages[index]} />
            </AdviseImageCont>
            <AdviseCardGroup index={index} onIndexChange={setIndex} advises={advises} />
            {!useTimer || index === 2 ? (
                <CountdownButton
                    seconds={advisesTimer}
                    fullWidth
                    variant="outlined"
                    style={{ marginHorizontal: 20 }}
                    onPress={onNextScreen}
                >
                    {nextScreenText}
                </CountdownButton>
            ) : (
                <Button fullWidth variant="outlined" style={{ marginHorizontal: 20 }} disabled>
                    {nextScreenText}
                </Button>
            )}
        </Col>
    );
};

export default WalletAdvisesScreen;
