import { JSXElementConstructor } from "react";
import AddKeyDetails from "./actions/AddKeyDetails";
import { ActionType } from "./actions.types";
import { ActionDetailsProps } from "./SignRequestDetails.types";
import FunctionCallDetails from "./actions/FunctionCallDetails";
import StakeDetails from "./actions/StakeDetails";

const Empty = () => null;

export const ActionDetails: Record<ActionType, JSXElementConstructor<ActionDetailsProps>> = {
    AddKey: AddKeyDetails,
    FunctionCall: FunctionCallDetails,
    Stake: StakeDetails,
    // TODO: Implement other action types
    Transfer: Empty,
    DeployContract: Empty,
    DeleteAccount: Empty,
    DeleteKey: Empty,
    // TODO: Add CreateAccount action type
};
