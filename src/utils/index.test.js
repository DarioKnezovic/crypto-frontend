import utils from "./index";

test('Function toKebabCase should return correct value', () => {
    const testCases = [
        {
            value: 'Live price',
            expected: 'live-price'
        },
        {
            value: 'Exchanged',
            expected: 'exchanged'
        },
        {
            value: 'testCase',
            expected: 'test-case'
        },
        {
            value: 'IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML',
            expected: 'i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html'
        },
        {
            value: 'AllThe-small Things',
            expected: 'all-the-small-things'
        },
        {
            value: null,
            expected: ''
        },
        {
            value: '',
            expected: ''
        },
        {
            value: 123,
            expected: ''
        },
        {
            value: {},
            expected: ''
        },
        {
            value: [],
            expected: ''
        }
    ];

    testCases.forEach(testCase => {
        expect(utils.toKebabCase(testCase.value)).toBe(testCase.expected)
    })
})

test('Function getUSDValueFromCryptoCurrency should return correct value', () => {
    const testCases = [
        {
            cryptoValue: 1,
            usdValue: 1,
            expected: 1
        },
        {
            cryptoValue: 2,
            usdValue: 4,
            expected: 0.5
        },
        {
            cryptoValue: null,
            usdValue: null,
            expected: 0
        },
        {
            cryptoValue: undefined,
            usdValue: 1,
            expected: 0
        },
        {
            cryptoValue: 'test',
            usdValue: undefined,
            expected: 0
        }
    ]

    testCases.forEach(testCase => {
        expect(utils.getUSDValueFromCryptoCurrency(testCase.cryptoValue, testCase.usdValue)).toBe(testCase.expected)
    })
})

test('Function formatDate should return correct date format', () => {
    const testCases = [
        {
            value: '22/01/2022 15:45',
            expected: ''
        },
        {
            value: null,
            expected: ''
        },
        {
            value: undefined,
            expected: ''
        },
        {
            value: '2022-07-26T11:57:25.000Z',
            expected: '26/07/2022 11:57'
        },
        {
            value: '2022-07-26T07:05:25.000Z',
            expected: '26/07/2022 07:05'
        }
    ]
    testCases.forEach(testCase => {
        expect(utils.formatDate(testCase.value)).toBe(testCase.expected)
    })
})
