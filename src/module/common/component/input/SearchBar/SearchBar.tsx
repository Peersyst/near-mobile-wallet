import { Spinner } from "@peersyst/react-native-components";
import { SearchBarProps } from "./SearchBar.types";
import { useDebounce } from "@peersyst/react-hooks";
import { useTranslate } from "module/common/hook/useTranslate";
import { SearchBarIcon, SearchBarRoot, SearchBarSuffix } from "./SearchBar.styles";

const SearchBar = ({
    loading = false,
    showLoading = true,
    onChange: onSearch,
    defaultValue = "",
    placeholder,
    ...rest
}: SearchBarProps): JSX.Element => {
    const translate = useTranslate();

    const { value, handleChange, debouncing } = useDebounce(defaultValue, { callback: onSearch });
    const isLoading = showLoading && (loading || debouncing);

    return (
        <SearchBarRoot
            value={value}
            onChange={handleChange}
            suffix={<SearchBarSuffix>{isLoading ? <Spinner /> : <SearchBarIcon />}</SearchBarSuffix>}
            placeholder={placeholder || translate("search")}
            {...rest}
        />
    );
};

export default SearchBar;
