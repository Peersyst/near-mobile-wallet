import ActionsSlider from "../ActionsSlider/ActionsSlider";
import { SignRequestDetailsProps } from "./SignRequestDetails.types";
import { Action } from "./actions.types";

const SignRequestDetails = ({ request }: SignRequestDetailsProps): JSX.Element => {
    const requests = request.requests;

    const allActions = requests.map((request) => request.actions as Action[]).flat();

    return (
        <ActionsSlider
            actions={allActions}
            receiverId={requests[0].receiverId}
            signerId={requests[0].signerId}
            metadata={request.dAppMetadata}
        />
    );
};

export default SignRequestDetails;
