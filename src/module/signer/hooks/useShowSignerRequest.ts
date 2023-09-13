import { useRoute } from "@react-navigation/native";
import useSignerModal, { SignerModalType } from "./useSignerModal";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import { useCallback } from "react";

export default function useShowSignerRequest() {
    const { path, params } = useRoute();
    const navigation = useNavigation();

    const { showSignerModal } = useSignerModal();

    const showSignerRequest = useCallback(() => {
        const rootPath = path?.split("/")?.[0];

        if (rootPath === "sign" && params && "type" in params && "id" in params) {
            navigation.reset({ routes: [{ name: MainScreens.HOME, path: undefined, params: undefined }] });
            showSignerModal(params.type as SignerModalType, params.id as string);
        }
    }, [navigation, path, params]);

    return showSignerRequest;
}
