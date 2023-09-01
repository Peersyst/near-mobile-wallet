import { useState } from "react";
import { RecommendedDAppsFilters } from "../RecommendedDApps.types";
import { DAppTagOption } from "module/signer/components/input/DAppTagSelect/DAppTagSelect.types";

interface UseRecommendedDAppsFiltersReturn {
    filters: RecommendedDAppsFilters;
    handleQueryChange: (query: string) => void;
    handleTagChange: (tag: DAppTagOption) => void;
}

export default function useRecommendedDAppsFilters(): UseRecommendedDAppsFiltersReturn {
    const [filters, setFilters] = useState<RecommendedDAppsFilters>({ query: "", tag: "all" });

    const handleQueryChange = (query: string) => {
        setFilters((prev) => ({ ...prev, query }));
    };

    const handleTagChange = (tag: DAppTagOption) => {
        setFilters((prev) => ({ ...prev, tag }));
    };

    return {
        filters,
        handleQueryChange,
        handleTagChange,
    };
}
