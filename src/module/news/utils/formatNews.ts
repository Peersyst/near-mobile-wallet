import { config } from "refactor/common/config";
import { formatHtmlEntities } from "utils/formatHtmlEntities";
import { NewsDto, NewsType } from "../types";

const formatTitle = (title: string): string => {
    //Clean from empty spaces and replace HTML entities
    let result = formatHtmlEntities(title.replace(/\r?\n|\r/, " "));
    //Remove empty breakline
    const array = result.split("\n");
    result = "";
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== "") result += array[i].trim() + "\n";
    }
    return result;
};

/**
 * We have to be carefull because sometimes one of the parameters
 * might be missing
 * @param News
 * @returns A useful and clean NewsType
 */
export const formatNews = (News: NewsDto): NewsType => {
    const title = News.title ? formatTitle(News.title) : "New News from NEAR";
    const date = News.pubDate || new Date().toString();
    const imageUri = News["content"]?.__url || "";
    const uri = News.link || config.defaultTwitterAccount;
    return { title, date, imageUri, uri };
};
