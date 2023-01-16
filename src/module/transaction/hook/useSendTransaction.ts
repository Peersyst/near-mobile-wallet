import { Asset } from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelect.types";
import { AssetType } from "module/wallet/wallet.types";
import { UseMutationStatusResult } from "../component/feedback/SendTransactionModal/SendTransactionModal.types";
import useSendFT from "../query/useSendFT";
import useSendNEAR from "../query/useSendNEAR";
import useSendNFT from "../query/useSendNFT";
import { SendState } from "../state/SendState";

export interface UseSendTransactionParams {
    senderWalletIndex: number;
    asset: Asset;
    amount: string;
    receiverId: string;
}

export interface UseSendTransactionReturn extends UseMutationStatusResult {
    sendTransaction: () => void | Promise<unknown>;
}

export function useSendTransaction({ senderWalletIndex = 0, asset, amount = "0", receiverAddress }: SendState): UseSendTransactionReturn {
    const sendNearMutationResult = useSendNEAR(senderWalletIndex);
    const sendFTMutationResult = useSendFT(senderWalletIndex);
    const sendNFTsMutationResult = useSendNFT(senderWalletIndex);

    switch (asset.type) {
        case AssetType.FT: {
            const { mutateAsync: sendFT, isError, isLoading, isSuccess } = sendFTMutationResult;
            const sendTransaction = () =>
                sendFT({
                    contractId: asset.ft?.contractId ?? "",
                    amount,
                    receiverId: receiverAddress!,
                    decimals: asset.ft?.metadata.decimals ?? "18",
                });
            return {
                sendTransaction,
                isError,
                isLoading,
                isSuccess,
            };
        }
        case AssetType.NFT: {
            const { mutateAsync: sendNFT, isError, isLoading, isSuccess } = sendNFTsMutationResult;
            const sendTransaction = () =>
                sendNFT({ tokenId: asset.nft?.token_id ?? "", contractId: asset.nft?.contractId ?? "", receiverId: receiverAddress! });
            return {
                sendTransaction,
                isError,
                isLoading,
                isSuccess,
            };
        }
        default: {
            const { mutateAsync: sendMoney, isError, isLoading, isSuccess } = sendNearMutationResult;
            const sendTransaction = () => sendMoney({ to: receiverAddress!, amount });
            return {
                sendTransaction,
                isError,
                isLoading,
                isSuccess,
            };
        }
    }
}
