import { IconButton, IconButtonProps, ThemeIcons, ThemePalette, useTheme } from "@peersyst/react-native-components";

export interface StatusIconsProps extends Omit<IconButtonProps, "children"> {
    status: "info" | "warning" | "error" | "success" | "valid" | "invalid";
    statusColor?: keyof ThemePalette["status"];
}

interface StatusIconsUtils {
    icon: keyof ThemeIcons;
    color: keyof ThemePalette["status"];
}

const STATUS_ICONS_CONFIG: Record<StatusIconsProps["status"], StatusIconsUtils> = {
    info: {
        icon: "info",
        color: "info",
    },
    warning: {
        icon: "warning",
        color: "warning",
    },
    error: {
        icon: "error",
        color: "error",
    },
    success: {
        icon: "success",
        color: "success",
    },
    valid: {
        icon: "valid",
        color: "success",
    },
    invalid: {
        icon: "invalid",
        color: "error",
    },
};

const StatusIcon = ({ status: statusProp, statusColor, style, ...rest }: StatusIconsProps) => {
    const {
        icons,
        palette: { status },
    } = useTheme();
    const { icon, color: colorUtil } = STATUS_ICONS_CONFIG[statusProp];
    const Icon = icons[icon];
    const color = status[statusColor ?? colorUtil];
    return (
        <IconButton {...rest} style={{ color, ...style }}>
            <Icon />
        </IconButton>
    );
};

export default StatusIcon;
