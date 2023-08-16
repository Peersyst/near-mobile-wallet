import { SignRequestDetailsProps } from "./SignRequestDetails.types";
import { Action } from "./actions/actions.types";
import { ActionDetails } from "./actions/actions";

const SignRequestDetails = ({ request }: SignRequestDetailsProps): JSX.Element => {
    const requests = request.requests;
    const actions = requests[0].actions as Action[];

    /**
     * AddKey: FullAccess & FunctionCall details
     *
     */

    const { type, params } = actions[0];

    const ActionDetailsCard = ActionDetails[type];

    return <ActionDetailsCard params={params} />;
};

export default SignRequestDetails;
