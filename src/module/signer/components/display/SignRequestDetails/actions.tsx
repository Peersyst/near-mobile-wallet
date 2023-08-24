import { JSXElementConstructor } from "react";
import AddKeyDetails from "./actions/AddKeyDetails";
import { ActionType } from "./actions.types";
import { ActionDetailsProps } from "./SignRequestDetails.types";
import FunctionCallDetails from "./actions/FunctionCallDetails";
import TransferDetails from "./actions/TransferDetails";
import DeleteKeyDetails from "./actions/DeleteKeyDetails";

const Empty = () => null;

export const ActionDetails: Record<ActionType, JSXElementConstructor<ActionDetailsProps>> = {
    AddKey: AddKeyDetails,
    FunctionCall: FunctionCallDetails,
    Transfer: TransferDetails,
    DeleteKey: DeleteKeyDetails,
    // TODO: Implement other action types
    DeployContract: Empty,
    DeleteAccount: Empty,
    Stake: Empty,
    // TODO: Add CreateAccount action type
};
