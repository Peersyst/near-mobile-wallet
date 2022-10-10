import { minDigits } from "@peersyst/react-utils";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import es from "dayjs/locale/es";
import en from "dayjs/locale/en";

export type DateMode = "date-hours" | "weekday";

export default function (date: Date, mode: DateMode = "date-hours", idiom: string): string {
    if (mode == "date-hours") {
        const day = date.getDate().toString();
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${minDigits(day, 2)}/${minDigits(month, 2)}/${year} - ${minDigits(hours, 2)}:${minDigits(minutes, 2)}`;
    } else {
        dayjs.locale(idiom === "es" ? es : en);
        dayjs.extend(localeData);
        return dayjs(date).format("ddd DD MMM, YYYY");
    }
}
