import useWallet from "module/wallet/hook/useWallet";
import { useState } from "react";
import Select from "module/common/component/input/Select/Select";
import { Row, SelectItem, Typography } from "react-native-components";
import { getLuminance } from "@peersyst/react-utils";
import useAddressColor from "module/wallet/hook/useAddressColor";
import { translate } from "locale";
import Balance from "module/wallet/component/display/Balance/Balance";

const AccountSelector = (): JSX.Element => {
    const {
        state: { cells, selectedAccount: defaultAccount = 0 },
    } = useWallet();
    const [selectedIndex, setSelectedIndex] = useState<number>(defaultAccount);
    const selectedAccount = selectedIndex !== undefined ? cells[selectedIndex] : undefined;
    const addressColor = useAddressColor(selectedAccount?.address || "");
    const backgroundColor = selectedAccount ? addressColor : undefined;
    const textColor = getLuminance(backgroundColor || "#FFFFFF") < 0.5 ? "#FFFFFF" : "#000000";

    return (
        <Select
            value={selectedIndex}
            onChange={(i) => setSelectedIndex(i as number)}
            style={{ display: { color: textColor, ...(backgroundColor && { backgroundColor }) } }}
            title={translate("select_an_account")}
            placeholder={translate("no_account_selected")}
            renderValue={() =>
                selectedAccount !== undefined ? (
                    <Row alignItems="center">
                        <Typography variant="body1" fontWeight="bold" style={{ color: textColor }}>
                            {selectedAccount.name}
                        </Typography>
                        <Typography variant="body1" style={{ color: textColor }}>
                            {" "}
                            -{" "}
                        </Typography>
                        <Balance balance={selectedAccount.balance} units={"CKB"} variant="body1" boldUnits style={{ color: textColor }} />
                    </Row>
                ) : undefined
            }
        >
            {cells.map(({ address, name, balance }, index) => {
                const itemColor = selectedAccount?.address === address ? "#FFFFFF" : "#000000";
                return (
                    <SelectItem value={index} key={address}>
                        <Row alignItems="center">
                            <Typography variant="body1" fontWeight="bold" style={{ color: itemColor }}>
                                {name}
                            </Typography>
                            <Typography variant="body1" style={{ color: itemColor }}>
                                {" "}
                                -{" "}
                            </Typography>
                            <Balance balance={balance} units={"CKB"} variant="body1" boldUnits style={{ color: itemColor }} />
                        </Row>
                    </SelectItem>
                );
            })}
        </Select>
    );
};

export default AccountSelector;
