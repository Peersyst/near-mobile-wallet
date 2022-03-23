import { formatHtmlEntities } from "utils/formatHtmlEntities";
import { NewsType } from "../types"

const defaultImageUri = "https://www.nervos.org/wp-content/uploads/2020/12/Group-22.jpg";
const defaultUri = "https://twitter.com/NervosNetwork/";

const formatTitle = (title: string): string => {
    //Clean from empty spaces and replace HTML entities
    let result = formatHtmlEntities(title.replace(/\r?\n|\r/, " "));
    //Remove empty breakline
    const array = result.split("\n");
    result = ""
    for(let i = 0; i < array.length; i++) {
        if(array[i] !== "" ) result += array[i].trim() + "\n";
    }
    return result
}

/**
 * We have to be carefull because sometimes one of the parameters
 * might be missing
 * @param News
 * @returns A useful and clean NewsType
 */
export const useFormatNews = (News: any): NewsType => {
    const title = News.title ? formatTitle(News.title) : "New News from Nervos";
    const date = News.pubDate || new Date();
    const imageUri = News["content"]?.__url || defaultImageUri;
    const uri = News.link || defaultUri;
    return { title, date, imageUri, uri }
}