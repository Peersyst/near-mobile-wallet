import { ThemeProvider } from "@peersyst/react-native-styled";
import { image } from "asset/image";
import { darkTheme } from "module/common/style/darkTheme";
import useGetDaoBalance from "module/dao/query/useGetDaoBalance";
import { DaoCardRoot, DaoCardContent } from "./DaoAccountCard.styles";
import DaoCardBalance from "./DaoCardBalance/DaoCardBalance";
import DaoCardButtons from "./DaoCardButtons/DaoCardButtons";
import DaoCardHeader from "./DaoCardHeader/DaoCardHeader";

const DaoCard = (): JSX.Element => {
    const { data: DAOBalance } = useGetDaoBalance();
    return (
        <ThemeProvider theme={darkTheme}>
            <DaoCardRoot source={image.coloredBackground}>
                <DaoCardContent>
                    <DaoCardHeader />
                    <DaoCardBalance {...DAOBalance} />
                    <DaoCardButtons />
                </DaoCardContent>
            </DaoCardRoot>
        </ThemeProvider>
    );
};

export default DaoCard;
