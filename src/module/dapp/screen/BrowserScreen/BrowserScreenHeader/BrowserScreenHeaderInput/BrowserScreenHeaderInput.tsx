import { IconButton, Typography } from "@peersyst/react-native-components";
import { TouchableOpacity } from "react-native";
import { useRef, useState } from "react";
import SearchModal from "module/dapp/containers/SearchModal/SearchModal";
import { BrowserScreenHeaderInputRoot, FavouriteWebIcon, NotFavouriteWebIcon } from "./BrowserScreenHeaderInput.styles";
import AddDAppToFavouritesModal from "module/dapp/containers/AddDAppToFavouritesModal/AddDAppToFavouritesModal";

export interface BrowserScreenHeaderInputProps {
    onSearch: (search: string) => void;
    url: string;
}

function BrowserScreenHeaderInput({ url, onSearch }: BrowserScreenHeaderInputProps): JSX.Element {
    const [openSearchModal, setSearchModalOpen] = useState(false);
    const [openAddToFavouritesModal, setAddToFavouritesModal] = useState(false);

    const random = useRef(Math.random());

    return (
        <>
            <BrowserScreenHeaderInputRoot>
                <TouchableOpacity onPress={() => setSearchModalOpen(true)} style={{ flex: 1 }}>
                    <Typography variant="body3Strong" numberOfLines={1}>
                        {url}
                    </Typography>
                </TouchableOpacity>
                <IconButton onPress={() => setAddToFavouritesModal(true)}>
                    {random.current % 2 === 0 ? <FavouriteWebIcon /> : <NotFavouriteWebIcon />}
                </IconButton>
            </BrowserScreenHeaderInputRoot>
            <SearchModal open={openSearchModal} onClose={() => setSearchModalOpen(false)} onSearch={onSearch} />
            <AddDAppToFavouritesModal url={url} open={openAddToFavouritesModal} onClose={() => setAddToFavouritesModal(false)} />
        </>
    );
}

export default BrowserScreenHeaderInput;
