import { XMLParser } from "fast-xml-parser";
import { QueryResult } from "query-utils";
import { useQuery } from "react-query";

const rrssUriProvider = "https://fetchrss.com/rss/6239aa2ceb62c371b8448ee26239aa120841546894777912.xml";

const useGetNews = (): QueryResult<any[]> =>
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
        const jsonObj = parser.parse(data);
        return jsonObj["rss"]["channel"]["item"];
    });

export default useGetNews;
