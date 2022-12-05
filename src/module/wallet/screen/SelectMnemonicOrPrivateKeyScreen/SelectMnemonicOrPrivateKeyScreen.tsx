import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { SelectMnemonicOrPrivateKeyScreenRoot } from "./SelectMnemonicOrPrivateKeyScreen.styles";

export interface SelectMnemonicOrPrivateKeyScreenProps {
    onSubmit: () => void;
}

const SelectMnemonicOrPrivateKeyScreen = ({ onSubmit }: SelectMnemonicOrPrivateKeyScreenProps) => {
    const translate = useTranslate();
    return (
        <SelectMnemonicOrPrivateKeyScreenRoot>
            <Button fullWidth>{translate("import_with_mnemonic")}</Button>
            <Button fullWidth>{translate("import_with_private_key")}</Button>
        </SelectMnemonicOrPrivateKeyScreenRoot>
    );
};

export default SelectMnemonicOrPrivateKeyScreen;
