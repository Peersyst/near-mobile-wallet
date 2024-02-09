import { ActionPermissionDetailsProps } from "./ActionPermissionDetails.types";
import FunctionCallPermissions from "../FunctionCallPermissions/FunctionCallPermissions";
import PermissionField from "../PermissionField/PermissionField";
import useTranslate from "module/common/hook/useTranslate";

const ActionPermissionDetails = ({ permission }: ActionPermissionDetailsProps) => {
    const translate = useTranslate();
    const isFullAccess = permission === "FullAccess";

    return isFullAccess ? (
        <PermissionField type="critical" label={translate("addFullAccessKeyDescription")} />
    ) : (
        <FunctionCallPermissions permission={permission} />
    );
};

export default ActionPermissionDetails;
