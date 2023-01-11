import { useTranslate } from "module/common/hook/useTranslate";

export default function GetTitleStep(index: number): string {
    const translate = useTranslate();
    let title = "";
    switch (index) {
        case 0:
            title = translate("stake_your_near");
            break;
        case 1:
            title = translate("select_validator");
            break;
        case 2:
            title = translate("confirm_validator");
            break;
        case 3:
            title = translate("success");
            break;
        default:
            break;
    }
    return title;
}
