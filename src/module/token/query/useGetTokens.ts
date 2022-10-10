import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { Token } from "module/sdk/mock.types";

const useGetTokens = (index?: number): QueryResult<Token[]> => {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    return useQuery(["tokens", usedIndex, network], (): Token[] => {
        return [
            {
                metadata: {
                    name: "Bitcoin",
                    symbol: "BTC",
                    decimals: 8,
                    imageUri:
                        "https://s3-alpha-sig.figma.com/img/32d6/c448/29fed82fec1d9892f7ee8191c7283e41?Expires=1665964800&Signature=UpMwOiI1dE6o2pIE6PrgeoxV0N6i41c2gE4XyM7hPVJtrsF-4qTCuIew6FywlEZtVjmkEAlkO0QH2S5GRe-aX8zhgwbJZcVxd2Je8DngIQCORc0yW3HH~SEM8ze59uNK40MmYhg78cG209ZCWlb~Jg~5TA8TGhcnvu~vsCWzQMk1fz1G799X9gKKDClSCIVtkgyaedhE9ja5ev3WvL0i91a~RHB~j00Ts79ijxmIO-qXd1zS9IsnzzH6-bJXvPzB7O4AJngWk6dwncJ3KubuJQvB27VK~R4kGM5xHqaxXl76g3SNA5qV~dbuPW6zLkd4qHQzqAtE2uDvPfMj8zrCVQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                },
                balance: BigInt(100),
            },
        ];
    });
};

export default useGetTokens;
