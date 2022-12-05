import { Col } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import useCreateWallet from "module/wallet/hook/useCreateWallet";

export interface SelectMnemonicOrPrivateKeyScreenProps {
    onSubmit: () => void;
}

const SelectMnemonicOrPrivateKeyScreen = ({ onSubmit }: SelectMnemonicOrPrivateKeyScreenProps) => {
    const translate = useTranslate();
    const { setImportWithPrivateKey } = useCreateWallet();
    const handlePress = (type: "mnemonic" | "privateKey") => {
        setImportWithPrivateKey(type === "privateKey");
        onSubmit();
    };
    return (
        <Col gap="5%">
            <Button fullWidth onPress={() => handlePress("mnemonic")}>
                {translate("import_with_mnemonic")}
            </Button>
            <Button fullWidth onPress={() => handlePress("privateKey")}>
                {translate("import_with_private_key")}
            </Button>
        </Col>
    );
};

export default SelectMnemonicOrPrivateKeyScreen;
