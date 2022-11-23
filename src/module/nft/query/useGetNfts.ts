import { useQuery, UseQueryResult } from "react-query";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { Nft } from "module/sdk/mock.types";

export default function (index?: number): UseQueryResult<Nft[]> {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    return useQuery(["nfts", usedIndex, network], (): Nft[] => {
        return [
            {
                token_id: "0",
                owner_id: "doctorparra.near",
                contract_id: "nuer.near",
                events: [
                    {
                        type: "nft_transfer",
                        price: 200000.23423,
                        receiver_id: "doctorparra.near",
                        sender_id: "nuer.near",
                    },
                ],
                metadata: {
                    title: "NEAR CAMEL 21 #19",
                    description: "INDIAN CAMEL",
                    media: "https://ipfs.fleek.co/ipfs/bafybeiffkdczuvd6neggcggg63xd2ptdartq2rkzufob55qfkrrrby3kky",
                    media_hash: null,
                    copies: 1,
                    issued_at: null,
                    expires_at: null,
                    starts_at: null,
                    updated_at: null,
                    extra: null,
                    reference: null,
                    reference_hash: null,
                },
                approved_account_ids: [],
            },
        ];
    });
}
