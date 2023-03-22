export const ValidationOnlyNumber = (str) => {
    const regex = /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;
    if (str.test(regex)) {
        return true
    } else {
        return false
    }
}