import { Col, Form } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useTranslate } from "module/common/hook/useTranslate";
import GuidelinesList from "module/common/component/display/GuidelinesList/GuidelinesList";
import { TransaltionResourceType } from "locale";
import { BaseAddWalletModalScreenProps } from "module/wallet/component/core/AddWalletModal/AddWalletModal.types";
import NewAccountNameTextField from "module/wallet/component/input/NewAccountNameTextField/NewAccountNameTextField";
import useGetSuffix from "module/wallet/hook/useGetSuffix";
import { addSuffix } from "module/wallet/component/input/NewAccountNameTextField/util/AccountNameUtils";

interface SetWalletNameForm {
    walletName: string;
}

const ALLOWED_INIDICATIONS: TransaltionResourceType[] = ["allowed_lowercase_chars", "allowed_digits", "allowed_separators_chars"];

const NOT_ALLOWED_INIDICATIONS: TransaltionResourceType[] = ["not_allowed_chars", "near_account_min_chars", "near_account_max_chars"];

const SetAccountNameScreen = ({ onSubmit, submitText }: BaseAddWalletModalScreenProps): JSX.Element => {
    const {
        setName,
        state: { name = "", fundingAccount },
    } = useCreateWallet();
    const translate = useTranslate();
    const suffix = useGetSuffix();

    const handleSubmit = ({ walletName }: SetWalletNameForm) => {
        setName(addSuffix(walletName, suffix));
        onSubmit();
    };

    return (
        <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Col flex={1} gap={30}>
                <Col gap="7%" flex={1}>
                    <NewAccountNameTextField
                        walletIndex={fundingAccount}
                        name="walletName"
                        defaultValue={name}
                        placeholder="mycoolid"
                        label={translate("enter_your_custom_address")}
                        required
                    />
                    <GuidelinesList allowed>{ALLOWED_INIDICATIONS.map((key) => translate(key))}</GuidelinesList>
                    <GuidelinesList allowed={false}>{NOT_ALLOWED_INIDICATIONS.map((key) => translate(key))}</GuidelinesList>
                </Col>
                <Button fullWidth type="submit">
                    {submitText || translate("continue")}
                </Button>
            </Col>
        </Form>
    );
};

export default SetAccountNameScreen;
