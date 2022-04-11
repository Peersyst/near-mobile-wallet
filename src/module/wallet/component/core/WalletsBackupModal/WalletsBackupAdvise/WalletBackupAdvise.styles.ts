import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";

const WALLETS_BACKUP_ADVISE_IMAGE_RATIO = 0.45;

export const WalletsBackupAdviseImage = styled(Image, { fadeDuration: 400 })(({ dimensions: { width, height } }) => ({
    width: width * WALLETS_BACKUP_ADVISE_IMAGE_RATIO,
    height: width * WALLETS_BACKUP_ADVISE_IMAGE_RATIO,
    display: height < 600 ? "none" : undefined,
}));
