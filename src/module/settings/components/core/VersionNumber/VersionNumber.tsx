import Typography from "module/common/component/display/Typography/Typography";
import SettingsCard from "../../display/SettingsCard/SettingsCard";
import { useConfig } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";

export default function VersionNumber() {
    const version = useConfig("appVersion");
    const translate = useTranslate();

    return (
        <SettingsCard>
            <Typography variant="body3Strong">
                {translate("version")} {version}
            </Typography>
        </SettingsCard>
    );
}
