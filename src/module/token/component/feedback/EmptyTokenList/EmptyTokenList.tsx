import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useTranslate from "module/common/hook/useTranslate";

const EmptyTokenList = () => {
    const translate = useTranslate();
    const translateError = useTranslate("error");

    return <EmptyListComponent title={translateError("no_tokens")} text={translate("start_receiving_tokens")} />;
};

export default EmptyTokenList;
