import { translate } from "./translate";

const formatDate = (
    date?: Date | string | number,
    options: Intl.DateTimeFormatOptions = { weekday: "short", day: "2-digit", month: "short", year: "numeric" },
) =>
    translate("date", {
        val: date ? new Date(date) : Date.now(),
        ...options,
    });

export default formatDate;
