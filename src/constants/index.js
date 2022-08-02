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
    SOCKET_URL: 'http://localhost:3000',
    SOCKET_EVENTS: {
       CONNECT: 'connect',
       LATEST_CURRENCY_RATES: 'currency_rates'
    }
}
