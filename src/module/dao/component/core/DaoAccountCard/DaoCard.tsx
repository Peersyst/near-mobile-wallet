import { ThemeProvider } from "@peersyst/react-native-styled";
import { image } from "asset/image";
import { darkTheme } from "module/common/style/darkTheme";
import { DaoCardRoot, DaoCardContent } from "./DaoAccountCard.styles";
import DaoCardBalance from "./DaoCardBalance/DaoCardBalance";
import DaoCardButtons from "./DaoCardButtons/DaoCardButtons";
import DaoCardHeader from "./DaoCardHeader/DaoCardHeader";

const DaoCard = (): JSX.Element => {
    return (
        <ThemeProvider theme={darkTheme}>
            <DaoCardRoot source={image.coloredBackground}>
                <DaoCardContent>
                    <DaoCardHeader />
                    <DaoCardBalance />
                    <DaoCardButtons />
                </DaoCardContent>
            </DaoCardRoot>
        </ThemeProvider>
    );
};

export default DaoCard;
