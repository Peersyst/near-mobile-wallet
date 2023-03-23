import { AddText, ContentRoot } from "./AddWalletCard.style";
import { useTranslate } from "module/common/hook/useTranslate";
import { Row, useModal } from "@peersyst/react-native-components";
import { capitalize } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import ImportWalletModal from "../../core/ImportWalletModal/ImportWalletModal";
import CreateWalletModal from "../../core/CreateWalletModal/CreateWalletModal";
import useWalletState from "module/wallet/hook/useWalletState";

const AddWalletCard = (): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const {
        state: { wallets },
    } = useWalletState();
    return (
        <ContentRoot>
            <AddText variant="h4Regular">{translate("create_your_account")}</AddText>
            <Row gap={8}>
                <Button style={{ width: 132 }} variant="secondary" size="md" onPress={() => showModal(ImportWalletModal)}>
                    {capitalize(translate("import"))}
                </Button>
                {wallets.length > 0 && (
                    <Button style={{ width: 132 }} variant="secondary" size="md" onPress={() => showModal(CreateWalletModal)}>
                        {capitalize(translate("create"))}
                    </Button>
                )}
            </Row>
        </ContentRoot>
    );
};

export default AddWalletCard;
