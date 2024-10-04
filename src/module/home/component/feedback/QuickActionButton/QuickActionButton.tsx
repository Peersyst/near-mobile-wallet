import Button from "module/common/component/input/Button/Button";
import { QuickAction } from "../QuickActionsModal.types";
import Typography from "module/common/component/display/Typography/Typography";
import { Row } from "@peersyst/react-native-components";
import {
    QuickActionsButtonPrimaryIcon,
    QuickActionsButtonPrimaryIconPositioner,
    QuickActionsButtonSoftIcon,
} from "./QuickActionButton.styles";

export interface QuickActionButtonProps {
    quickAction: QuickAction;
}

export function QuickActionButton({ quickAction: { variant, Icon, label, ...rest } }: QuickActionButtonProps): JSX.Element {
    if (variant === "primary") {
        return (
            <Button variant="primary" {...rest}>
                <Row flex={1} justifyContent="center">
                    <QuickActionsButtonPrimaryIconPositioner>
                        <QuickActionsButtonPrimaryIcon>
                            <Icon />
                        </QuickActionsButtonPrimaryIcon>
                    </QuickActionsButtonPrimaryIconPositioner>
                    <Typography variant="body2Strong" color="white">
                        {label}
                    </Typography>
                </Row>
            </Button>
        );
    } else {
        return (
            <Button variant="primarySoft" {...rest}>
                <Row flex={1} justifyContent="center" gap={10}>
                    <QuickActionsButtonSoftIcon>
                        <Icon />
                    </QuickActionsButtonSoftIcon>
                    <Typography variant="body2Strong" color="primary">
                        {label}
                    </Typography>
                </Row>
            </Button>
        );
    }
}
