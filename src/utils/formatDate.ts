import { minDigits } from "@peersyst/react-utils";

export default function (date: Date): string {
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${minDigits(day, 2)}/${minDigits(month, 2)}/${year} - ${minDigits(hours, 2)}:${minDigits(minutes, 2)}`;
}
