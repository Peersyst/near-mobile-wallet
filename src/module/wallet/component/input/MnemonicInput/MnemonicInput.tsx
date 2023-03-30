import { useState } from "react";
import { Col, useFormNotification } from "@peersyst/react-native-components";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import TextField from "module/common/component/input/TextField/TextField";
import { useTranslate } from "module/common/hook/useTranslate";
import Advise from "module/common/component/display/Advise/Advise";

export const MnemonicInput = (): JSX.Element => {
    const translate = useTranslate();
    const [mnemonic, setMnemonic] = useState<string[]>([]);
    const [word, setWord] = useState("");
    useFormNotification("mnemonic", mnemonic, mnemonic.length === 12);

    const handleSubmit = (value: string): void => {
        if (value.length > 0) {
            const newWords = value.split(" ");
            if (newWords.length + mnemonic.length <= 12) {
                setMnemonic((m) => [...m, ...newWords]);
            } else if (newWords.length === 12) {
                setMnemonic(newWords);
            } //Otherwise, clean input mnemonic length exceeds 12
            setWord("");
        }
    };

    const handleChange = (value: string) => {
        if (value.includes(" ")) {
            handleSubmit(value.trim());
        } else {
            setWord(value);
        }
    };

    const handleWordPress = (word: string) => {
        setMnemonic((oldMnemonic) => oldMnemonic.filter((w) => w !== word));
    };

    return (
        <Col gap={24} flex={1}>
            <Col flex={1} gap={24} style={{ minHeight: 230 }}>
                <Col flex={1}>
                    <Advise title={translate("mnemonic")} text={translate("mnemonic_input_text")} />
                </Col>
                <MnemonicList mnemonic={mnemonic} onPress={handleWordPress} />
            </Col>
            <TextField
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                value={word}
                onChange={handleChange}
                onSubmitEditing={() => handleSubmit(word)}
                placeholder={translate("add_a_word")}
                disabled={mnemonic.length > 11}
            />
        </Col>
    );
};

export default MnemonicInput;
