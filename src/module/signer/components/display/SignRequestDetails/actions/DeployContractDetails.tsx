import { ActionDetailsProps } from "../SignRequestDetails.types";
import { DeployContractActionParams } from "../actions.types";
import Container from "module/common/component/display/Container/Container";
import { useTranslate } from "module/common/hook/useTranslate";
import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";
import { decode, encode } from "bs58";
import { Hash } from "@peersyst/react-native-components";
import ActionDetailField from "../../ActionDetailField/ActionDetailField";
import { ClipboardListIcon } from "icons";

const DeployContractDetails = ({ params }: ActionDetailsProps): JSX.Element => {
    const { code } = params as DeployContractActionParams;

    const translate = useTranslate();

    return (
        <ActionDetailsScaffold
            header={translate("deployContract")}
            description={translate("deployContractDescription")}
            showPreview
            scrollable
        >
            <Container>
                <ActionDetailField
                    label={translate("smart_contract")}
                    content={<Hash variant="body2Strong" hash={decode(encode(code)).toString("base64")} length={6} />}
                    LeftIcon={ClipboardListIcon}
                />
            </Container>
        </ActionDetailsScaffold>
    );
};

export default DeployContractDetails;
