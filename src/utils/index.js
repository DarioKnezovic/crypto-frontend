/*
 * Function which convert string to kebab case
 * @param str String
 *
 * @return String
 */
const toKebabCase = (str) => {
    if (typeof str !== "string") {
        return ''
    }

    return str &&
            str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('-');
}

export default {
    toKebabCase
}
