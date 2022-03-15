import { useQuery } from "react-query";
import getNfts from "module/nft/mock/getNfts";

export default function (address?: string): any {
    return useQuery(["nfts", address], () => (address ? getNfts(address) : new Promise((resolve) => setTimeout(() => resolve([]), 500))));
}
