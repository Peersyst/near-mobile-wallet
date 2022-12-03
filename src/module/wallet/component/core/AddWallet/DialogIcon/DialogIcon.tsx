import { Row } from "@peersyst/react-native-components";
import { BaseDialogIcon } from "./BaseDialogIcon";
import { DialogIconText } from "./DialogIcon.styles";

export function DialogIcon(): JSX.Element {
    return (
        <Row alignItems="center" justifyContent="center" style={{ height: 52, width: 52 }}>
            <DialogIconText variant="h4Strong">Hi!</DialogIconText>
            <BaseDialogIcon width={56.9} height={52} style={{ position: "absolute", zIndex: -1, top: 3 }} />
        </Row>
    );
}
