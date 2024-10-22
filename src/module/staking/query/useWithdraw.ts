import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { useInvalidateServiceInstanceQueries } from "module/wallet/query/useInvalidateServiceInstanceQueries";
import { useSetRecoilState } from "recoil";
import stakeState from "../state/StakeState";
import { useModal, useSetTab, useToast } from "@peersyst/react-native-components";
import { WithdrawModalScreens } from "../component/core/WithdrawModal/WithdrawModal.types";
import useTranslate from "module/common/hook/useTranslate";
import WithdrawModal from "../component/core/WithdrawModal/WithdrawModal";

export interface UseWithdrawParams {
    validatorId: string;
}

const UseWithdraw = (senderIndex?: number) => {
    const setStateState = useSetRecoilState(stakeState);
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);
    const setTab = useSetTab();
    const { showToast } = useToast();
    const translateError = useTranslate("error");
    const { hideModal } = useModal();

    return useMutation(
        async ({ validatorId }: UseWithdrawParams) => {
            const txHash = await serviceInstance.withdrawAllFromValidator(validatorId.toString());
            setStateState((oldState) => ({ ...oldState, txHash }));
        },
        {
            onSuccess: async () => {
                await invalidateServiceInstanceQueries([
                    Queries.GET_BALANCE,
                    Queries.TOTAL_STAKING_BALANCE,
                    Queries.GET_CURRENT_VALIDATORS,
                ]);
                setTab(WithdrawModalScreens.SUCCESS);
            },
            onError: (e: unknown) => {
                let toastMessage = translateError("somethingWentWrong");
                try {
                    if (e instanceof Error && e.message?.includes("does not have enough balance")) {
                        const neededAmount = e.message.split(" ")?.pop();
                        if (!Number.isNaN(Number(neededAmount))) {
                            toastMessage = translateError("insufficient_balance", { minBalance: neededAmount });
                        }
                    }
                } catch {}

                showToast(toastMessage, { type: "error" });

                setTimeout(() => {
                    hideModal(WithdrawModal.id);
                }, 1000);
            },
        },
    );
};

export default UseWithdraw;
