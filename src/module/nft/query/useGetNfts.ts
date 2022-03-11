import { useQuery } from "react-query";
import getNfts from "module/nft/mock/getNfts";

export default function (address?: string) {
    return useQuery(["nfts", address], () => (address ? getNfts(address) : []));
}
