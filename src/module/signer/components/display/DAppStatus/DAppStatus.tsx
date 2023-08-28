import Typography from "module/common/component/display/Typography/Typography";
import { DAppStatusRoot } from "./DAppStatus.styles";
import { DAppStatusProps } from "./DappStatus.types";
import useDAppStatus from "./hooks/useDAppStatus";

const DAppStatus = ({ connected }: DAppStatusProps): JSX.Element => {
    const { label, labelStyles, rootStyles } = useDAppStatus(connected);

    return (
        <DAppStatusRoot {...rootStyles}>
            <Typography {...labelStyles} variant="body4Strong">
                {label}
            </Typography>
        </DAppStatusRoot>
    );
};

export default DAppStatus;
