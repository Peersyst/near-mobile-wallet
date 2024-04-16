import useTranslate from "module/common/hook/useTranslate";
import { PermissionFieldProps } from "../../PermissionField/PermissionField.types";

export default function useFunctionCallPermissions() {
    const translate = useTranslate();

    const permissions: PermissionFieldProps[] = [
        {
            label: translate("viewAddressPermission"),
            type: "allowed",
        },
        {
            label: translate("viewBalancePermission"),
            type: "allowed",
        },
        {
            label: translate("callMethodsPermission"),
            type: "allowed",
        },
        {
            label: translate("notTransferTokensPermission"),
            type: "forbidden",
        },
    ];

    return permissions;
}
