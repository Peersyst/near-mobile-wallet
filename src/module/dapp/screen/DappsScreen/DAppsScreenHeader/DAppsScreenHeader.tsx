import { DAppsScreenFakeInput, DAppsScreenFakeInputIcon, DAppsScreenHeaderWrapper } from "./DAppsScreenHeader.styles";
import Typography from "module/common/component/display/Typography/Typography";
import { TouchableWithoutFeedback } from "react-native";
import useTranslate from "module/common/hook/useTranslate";

export interface DAppsScreenHeaderProps {
    onPress: () => void;
}

const DAppsScreenHeader = ({ onPress }: DAppsScreenHeaderProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <DAppsScreenHeaderWrapper>
            <Typography variant="body2Strong">{translate("discoverNewDApps")}</Typography>
            <TouchableWithoutFeedback onPress={onPress}>
                <DAppsScreenFakeInput>
                    <Typography color="overlay.20%" variant="body3Strong">
                        {translate("search")}
                    </Typography>
                    <DAppsScreenFakeInputIcon />
                </DAppsScreenFakeInput>
            </TouchableWithoutFeedback>
        </DAppsScreenHeaderWrapper>
    );
};

export default DAppsScreenHeader;
