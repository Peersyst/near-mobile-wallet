export default function (date: Date): string {
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear();
    return `${(day.length < 2 ? "0" : "") + day}/${(month.length < 2 ? "0" : "") + month}/${year}`;
}
