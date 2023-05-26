export enum TransakEnviroment {
    PRODUCTION = "PRODUCTION",
    STAGING = "STAGING",
}

export enum TransakProduct {
    BUY = "BUY",
    SELL = "SELL",
    BUY_AND_SELL = "BUY,SELL",
}

export enum SupportedPaymentMethods {
    CREDIT_DEBIT_CARD = "credit_debit_card",
    APPLE_PAY = "apple_pay",
    GOOGLE_PAY = "google_pay",
    SEPA_BANK_TRANSFER = "sepa_bank_transfer",
    GBP_BANK_TRANSFER = "gbp_bank_transfer",
    UPI = "upi",
    MOBIKWIK_WALLET = "mobikwik_wallet",
}

//https://docs.transak.com/docs/websocket-events
export enum TransakEvent {
    ORDER_PROCESSING = "ORDER_PROCESSING",
    ORDER_FAILED = "ORDER_FAILED",
    ORDER_COMPLETED = "ORDER_COMPLETED",
    ORDER_PAYMENT_VERIFYING = "ORDER_PAYMENT_VERIFYING",
    ORDER_CREATED = "ORDER_CREATED",
}

export interface TransakBuyQueryParams {
    walletAddress?: string;
    walletAddressData?: any;
    productsAvailed?: TransakProduct.BUY;
    fiatAmount?: number; //100
    defaultFiatAmount?: number; //100
    defaultPaymentMethod?: SupportedPaymentMethods; //cgbp_bank_transfer
    disablePaymentMethods?: string; //gbp_bank_transfer,sepa_bank_transfer
    disableWalletAddressForm?: boolean;
}

export interface TransakSellQueryParams {
    cryptoAmount?: number;
    productsAvailed?: TransakProduct.SELL;
}

export interface BaseTransakQueryParams {
    apiKey: string;
    environment?: "STAGING" | "PRODUCTION";
    cryptoCurrencyCode?: string; //DAI
    defaultCryptoCurrency?: string; //DAI
    cryptoCurrencyList?: string; //ETH,DAI,USDT
    networks?: string; //ethereum,ethereum,polygon,terra,mainnet - comma separated(https://global.transak.com/)
    network?: string;
    fiatCurrency?: string; //GBP
    countryCode?: string; //IN
    defaultNework?: string; //ethereum
    defaultCryptoAmount?: number; //0.1
    email?: string;
    userData?: any;
    partnerOderId?: string;
    partnerCustomerId?: string;
    redirectURL?: string;
    isAutoFillUserData?: boolean;
    themeColor?: string;
    widgetHeight?: number;
    widgetWidth?: number;
    hideMenu?: boolean;
    isFeeCalculationHidden?: boolean;
    exchangeScreenTitle?: string;
    excludeFiatCurrencies?: string;
}

export type TransakQueryParamsByProduct =
    | TransakBuyQueryParams
    | TransakSellQueryParams
    | {
          productsAvailed?: TransakProduct.BUY_AND_SELL | undefined;
      };

//https://docs.transak.com/docs/query-parameters
export type TransakQueryParams = BaseTransakQueryParams & TransakQueryParamsByProduct;
export type TransakOnRampQueryParams = BaseTransakQueryParams & TransakBuyQueryParams;
export type TransakOffRampQueryParams = BaseTransakQueryParams & TransakSellQueryParams;
