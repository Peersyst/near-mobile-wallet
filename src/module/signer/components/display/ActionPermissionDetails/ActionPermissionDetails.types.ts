import { FunctionCallPermission } from "../SignRequestDetails/actions.types";

export interface ActionPermissionDetailsProps {
    permission: "FullAccess" | FunctionCallPermission;
}
