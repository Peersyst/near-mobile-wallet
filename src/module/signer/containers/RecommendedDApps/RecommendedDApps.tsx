import { Col } from "@peersyst/react-native-components";
import DisconnectableDAppList from "module/signer/components/display/DisconnectableDAppList/DisconnectableDAppList";
import useRecommendedDApps from "module/signer/hooks/useRecommendedDApps";
import { Filters, DAppTagFilter } from "./RecommendedDApps.styles";
import useRecommendedDAppsFilters from "./hooks/useRecommendedDAppsFilters";
import SearchBar from "module/common/component/input/SearchBar/SearchBar";

const RecommendedDApps = (): JSX.Element => {
    const { filters, handleQueryChange, handleTagChange } = useRecommendedDAppsFilters();
    const { data: dapps, isLoading } = useRecommendedDApps(filters);

    return (
        <Col flex={1} style={{ width: "100%" }}>
            <Filters>
                <SearchBar onChange={handleQueryChange} style={{ flex: 1 }} />
                <DAppTagFilter value={filters.tag} onChange={handleTagChange} />
            </Filters>
            <DisconnectableDAppList dapps={dapps} loading={isLoading} />
        </Col>
    );
};

export default RecommendedDApps;
