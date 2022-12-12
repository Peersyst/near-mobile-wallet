import { Row, Selector, SelectorGroup } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import useWalletSelector from "module/wallet/hook/useWalletSelector";
import AccountBalance from "../../display/AccountBalance/AccountBalance";
import { WalletSelectorProps } from "./WalletSelectorGroup.types";

const WalletSelectorGroup = ({ value, defaultValue, onChange, label, ...rest }: WalletSelectorProps) => {
    const { selectedIndex, handleChange, wallets } = useWalletSelector({ value, onChange, defaultValue });

    const translate = useTranslate();
    return (
        <SelectorGroup
            LabelProps={{ gap: "7%" }}
            label={label || translate("select_funding_acc")}
            gap="7%"
            value={selectedIndex}
            onChange={handleChange}
            {...rest}
        >
            {wallets.map(({ index, account }, i) => (
                <Row alignItems="center" key={i} justifyContent="space-between" style={{ width: "100%" }}>
                    <Selector value={index} label={account} />
                    <AccountBalance index={index} key={index} variant="body3Strong" units="token" light />
                </Row>
            ))}
        </SelectorGroup>
    );
};

export default WalletSelectorGroup;
