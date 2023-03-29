import { XMLParser } from "fast-xml-parser";
import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { NewsDto } from "../types";
import { config } from "config";
import Queries from "../../../query/queries";

const useGetNews = (): QueryResult<NewsDto[]> =>
    useQuery([Queries.GET_NEWS], async () => {
        try {
            const res: Response = await fetch(config.newsRSSUrl);
            const data = await res.text();
            const options = {
                ignoreDeclaration: true,
                ignoreAttributes: false,
                attributeNamePrefix: "__",
                removeNSPrefix: true,
            };
            const parser = new XMLParser(options);
            return parser.parse(data)["rss"]["channel"]["item"];
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn("Error fetching news", JSON.stringify(e));
            return [];
        }
    });

export default useGetNews;
