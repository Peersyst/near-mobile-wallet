import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";
import { ActionDetailsProps } from "../SignRequestDetails.types";
import { StakeActionParams } from "../actions.types";
import { useTranslate } from "module/common/hook/useTranslate";
import Container from "module/common/component/display/Container/Container";
import Balance from "module/wallet/component/display/Balance/Balance";
import ActionDetailField from "../../ActionDetailField/ActionDetailField";
import { NearIcon } from "icons";

const StakeDetails = ({ params }: ActionDetailsProps): JSX.Element => {
    const { stake } = params as StakeActionParams;
    const translate = useTranslate();

    return (
        <ActionDetailsScaffold header={translate("stakeAction")} description={translate("stakeActionDescription")} scrollable>
            <Container>
                <ActionDetailField
                    label={translate("deposit")}
                    content={<Balance variant="body2Strong" balance={stake} units="token" />}
                    LeftIcon={NearIcon}
                />
            </Container>
        </ActionDetailsScaffold>
    );
};

export default StakeDetails;
