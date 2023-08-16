import { JSXElementConstructor } from "react";
import AddKeyDetails from "./actions/AddKeyDetails";
import { ActionType } from "./actions.types";
import { ActionDetailsProps } from "./SignRequestDetails.types";

const Empty = () => null;

export const ActionDetails: Record<ActionType, JSXElementConstructor<ActionDetailsProps>> = {
    AddKey: AddKeyDetails,
    // TODO: Implement other action types
    DeployContract: Empty,
    FunctionCall: Empty,
    Transfer: Empty,
    DeleteAccount: Empty,
    DeleteKey: Empty,
    Stake: Empty,
    // TODO: Add CreateAccount action type
};
