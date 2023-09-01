export type PermissionFieldType = "allowed" | "critical" | "forbidden";

export interface PermissionFieldProps {
    label: string;
    type: PermissionFieldType;
}
