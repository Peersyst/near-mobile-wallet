import { image } from "asset/image";
import { DaoCardRoot, DaoCardContent } from "./DaoAccountCard.styles";
import DaoCardHeader from "./DaoCardHeader/DaoCardHeader";

const DaoCard = (): JSX.Element => {
    return (
        <DaoCardRoot source={image.coloredBackground}>
            <DaoCardContent>
                <DaoCardHeader /> 
            </DaoCardContent>
        </DaoCardRoot>
    );
};

export default DaoCard;
