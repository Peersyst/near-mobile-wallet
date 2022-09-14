import { ThemeProvider } from "@peersyst/react-native-styled";
import { colored_background } from "asset/image";
import { DAOCardRoot, DAOCardContent } from "./DAOAccountCard.styles";
import DAOCardBalance from "./DAOCardBalance/DAOCardBalance";
import DAOCardButtons from "./DAOCardButtons/DAOCardButtons";
import DAOCardHeader from "./DAOCardHeader/DAOCardHeader";
import darkTheme from "config/theme/darkTheme";

const DAOCard = (): JSX.Element => {
    return (
        <ThemeProvider theme={darkTheme}>
            <DAOCardRoot source={colored_background}>
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
