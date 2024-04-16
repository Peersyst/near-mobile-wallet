import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useTranslate from "module/common/hook/useTranslate";

const EmptyNftList = () => {
    const translate = useTranslate();
    const translateError = useTranslate("error");

    return <EmptyListComponent title={translateError("no_nfts")} text={translate("start_receiving_nfts")} />;
};

export default EmptyNftList;
