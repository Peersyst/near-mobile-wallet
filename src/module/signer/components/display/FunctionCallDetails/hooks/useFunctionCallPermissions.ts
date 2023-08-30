import { useTranslate } from "module/common/hook/useTranslate";
import { PermissionFieldProps } from "../../PermissionField/PermissionField.types";

export default function useFunctionCallPermissions() {
    const translate = useTranslate();

    const permissions: PermissionFieldProps[] = [
        {
            label: translate("viewAddressPermission"),
            type: "info",
        },
        {
            label: translate("viewBalancePermission"),
            type: "info",
        },
        {
            label: translate("callMethodsPermission"),
            type: "info",
        },
        {
            label: translate("notTransferTokensPermission"),
            type: "forbidden",
        },
    ];

    return permissions;
}
