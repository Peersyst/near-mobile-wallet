import { useModalState } from "../hooks/useModalState";
import { TouchableWithoutFeedback } from "react-native";

export function ModalManager(): JSX.Element {
    const stateModals = useModalState();

    const modals = stateModals.map((m, index) => <TouchableWithoutFeedback key={index.toString()}>{m}</TouchableWithoutFeedback>);
    return <>{modals}</>;
}
