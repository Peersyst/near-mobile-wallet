import { ExposedBackdropProps } from "@peersyst/react-native-components";

export interface AddDAppToFavouritesModalProps extends ExposedBackdropProps {
    url: string;
}

export interface AddDAppToFavouritesModalFormData {
    name: string;
    url: string;
}
