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
        <Col gap={24}>
            <Col gap={24} style={{ minHeight: 290 }}>
                <Advise title={translate("mnemonic")} text={translate("mnemonic_input_text")} />
                <MnemonicList mnemonic={mnemonic} onPress={handleWordPress} />
            </Col>
            <TextField
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                value={word}
                onChange={handleChange}
                onSubmitEditing={handleSubmit}
                placeholder={translate("add_a_word")}
                disabled={mnemonic.length > 11}
            />
        </Col>
    );
};

export default MnemonicInput;
