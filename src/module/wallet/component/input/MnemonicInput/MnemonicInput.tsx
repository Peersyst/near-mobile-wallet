import { useState } from "react";
import { Col, Typography, useFormNotification } from "@peersyst/react-native-components";
import Card from "module/common/component/surface/Card/Card";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import TextField from "module/common/component/input/TextField/TextField";
import { useTranslate } from "module/common/hook/useTranslate";

export const MnemonicInput = (): JSX.Element => {
    const translate = useTranslate();
    const [mnemonic, setMnemonic] = useState<string[]>([]);
    const [word, setWord] = useState("");
    useFormNotification("mnemonic", mnemonic, mnemonic.length === 12);

    const handleSubmit = (): void => {
        if (word.length > 0) {
            setMnemonic((m) => [...m, word]);
            setWord("");
        }
    };

    const handleChange = (value: string) => {
        if (value.includes(" ")) {
            handleSubmit();
        } else {
            setWord(value);
        }
    };

    const handleWordPress = (word: string) => {
        setMnemonic((oldMnemonic) => oldMnemonic.filter((w) => w !== word));
    };

    return (
        <Col gap={20}>
            <Card style={{ minHeight: 290 }}>
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
                onChange={handleChange}
                onSubmitEditing={handleSubmit}
                placeholder={translate("add_a_word")}
                disabled={mnemonic.length > 11}
                style={{ marginHorizontal: 20 }}
            />
        </Col>
    );
};

export default MnemonicInput;
