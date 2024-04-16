import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useTranslate from "module/common/hook/useTranslate";

const EmptyNewsList = () => {
    const translateError = useTranslate("error");
    return <EmptyListComponent title={translateError("no_news_now")} text={translateError("no_news_text")} />;
};

export default EmptyNewsList;
