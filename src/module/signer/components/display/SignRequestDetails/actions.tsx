import { JSXElementConstructor } from "react";
import AddKeyDetails from "./actions/AddKeyDetails";
import { ActionType } from "./actions.types";
import { ActionDetailsProps } from "./SignRequestDetails.types";
import FunctionCallDetails from "./actions/FunctionCallDetails";

const Empty = () => null;

export const ActionDetails: Record<ActionType, JSXElementConstructor<ActionDetailsProps>> = {
    AddKey: AddKeyDetails,
    FunctionCall: FunctionCallDetails,
    // TODO: Implement other action types
    Transfer: Empty,
    DeployContract: Empty,
    DeleteAccount: Empty,
    DeleteKey: Empty,
    Stake: Empty,
    // TODO: Add CreateAccount action type
};
