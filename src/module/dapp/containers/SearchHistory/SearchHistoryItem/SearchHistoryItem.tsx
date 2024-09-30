import Typography from "module/common/component/display/Typography/Typography";
import { SearchHistoryItemIcon, SearchHistoryItemRoot } from "./SearchHistoryItem.styles";
import Button from "module/common/component/input/Button/Button";

export interface SearchHistoryItemProps {
    history: string;
    onHistoryClick: (text: string) => void;
}

function SearchHistoryItem({ history, onHistoryClick }: SearchHistoryItemProps) {
    return (
        <Button onPress={() => onHistoryClick(history)} variant="text" size="lg" style={{ lg: { paddingHorizontal: 0 } }}>
            <SearchHistoryItemRoot>
                <SearchHistoryItemIcon />
                <Typography variant="body3Light" light>
                    {history}
                </Typography>
            </SearchHistoryItemRoot>
        </Button>
    );
}

export default SearchHistoryItem;
