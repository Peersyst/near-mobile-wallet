/**
 * Replace some useful/common html entities to normal symbols
 * If the function needs improvement check: https://dev.w3.org/html5/html-author/charref
 * @param string
 * @returns The same string but without the HTML entities replaced by normal symbols
 */
export function formatHtmlEntities(string: string): string {
    return string
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&excl;/g, "!")
        .replace(/&num;/g, "#")
        .replace(/&percnt;/g, "%")
        .replace(/&commat;/g, "@")
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&quot;/g, '"')
        .replace(/&cent;/g, "¢")
        .replace(/&dollar;/g, "$")
        .replace(/&euro;/g, "€")
        .replace(/&pound;/g, "£")
        .replace(/&yen;/g, "¥")
        .replace(/&copy;/g, "©")
        .replace(/&reg;/g, "®");
}
