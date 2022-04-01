import { useMutation } from "react-query";
import sendDeposit from "../mock/sendDeposit";

const useSendDepositToDao = () => {
    return useMutation(sendDeposit);
};

export default useSendDepositToDao;
