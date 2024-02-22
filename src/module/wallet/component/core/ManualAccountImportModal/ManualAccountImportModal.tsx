import { Col, ExposedBackdropProps, Form, createModal } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import AddressTextField from "module/transaction/component/input/AddressTextField/AddressTextField";
import Button from "module/common/component/input/Button/Button";
import Typography from "module/common/component/display/Typography/Typography";
import useManualAccountImportModal from "./hooks/useManualAccountImportModal";

const ManualAccountImport = createModal(({ defaultOpen, open: openProp, onClose, ...props }: ExposedBackdropProps): JSX.Element => {
    const { open, handleSubmit, handleOnBack, isLoading } = useManualAccountImportModal({ defaultOpen, open: openProp, onClose });
    const translate = useTranslate();

    return (
        <CardNavigatorModal
            open={open}
            navbar={{ title: translate("importAccountManually").toUpperCase(), back: true, onBack: handleOnBack }}
            {...props}
        >
            <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
                <Col flex={1} gap={24}>
                    <Typography variant="body2Light" light textAlign="center">
                        {translate("importAccountManuallyDescription")}
                    </Typography>
                    <AddressTextField senderWalletIndex={0} name="account" label={translate("enterTheAccount")} />
                    <Button type="submit" fullWidth loading={isLoading}>
                        {translate("import")}
                    </Button>
                </Col>
            </Form>
        </CardNavigatorModal>
    );
});

export default ManualAccountImport;
