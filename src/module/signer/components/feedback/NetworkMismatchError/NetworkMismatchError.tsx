import Error from "module/common/component/display/Error/Error";
import { useTranslate } from "module/common/hook/useTranslate";

const NetworkMismatchError = (): JSX.Element => {
    const translateError = useTranslate("error");

    return <Error title={translateError("networkMismatch")} description={translateError("networkMismatchDescription")} />;
};

export default NetworkMismatchError;
