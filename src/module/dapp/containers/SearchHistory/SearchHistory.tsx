import Typography from "module/common/component/display/Typography/Typography";
import { SearchHistoryRoot } from "./SearchHistory.styles";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useGetSearchHistory from "module/dapp/query/useGetSearchHistory";
import { Col } from "@peersyst/react-native-components";
import SearchHistoryItem from "./SearchHistoryItem/SearchHistoryItem";
import useTranslate from "module/common/hook/useTranslate";

export interface SearchHistoryProps {
    children?: React.ReactNode;
    onHistoryClick: (text: string) => void;
}

function SearchHistory({ children, onHistoryClick, ...rest }: SearchHistoryProps) {
    const translate = useTranslate();
    const { data: history = [] } = useGetSearchHistory();

    return (
        <SearchHistoryRoot {...rest}>
            <Typography variant="body2Strong">{translate("history")}</Typography>
            {history?.length > 0 ? (
                <Col gap={2}>
                    {history.map((item, index) => (
                        <SearchHistoryItem key={index} history={item} onHistoryClick={onHistoryClick} />
                    ))}
                </Col>
            ) : (
                <EmptyListComponent title={translate("emptyHistory")} style={{ paddingVertical: 20 }} />
            )}
        </SearchHistoryRoot>
    );
}

export default SearchHistory;
