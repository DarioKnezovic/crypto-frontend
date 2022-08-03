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

test('Function getReversedValue should return correct value', () => {
    const testCases = [
        {
            value: 1,
            expected: 1
        },
        {
            value: 2,
            expected: 0.5
        },
        {
            value: 0.000043,
            expected: 23255.81395348837
        },
        {
            value: 2.56565656,
            expected: 0.3897637803868808
        },
        {
            value: null,
            expected: 0
        },
        {
            value: undefined,
            expected: 0
        },
        {
            value: 'test',
            expected: 0
        }
    ]

    testCases.forEach(testCase => {
        expect(utils.getReversedValue(testCase.value)).toBe(testCase.expected)
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
        }
    ]
    testCases.forEach(testCase => {
        expect(utils.formatDate(testCase.value)).toBe(testCase.expected)
    })
})
