import Typography from "module/common/component/display/Typography/Typography";
import { EmptyHistory, SearchHistoryRoot } from "./SearchHistory.styles";
import useGetSearchHistory from "module/dapp/query/useGetSearchHistory";
import { Col } from "@peersyst/react-native-components";
import SearchHistoryItem from "./SearchHistoryItem/SearchHistoryItem";
import useTranslate from "module/common/hook/useTranslate";

export interface SearchHistoryProps {
    onHistoryClick: (text: string) => void;
}

function SearchHistory({ onHistoryClick, ...rest }: SearchHistoryProps): JSX.Element {
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
                <EmptyHistory title={translate("emptyHistory")} />
            )}
        </SearchHistoryRoot>
    );
}

export default SearchHistory;
