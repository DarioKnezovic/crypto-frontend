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
