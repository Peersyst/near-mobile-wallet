import { useState } from "react";
import { Col, Typography, useFormNotification } from "react-native-components";
import Card from "module/common/component/surface/Card/Card";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import TextField from "module/common/component/input/TextField/TextField";
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native";
import { translate } from "locale";

export const MnemonicInput = (): JSX.Element => {
    const [mnemonic, setMnemonic] = useState<string[]>([]);
    const [word, setWord] = useState("");
    useFormNotification("mnemonic", mnemonic, mnemonic.length === 12);

    const handleSubmit = ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void => {
        if (text.length > 0) {
            if (!mnemonic.find((w) => w === text)) mnemonic.push(text);
            setWord("");
        }
    };

    const handleWordPress = (word: string) => {
        setMnemonic((oldMnemonic) => oldMnemonic.filter((w) => w !== word));
    };

    return (
        <Col gap={20}>
            <Card style={{ height: 290 }}>
                <Col gap={10}>
                    <Col gap={5}>
                        <Typography variant="h3" fontWeight="bold" textTransform="uppercase" textAlign="center">
                            {translate("mnemonic")}
                        </Typography>
                        <Typography variant="body2">{translate("mnemonic_input_text")}</Typography>
                    </Col>
                    <MnemonicList mnemonic={mnemonic} onPress={handleWordPress} />
                </Col>
            </Card>
            <TextField
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                value={word}
                onChange={setWord}
                onSubmitEditing={handleSubmit}
                placeholder={translate("add_a_word")}
                disabled={mnemonic.length > 11}
                style={{ marginHorizontal: 20 }}
            />
        </Col>
    );
};

export default MnemonicInput;
