import Typography from "module/common/component/display/Typography/Typography";
import { SearchHistoryItemIcon, SearchHistoryItemCont, SearchHistoryItemRoot } from "./SearchHistoryItem.styles";

export interface SearchHistoryItemProps {
    history: string;
    onHistoryClick: (text: string) => void;
}

function SearchHistoryItem({ history, onHistoryClick }: SearchHistoryItemProps): JSX.Element {
    return (
        <SearchHistoryItemRoot onPress={() => onHistoryClick(history)} variant="text" size="lg">
            <SearchHistoryItemCont>
                <SearchHistoryItemIcon />
                <Typography variant="body3Light" light>
                    {history}
                </Typography>
            </SearchHistoryItemCont>
        </SearchHistoryItemRoot>
    );
}

export default SearchHistoryItem;
