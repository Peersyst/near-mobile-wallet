import useServiceInstance from "module/wallet/hook/useServiceInstance";

export default function useIsChildAccountValid(walletIndex?: number) {
    const { serviceInstance } = useServiceInstance(walletIndex);
    function isChildAccountValid(name: string) {
        return serviceInstance?.nameIsValidSubAccount(name);
    }
    return isChildAccountValid;
}
