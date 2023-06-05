import { TransakEnviroment, TransakQueryParams } from "../../Transak.types";

const TRANSAK_URLS: Record<TransakEnviroment, string> = {
    STAGING: "https://global-stg.transak.com/",
    PRODUCTION: "https://global.transak.com/",
};

export default function parseQueryParams({ environment, apiKey, ...queryParams }: TransakQueryParams): string {
    const baseUri = TRANSAK_URLS[environment ?? "PRODUCTION"];
    const queryParamsString = Object.entries(queryParams);
    const queryParamsStringified = queryParamsString.map(([key, value]) => `${key}=${value}`).join("&");
    return `${baseUri}?apiKey=${apiKey}&${queryParamsStringified}`;
}
