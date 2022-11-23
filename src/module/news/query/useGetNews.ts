import { XMLParser } from "fast-xml-parser";
import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { NewsDto } from "../types";

const rrssUriProvider = "http://fetchrss.com/rss/6239aa2ceb62c371b8448ee2635938580dd00758d37f33a2.xml";

const useGetNews = (): QueryResult<NewsDto[]> =>
    useQuery(["news"], async () => {
        const res: Response = await fetch(rrssUriProvider);
        const data = await res.text();
        const options = {
            ignoreDeclaration: true,
            ignoreAttributes: false,
            attributeNamePrefix: "__",
            removeNSPrefix: true,
        };
        const parser = new XMLParser(options);
        return parser.parse(data)["rss"]["channel"]["item"];
    });

export default useGetNews;
