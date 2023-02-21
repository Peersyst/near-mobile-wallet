import { Row } from "@peersyst/react-native-components";
import { BubbleIcon } from "./BubbleIcon";
import { BubbleText } from "./Bubble.styles";

export function Bubble(): JSX.Element {
    return (
        <Row alignItems="center" justifyContent="center" style={{ height: 52, width: 52 }}>
            <BubbleText variant="h4Strong">Hi!</BubbleText>
            <BubbleIcon width={56.9} height={52} style={{ position: "absolute", zIndex: -1, top: 3 }} />
        </Row>
    );
}
