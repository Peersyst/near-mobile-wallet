import { Col } from "@peersyst/react-native-components";

//@ts-ignore
import TransakWebView from "@transak/react-native-sdk";

export default function OnRampView() {
    //@ts-ignore
    const transakEventHandler = (event, data) => {
        switch (event) {
            case "ORDER_PROCESSING":
                console.log(data);
                break;

            case "ORDER_COMPLETED":
                console.log(data);
                break;

            default:
                console.log(data);
        }
    };

    return (
        <TransakWebView
            queryParams={{
                apiKey: "4a3f3484-0df6-41af-b865-6da3bc82ccd9",
                environment: "STAGING",
                defaultCryptoCurrency: "NEAR",
                networks: "mainnet",
                cryptoCurrencyList: "NEAR",
                walletAddress: "3f2133f0d24ffeb5df4c07d9b767fd66ac31fcf2acce18b4ee9c32c8ed8b3b97",
                // .....
                // For the full list of query params refer Props section below
            }}
            onTransakEventHandler={transakEventHandler}
            style={{ flex: 1 }}
            // .....
            // For the full list of react-native-webview props refer Props section below
        />
    );
}
