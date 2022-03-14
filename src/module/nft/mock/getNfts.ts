import { Nft } from "module/nft/types";
import { nfts } from "module/nft/mock/nft";

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNfts = (address: string): Promise<Nft[]> => new Promise((resolve) => setTimeout(() => resolve(nfts), 2000));

export default getNfts;
