import { useEffect, useState } from "react";
import useGetDAppsHistory from "module/dapp/query/useGetSearchHistory";
import useNavigation from "module/common/hook/useNavigation";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";

export function useDAppsScreen() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const { navigate } = useNavigation();

    useGetDAppsHistory(); // Preload DApps history

    useEffect(() => {
        if (search && !open) {
            navigate(DAppScreens.WEBVIEW, { url: search });
        }
    }, [search, open]);

    function handleOnClose() {
        setOpen(false);
    }

    function handleOnOpen() {
        setSearch("");
        setOpen(true);
    }

    return {
        open,
        handleOnClose,
        handleOnOpen,
        setSearch,
        setOpen,
    };
}
