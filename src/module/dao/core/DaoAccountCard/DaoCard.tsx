import { ThemeProvider } from "@peersyst/react-native-styled";
import { image } from "asset/image";
import { darkTheme } from "module/common/style/darkTheme";
import { DaoCardRoot, DaoCardContent } from "./DaoAccountCard.styles";
import DaoCardBalance from "./DaoCardBalance/DaoCardBalance";
import DaoCardButtons from "./DaoCardButtons/DaoCardButtons";
import DaoCardHeader from "./DaoCardHeader/DaoCardHeader";

export interface DaoCardProps {
    availableBalance: string,
    lockedBalance: string, 
    currentAPC: string
}

const DaoCard = (): JSX.Element => {
    const DaoData:DaoCardProps = {
        availableBalance: "12635.304223",
        lockedBalance: "594.323",
        currentAPC: "2.4"
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <DaoCardRoot source={image.coloredBackground}>
                <DaoCardContent>
                    <DaoCardHeader />
                    <DaoCardBalance {...DaoData} />
                    <DaoCardButtons />
                </DaoCardContent>
            </DaoCardRoot>
        </ThemeProvider>
    );
};

export default DaoCard;
