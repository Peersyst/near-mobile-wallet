import { Row } from "@peersyst/react-native-components";
import { useControlled } from "@peersyst/react-hooks";
import useTranslate from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { RemoveFavouriteDAppModalProps } from "./RemoveFavouriteDAppModal.types";
import { TouchableWithoutFeedback } from "react-native";
import useRemoveDAppFromFavourites from "module/dapp/query/useRemoveDAppFromFavourites";
import { DeleteIcon } from "icons";

const RemoveFavouriteDAppModal = ({
    defaultOpen,
    open: openProp,
    onClose: onCloseProp,
    onOpen,
    dApp,
    ...rest
}: RemoveFavouriteDAppModalProps): JSX.Element => {
    const [open, setOpen] = useControlled(defaultOpen, openProp, openProp ? onCloseProp : onOpen);
    const { mutate } = useRemoveDAppFromFavourites();
    const translate = useTranslate();

    function handleOnPress() {
        mutate(dApp);
        setOpen(false);
    }

    return (
        <CardNavigatorModal
            navbar={{
                title: dApp.name,
            }}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={onOpen}
            {...rest}
        >
            <TouchableWithoutFeedback>
                <Row>
                    <DeleteIcon />
                </Row>
            </TouchableWithoutFeedback>
        </CardNavigatorModal>
    );
};

export default RemoveFavouriteDAppModal;
