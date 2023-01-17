import useGetBalance from "module/wallet/query/useGetBalance";
import NEARAmountWithMaxTextField, { BaseNEARAmountWithMaxTextFieldProps } from "../NEARAmountWithMaxTextField/NEARAmountWithMaxTextField";

const NEARMaxAmountAvailableTextField = (props: BaseNEARAmountWithMaxTextFieldProps) => {
    const { data: { available } = { available: "0" } } = useGetBalance();
    return <NEARAmountWithMaxTextField available={available} {...props} />;
};

export default NEARMaxAmountAvailableTextField;
