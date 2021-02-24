function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var text = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
}

function capitalize(str) {
    return str
        .split(' ')
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
}

function makeLorem(length) {
    var randStr = ''
    while (randStr.length < length) {
        var wordLength = getRandomInt(3, 6)
        var word = _createWord(wordLength)

        if (Math.random() > 0.9) word += ','

        randStr += word + ' '
    }
    randStr = randStr.substring(0, length)
    randStr = randStr[0].toUpperCase() + randStr.substr(1)

    return randStr
}

function debounce(func, wait) {
    let timeout

    return function (...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

function createRandomColor() {
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += _getRandColorVal()
    }
    return color
}
function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

    return '#' + _padZero(r) + _padZero(g) + _padZero(b);
}
function _padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

export const utilService = {
    getRandomInt,
    makeLorem,
    makeId,
    capitalize,
    debounce,
    createRandomColor,
    invertColor
}

function _getRandColorVal() {
    const VALUES = '0123456789abcdef'
    var rndIndex = parseInt(Math.random() * VALUES.length)
    return VALUES.charAt(rndIndex)
}

function _getRandChar() {
    var LETTERS = 'abcdefghijklmnopqrstuvwxyz'
    var randIndex = parseInt(Math.random() * LETTERS.length)
    return LETTERS.charAt(randIndex)
}

function _createWord(length) {
    var word = ''
    while (word.length < length) {
        var randChar = _getRandChar()
        word += randChar
    }

    return word
}
