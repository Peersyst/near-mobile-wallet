import { ThemeProvider } from "@peersyst/react-native-styled";
import { image } from "asset/image";
import { darkTheme } from "module/common/style/darkTheme";
import { DAOCardRoot, DAOCardContent } from "./DAOAccountCard.styles";
import DAOCardBalance from "./DAOCardBalance/DAOCardBalance";
import DAOCardButtons from "./DAOCardButtons/DAOCardButtons";
import DAOCardHeader from "./DAOCardHeader/DAOCardHeader";

const DAOCard = (): JSX.Element => {
    return (
        <ThemeProvider theme={darkTheme}>
            <DAOCardRoot source={image.coloredBackground}>
                <DAOCardContent>
                    <DAOCardHeader />
                    <DAOCardBalance />
                    <DAOCardButtons />
                </DAOCardContent>
            </DAOCardRoot>
        </ThemeProvider>
    );
};

export default DAOCard;
