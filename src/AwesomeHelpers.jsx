/**
 * Creates a random ID of a given length
 * @param {number} length
 * @return {string}
 */
function awesomeId(length = 20) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
}

export const AwesomeHelpers = {
    awesomeId: awesomeId,
};
