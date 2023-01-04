import { Row } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { NavbarTitle } from "module/common/component/navigation/Navbar/Navbar";
import { useTranslate } from "module/common/hook/useTranslate";
import { ChevronUpIcon } from "module/common/icons/ChevronUpIcon";
import AssetSelect from "../AssetSelect/AssetSelect";
import { WalletAssetSelectModalProps } from "./WalletAssetSelectModal.types";

export const WalletAssetSelectModal = ({ assetSelectProps, hideModal, ...rest }: WalletAssetSelectModalProps) => {
    const translate = useTranslate();
    return (
        <CardNavigatorModal
            navbar={{
                children: (
                    <Row flex={1} justifyContent="center">
                        <NavbarTitle title={translate("choose_what_to_send")} />
                        <Row style={{ position: "absolute", right: 0, top: 0 }}>
                            <ChevronUpIcon onPress={hideModal} />
                        </Row>
                    </Row>
                ),
            }}
            style={{ minHeight: 280 }}
            {...rest}
        >
            <AssetSelect {...assetSelectProps} />
        </CardNavigatorModal>
    );
};
