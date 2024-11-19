import { SearchBarModalRoot, SearchBarModalWrapper, SearchModalButton } from "./SearchModal.styles";
import BaseDAppsScreen from "module/dapp/components/layout/BaseDAppsScreen";
import SearchBar from "module/common/component/input/SearchBar/SearchBar";
import { Col, ExposedBackdropProps } from "@peersyst/react-native-components";
import SearchHistory from "../SearchHistory/SearchHistory";
import { useControlled } from "@peersyst/react-hooks";
import useAddSearchToHistory from "module/dapp/query/useAddSearchToHistory";
import useTranslate from "module/common/hook/useTranslate";

export interface SearchModalProps extends ExposedBackdropProps {
    onSearch: (search: string) => void;
    defaultUrl?: string;
}

const SearchModal = ({
    defaultOpen,
    open: openProp,
    onClose: onCloseProp,
    onOpen,
    onSearch,
    defaultUrl,
    ...rest
}: SearchModalProps): JSX.Element => {
    const [open, setOpen] = useControlled(defaultOpen, openProp, openProp ? onCloseProp : onOpen);
    const { mutate: addSearch } = useAddSearchToHistory();
    const translate = useTranslate();

    async function handleSearch(search: string) {
        const trimmedSearch = search.trim();
        if (trimmedSearch !== "") {
            onSearch(trimmedSearch);
            addSearch(trimmedSearch);
        }
        setOpen(false);
    }

    return (
        <SearchBarModalRoot open={open} onClose={() => setOpen(false)} onOpen={onOpen} {...rest}>
            <BaseDAppsScreen>
                <Col flex={1} gap={8}>
                    <SearchBarModalWrapper>
                        <SearchBar
                            defaultValue={defaultUrl}
                            autoFocus
                            onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
                            style={{ flex: 1 }}
                            placeholder={translate("search")}
                        />
                        <SearchModalButton onPress={() => setOpen(false)}>{translate("close")}</SearchModalButton>
                    </SearchBarModalWrapper>
                    <SearchHistory onHistoryClick={handleSearch} />
                </Col>
            </BaseDAppsScreen>
        </SearchBarModalRoot>
    );
};

export default SearchModal;
