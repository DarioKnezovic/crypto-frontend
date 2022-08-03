export default {
    CRYPTO_CURRENCIES: [
        {
            name: 'Bitcoin',
            icon: 'btc.svg'
        },
        {
            name: 'Ethereum',
            icon: 'eth.svg'
        }
    ],
    CURRENCIES: [
        {
            name: 'USD',
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
    SOCKET_URL: 'http://localhost:3000',
    SOCKET_EVENTS: {
       CONNECT: 'connect',
       LATEST_CURRENCY_RATES: 'currency_rates'
    }
}
