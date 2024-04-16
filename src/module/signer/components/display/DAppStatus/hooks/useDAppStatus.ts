import { TypographyProps } from "module/common/component/display/Typography/Typography";
import useTranslate from "module/common/hook/useTranslate";

export interface useDAppStatusReturn {
    label: string;
    labelStyles: Omit<TypographyProps, "variant">;
}

export default function useDAppStatus(connected: boolean) {
    const translate = useTranslate();

    const selectedColor = connected ? "green" : "gray.600";

    const label = translate(connected ? "connected" : "notConnected");
    const labelStyles: Omit<TypographyProps, "variant"> = { color: selectedColor };

    return { label, labelStyles };
}
