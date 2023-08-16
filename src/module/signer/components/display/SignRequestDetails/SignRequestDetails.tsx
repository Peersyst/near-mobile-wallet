import ActionsSlider from "../ActionsSlider/ActionsSlider";
import { SignRequestDetailsProps } from "./SignRequestDetails.types";
import { Action } from "./actions.types";

const SignRequestDetails = ({ request }: SignRequestDetailsProps): JSX.Element => {
    const requests = request.requests;
    const actions = requests[0].actions as Action[];

    return <ActionsSlider actions={actions} />;
};

export default SignRequestDetails;
