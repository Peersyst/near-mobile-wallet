import { ThemeProvider } from "@peersyst/react-native-styled";
import { image } from "asset/image";
import { darkTheme } from "module/common/style/darkTheme";
import useGetDaoBalance from "module/dao/query/useGetDaoBalance";
import useGetBalance from "module/wallet/query/useGetBalance";
import { DaoCardRoot, DaoCardContent } from "./DaoAccountCard.styles";
import DaoCardBalance from "./DaoCardBalance/DaoCardBalance";
import DaoCardButtons from "./DaoCardButtons/DaoCardButtons";
import DaoCardHeader from "./DaoCardHeader/DaoCardHeader";
import { DaoBalanceType } from "module/dao/types";

const DaoCard = (): JSX.Element => {
    const { data: daoBalance } = useGetDaoBalance();
    const { data: generalBalance } = useGetBalance();
    const daoCardBalance: Partial<DaoBalanceType> = {
        availableBalance: generalBalance?.freeBalance.toString(),
        lockedBalance: daoBalance?.daoDeposit.toString(),
        currentAPC: daoBalance?.daoCompensation.toString(),
    };
    return (
        <ThemeProvider theme={darkTheme}>
            <DaoCardRoot source={image.coloredBackground}>
                <DaoCardContent>
                    <DaoCardHeader />
                    <DaoCardBalance {...daoCardBalance} />
                    <DaoCardButtons />
                </DaoCardContent>
            </DaoCardRoot>
        </ThemeProvider>
    );
};

export default DaoCard;
