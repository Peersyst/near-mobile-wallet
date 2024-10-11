import { Col, Form } from "@peersyst/react-native-components";
import { useControlled } from "@peersyst/react-hooks";
import useTranslate from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import useAddDAppToFavourites from "module/dapp/query/useAddDAppToFavourites";
import TextField from "module/common/component/input/TextField/TextField";
import Button from "module/common/component/input/Button/Button";
import { AddDAppToFavouritesModalProps, AddDAppToFavouritesModalFormData } from "./AddDAppToFavouritesModal.types";

const AddDAppToFavouritesModal = ({
    defaultOpen,
    open: openProp,
    onClose: onCloseProp,
    onOpen,
    url,
    ...rest
}: AddDAppToFavouritesModalProps): JSX.Element => {
    const [open, setOpen] = useControlled(defaultOpen, openProp, openProp ? onCloseProp : onOpen);
    const { mutate: addToFavourites, isLoading } = useAddDAppToFavourites();
    const translate = useTranslate();

    function handleSubmit({ name, url }: AddDAppToFavouritesModalFormData) {
        addToFavourites({ name, url });
        setOpen(false);
    }

    return (
        <CardNavigatorModal
            navbar={{
                title: translate("addToFavourites"),
            }}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={onOpen}
            {...rest}
        >
            <Form onSubmit={handleSubmit}>
                <Col gap={24}>
                    <TextField label={translate("name")} name="name" required />
                    <TextField selection={{ start: 0, end: 0 }} label={translate("URL")} name="url" readonly value={url} />
                    <Button type="submit" fullWidth loading={isLoading}>
                        {translate("add")}
                    </Button>
                </Col>
            </Form>
        </CardNavigatorModal>
    );
};

export default AddDAppToFavouritesModal;
