import { useEffect, useMemo, useState } from "react";
import { Col } from "@peersyst/react-native-components";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";

export interface MnemonicPickerProps {
    mnemonic: string[];
    onSuccess: () => unknown;
    onError?: () => unknown;
}

const MnemonicPicker = ({ mnemonic: mnemonicProp, onSuccess, onError }: MnemonicPickerProps): JSX.Element => {
    const randomizedMnemonic = useMemo(() => {
        const mnemonicPropCopy = [...mnemonicProp];
        mnemonicPropCopy.sort((a, b) => (a > b ? 1 : -1));
        return mnemonicPropCopy;
    }, [mnemonicProp]);
    const [mnemonic, setMnemonic] = useState<string[]>([]);

    useEffect(() => {
        if (mnemonic.length === mnemonicProp.length) {
            if (mnemonic.every((word, i) => word === mnemonicProp[i])) {
                onSuccess();
            } else {
                onError?.();
                setMnemonic([]);
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mnemonic, mnemonicProp]);

    return (
        <Col gap={60}>
            <MnemonicList
                mnemonic={mnemonic}
                appearance="dark"
                onPress={(word) => setMnemonic((oldMnemonic) => oldMnemonic.filter((w) => w !== word))}
            />
            <MnemonicList
                mnemonic={randomizedMnemonic.filter((w) => !mnemonic.includes(w))}
                onPress={(word) => setMnemonic((oldMnemonic) => [...oldMnemonic, word])}
            />
        </Col>
    );
};

export default MnemonicPicker;
