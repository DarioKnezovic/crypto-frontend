export default {
    CRYPTO_CURRENCIES: [
        {
            name: 'Bitcoin',
            value: 'BTC',
            icon: 'btc.svg'
        },
        {
            name: 'Ethereum',
            value: 'ETH',
            icon: 'eth.svg'
        }
    ],
    CURRENCIES: [
        {
            name: 'USD',
            value: 'USD',
            icon: 'usd.svg'
        }
    ],
    CURRENCY_SHORTCODES: {
        BTC: 'Bitcoin',
        ETH: 'Ethereum',
    },
    HISTORY_TYPES: {
        LIVE_PRICE: 'Live price',
        EXCHANGED: 'Exchanged'
    },
    EXCHANGE_FORM_KEYS: {
        CURRENCY_FROM: 'currency_from',
        AMOUNT_ONE: 'amount_one',
        CURRENCY_TO: 'currency_to',
        AMOUNT_TWO: 'amount_two'
    },
    CURRENCY_RATE_BACKEND_PAYLOAD: {
        TIME: 'time',
        BASE: 'base',
        CURRENCY_ONE_NAME: 'currency_one_name',
        CURRENCY_ONE_RATE: 'currency_one_rate',
        CURRENCY_TWO_NAME: 'currency_two_name',
        CURRENCY_TWO_RATE: 'currency_two_rate',
    },
    SOCKET_URL: 'http://localhost:3000',
    SOCKET_EVENTS: {
        CONNECT: 'connect',
        LATEST_CURRENCY_RATES: 'currency_rates',
        SAVE_EXCHANGE: 'save_exchange',
        EXCHANGES_HISTORY: 'exchanges_history',
        GET_CHANGES_HISTORY: 'get_exchanges_history',
        CURRENCY_RATES_UPDATE: 'currency_rates_update'
    }
}
