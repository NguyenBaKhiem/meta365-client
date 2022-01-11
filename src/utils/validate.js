export const validate = {
    loginRequest,
    arraySibling,
    arrayStringSibling,
    hasDuplicates
}

function loginRequest(credential) {
    const { email, password } = credential;
    if (email.length === 0 || password.length === 0)
        return { error: true }
    if (email.indexOf('@') < 0)
        return { error: true, data: 'require_email' }
    return { error: false }
}
function arraySibling(array) {
    for (let i = 1; i < array.length; i++) {
        if (array[i] !== (array[i - 1] + 1)) {
            return false
        }
    }
    return true
}
function arrayStringSibling(array) {
    for (let i = 1; i < array.length; i++) {
        if (array[i - 1].length+2 === array[i].length) {
            return false
        }
    }
    return true
}
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}