import { useMutation } from "react-query";
import sendTransaction from "module/transaction/mock/sendTransaction";

const useSendTransaction = () => {
    return useMutation(sendTransaction);
};

export default useSendTransaction;
