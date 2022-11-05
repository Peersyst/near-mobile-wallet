import useSelectedWallet from "module/wallet/hook/useSelectedWallet";

/* eslint-disable */
const useCkbSync = (index?: number) => {
    const { synchronizing = false } = useSelectedWallet() || {};
    const synchronize = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    return {
        synchronizing,
        synchronize,
    };
};

export default useCkbSync;
