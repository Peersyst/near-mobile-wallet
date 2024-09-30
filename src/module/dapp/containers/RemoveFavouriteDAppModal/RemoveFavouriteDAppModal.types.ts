import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { FavouriteDApp } from "../../types";

export interface RemoveFavouriteDAppModalProps extends ExposedBackdropProps {
    dApp: FavouriteDApp;
}
