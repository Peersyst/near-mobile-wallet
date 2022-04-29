import { translate } from "locale";

function formatTimeDAORemainingCycle(numOfHours: number): string {
    var res = "";
    const totalHours = numOfHours / 60;
    const days = Math.floor(totalHours / 24);
    var hours: number | string = Math.floor(totalHours - days * 24);
    var minutes: number | string = Math.floor(numOfHours - days * 60 * 24 - hours * 60);
    if (days > 0) {
        res += `${days} ${days > 1 ? translate("days") : translate("day")}, `;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    hours = `${hours} ${hours !== 1 ? translate("hours") : translate("hour")}, `;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    minutes = `${minutes} ${minutes !== 1 ? translate("minutes") : translate("minute")}.`;
    return res + hours + minutes;
}

export default formatTimeDAORemainingCycle;
