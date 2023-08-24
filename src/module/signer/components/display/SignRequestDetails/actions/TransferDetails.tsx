import { ActionDetailsProps } from "../SignRequestDetails.types";
import { useTranslate } from "module/common/hook/useTranslate";
import { TransferActionParams } from "../actions.types";
import Balance from "module/wallet/component/display/Balance/Balance";
import Container from "module/common/component/display/Container/Container";
import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";

const TransferDetails = ({ params, receiverId }: ActionDetailsProps): JSX.Element => {
    const { deposit } = params as TransferActionParams;

    const translate = useTranslate();

    return (
        <ActionDetailsScaffold header={translate("transferAction")} description={translate("transferActionDescription", { receiverId })}>
            <Container>
                <Balance variant="body2Strong" units="token" balance={deposit} textAlign="center" />
            </Container>
        </ActionDetailsScaffold>
    );
};

export default TransferDetails;
