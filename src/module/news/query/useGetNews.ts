import { XMLParser } from "fast-xml-parser";
import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { NewsType } from "../types";


const News: NewsType[] = [...Array(5)].map((_, i) => ({
    imageUri: "https://pbs.twimg.com/media/FOa1vmzUcAApUYM.jpg",
    title: "In this week’s #NervosTrailBlazer update👇 1/ @Nervos18 ✍Updates &amp; localization of news https://t.co/2Hn2X5ekc0 https://t....",
    date: "Mon, 21 Mar 2022 23:16:55 +0000",
    uri: "https://twitter.com/NervosNetwork/status/1505710783719567362",
}));

const useGetNews = (): QueryResult<[]> =>
    useQuery(
        ["news"],
        async () => {
            const res: Response = await fetch("http://fetchrss.com/rss/6239aa2ceb62c371b8448ee26239aa120841546894777912.xml");
            const data = await res.text();
            const options = {
                ignoreDeclaration: true,
                ignoreAttributes: false,
                attributeNamePrefix: "__",
                removeNSPrefix: true,
            }
            const parser = new XMLParser(options);
            let jsonObj = parser.parse(data);
            return jsonObj["rss"]["channel"]["item"];
        },
    );

export default useGetNews;