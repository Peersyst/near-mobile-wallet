import { Col, createBackdrop, ExposedBackdropProps, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import Typography from "../../display/Typography/Typography";
import Button from "../../input/Button/Button";
import { useUpdateApp } from "module/home/hook/useUpdateApp";
import { UpdatingAppModal } from "../UpdatingAppModal/UpdatingAppModal";
import { Fragment } from "react";
import { useControlled } from "@peersyst/react-hooks";

export type UpdateRequiredModalProps = ExposedBackdropProps;

const UpdateRequiredModal = createBackdrop(
    ({ defaultOpen, open: openProp, onClose: onCloseProp, ...rest }: UpdateRequiredModalProps): JSX.Element => {
        const translate = useTranslate();
        const [open, setOpen] = useControlled(defaultOpen, openProp, onCloseProp);

        const handleOnError = () => {
            setOpen(false);
            return;
        };

        const {
            mutate: updateApp,
            isLoading,
            isError,
        } = useUpdateApp({
            onError: handleOnError,
        });

        const handleUpdate = async () => {
            setOpen(false);
            updateApp();
        };

        return (
            <Fragment>
                <CardNavigatorModal
                    navbar={{
                        title: translate("updateRequired").toUpperCase(),
                    }}
                    {...rest}
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Col gap={24} justifyContent="center">
                        <Typography variant="body3Regular" textAlign="center">
                            {translate("updateRequiredDescription")}
                        </Typography>
                        <Button variant="primary" fullWidth onPress={handleUpdate}>
                            {translate("updateAppNow")}
                        </Button>
                    </Col>
                </CardNavigatorModal>
                <UpdatingAppModal loading={isLoading} error={isError} />
            </Fragment>
        );
    },
);

export default UpdateRequiredModal;
