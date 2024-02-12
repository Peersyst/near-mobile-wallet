import Typography, { TypographyProps } from "module/common/component/display/Typography/Typography";
import { Action } from "near-peersyst-sdk";
import { useGetActionLabel } from "./hooks/useGetActionLabel/useGetActionLabel";

export interface ActionLabelProps extends Omit<TypographyProps, "children"> {
    action: Action;
}

const ActionLabel = ({ action, ...typographyProps }: ActionLabelProps): JSX.Element => {
    const label = useGetActionLabel(action);
    return (
        <Typography {...typographyProps} color="gray.600">
            {label}
        </Typography>
    );
};

export default ActionLabel;
