import MainBottomBarItem from "../MainBottomBarItem/MainBottomBarItem";
import QuickActionsModal from "module/home/component/feedback/QuickActionsModal";
import { useQuickActionsBottomBarItem } from "./hooks/useQuickActionsBottomBarItem";

const QuickActionsBottomBarItem = (): JSX.Element => {
    const { modals, actions, open, showModal, hideModal } = useQuickActionsBottomBarItem();

    return (
        <>
            {modals}
            <MainBottomBarItem style={{ marginTop: -10 }} onPress={showModal} />
            <QuickActionsModal quickActions={actions} open={open} onClose={hideModal} />
        </>
    );
};

export default QuickActionsBottomBarItem;
