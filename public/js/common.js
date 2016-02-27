$.prototype.slideLeft = function (time) {

}

function convertTimestampToFullDate(timestamp) {
    if (!timestamp)
        return '';

    var date = new Date(timestamp);

    return date.getFullYear() + '-'
        + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
        + ('0' + date.getDate()).slice(-2) + ' '
        + ('0' + date.getHours()).slice(-2) + ':'
        + ('0' + date.getMinutes()).slice(-2) + ':'
        + ('0' + date.getSeconds()).slice(-2);
}