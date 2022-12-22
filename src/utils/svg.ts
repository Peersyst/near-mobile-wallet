function replaceAll(string: string, search: string, replace: string) {
    return string.split(search).join(replace);
}

export function encodeSvg(svgString: string) {
    const svgReplace = replaceAll(replaceAll(replaceAll(svgString, "%3C", "<"), "%3E", ">"), "%23", "#");
    const svgParseFormat = svgReplace.split("'").join('"');
    return svgParseFormat;
}
