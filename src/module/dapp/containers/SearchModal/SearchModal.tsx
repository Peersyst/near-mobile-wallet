import { SearchBarModalRoot, SearchBarModalWrapper, SearchModalButton } from "./SearchModal.styles";
import BaseDAppsScreen from "module/dapp/components/layout/BaseDAppsScreen";
import SearchBar from "module/common/component/input/SearchBar/SearchBar";
import { Col, ExposedBackdropProps } from "@peersyst/react-native-components";
import SearchHistory from "../SearchHistory/SearchHistory";
import { useControlled } from "@peersyst/react-hooks";
import useAddSearch from "module/dapp/query/useAddSearch";
import useTranslate from "module/common/hook/useTranslate";

export interface SearchModalProps extends ExposedBackdropProps {
    onSearch: (search: string) => void;
}

const SearchModal = ({ defaultOpen, open: openProp, onClose: onCloseProp, onOpen, onSearch, ...rest }: SearchModalProps): JSX.Element => {
    const [open, setOpen] = useControlled(defaultOpen, openProp, openProp ? onCloseProp : onOpen);
    const { mutate } = useAddSearch();
    const translate = useTranslate();

    async function handleSearch(search: string) {
        const trimmedSearch = search.trim();
        onSearch(trimmedSearch);
        mutate(trimmedSearch);
        setOpen(false);
    }

    return (
        <SearchBarModalRoot open={open} onClose={() => setOpen(false)} onOpen={onOpen} {...rest}>
            <BaseDAppsScreen>
                <Col flex={1} gap={8}>
                    <SearchBarModalWrapper>
                        <SearchBar
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
