import useServiceInstance from "module/wallet/hook/useServiceInstance";
import ActionsSlider from "../ActionsSlider/ActionsSlider";
import { SignRequestDetailsProps } from "./SignRequestDetails.types";
import { Action } from "./actions.types";
import Error from "module/common/component/display/Error/Error";

const SignRequestDetails = ({ request }: SignRequestDetailsProps): JSX.Element => {
    const requests = request.requests;

    const actions = requests[0].actions as Action[];

    const { serviceInstance } = useServiceInstance();

    const address = serviceInstance?.getAddress();

    const isInvalidSigner = requests[0].signerId && requests[0].signerId !== address;

    return isInvalidSigner ? (
        <Error title="Invalid signer" description="The signer is not valid for this request" />
    ) : (
        <ActionsSlider
            actions={actions}
            receiverId={requests[0].receiverId}
            signerId={requests[0].signerId}
            metadata={request.dAppMetadata}
        />
    );
};

export default SignRequestDetails;
