import { Typography } from "@peersyst/react-native-components";
import { useControlled } from "@peersyst/react-hooks";
import useTranslate from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { RemoveFavouriteDAppModalProps } from "./RemoveFavouriteDAppModal.types";
import { TouchableOpacity } from "react-native";
import useRemoveDAppFromFavourites from "module/dapp/query/useRemoveDAppFromFavourites";
import { CardNavigatorModalContent, RemoveFavouriteDAppModalIcon } from "./RemoveFavouriteDAppModal.styles";

const RemoveFavouriteDAppModal = ({
    defaultOpen,
    open: openProp,
    onClose: onCloseProp,
    onOpen,
    dApp,
    ...rest
}: RemoveFavouriteDAppModalProps): JSX.Element => {
    const [open, setOpen] = useControlled(defaultOpen, openProp, openProp ? onCloseProp : onOpen);
    const { mutate: removeFromFavourites } = useRemoveDAppFromFavourites();
    const translate = useTranslate();

    function handleOnPress() {
        removeFromFavourites(dApp.url);
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
            <TouchableOpacity onPress={handleOnPress}>
                <CardNavigatorModalContent>
                    <RemoveFavouriteDAppModalIcon />
                    <Typography variant="body2Regular">{translate("removeFavourites")}</Typography>
                </CardNavigatorModalContent>
            </TouchableOpacity>
        </CardNavigatorModal>
    );
};

export default RemoveFavouriteDAppModal;
