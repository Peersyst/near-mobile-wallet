import { Col, createBackdrop, ExposedBackdropProps, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import Typography from "../../display/Typography/Typography";
import Button from "../../input/Button/Button";
import { useUpdateApp } from "module/home/hook/useUpdateApp";
import { UpdatingAppModal } from "../UpdatingAppModal/UpdatingAppModal";

export type UpdateRequiredModalProps = ExposedBackdropProps;

const UpdateRequiredModal = createBackdrop(({ ...rest }: UpdateRequiredModalProps): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();
    const { mutate: updateApp, isLoading } = useUpdateApp();

    const handleUpdate = async () => {
        hideModal(UpdateRequiredModal.id);
        updateApp();
    };

    return (
        <CardNavigatorModal
            navbar={{
                title: translate("updateRequired").toUpperCase(),
            }}
            {...rest}
        >
            <Col gap={24} justifyContent="center">
                <Typography variant="body3Regular" textAlign="center">
                    {translate("updateRequiredDescription")}
                </Typography>
                <Button variant="primary" fullWidth onPress={handleUpdate}>
                    {translate("updateAppNow")}
                </Button>
            </Col>
            <UpdatingAppModal open={isLoading} />
        </CardNavigatorModal>
    );
});

export default UpdateRequiredModal;
