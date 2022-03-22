import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import getNews from "../service/getNews";
import { NewType } from "../types";

const useGetNews = (): QueryResult<NewType[]> =>
    useQuery(["news"], (): Promise<NewType[]> =>
        getNews(),
    );


export default useGetNews;