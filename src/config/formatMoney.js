const formatMoney = (n) => {
    return Number(n).toFixed().replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    }) + " đ";
};

const formatMoney2 = (n) => {
    return Number(n).toFixed().replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    }) + ",000 đ";
};

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        h = d.getUTCHours(),
        min = d.getUTCMinutes();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [day, month, year].join('/') + " - " + [h, min].join(":");
};


const formatDate2 = (date) => {
    const time = new Date(date);
    var d = "", m = "", h = "", mi = "";
    const y = time.getFullYear().toString();
    const month = time.getMonth() + 1;
    if (month < 10) {
        m = "0" + month.toString();
    } else {
        m = month.toString();
    }
    const day = time.getDate();
    if (day < 10) {
        d = "0" + day.toString();
    } else {
        d = day.toString();
    }
    const hour = time.getHours();
    if (hour < 10) {
        h = "0" + hour.toString();
    } else {
        h = hour.toString();
    }
    const min = time.getMinutes();
    if (min < 10) {
        mi = "0" + min.toString();
    } else {
        mi = min.toString();
    }

    return `${m}/${d}/${y} ${h}:${mi}`
}
// 2023-03-04T22:30:00.000Z
const formatDate3 = (str) => {
    const date = str.split("T")[0];
    const time = str.split("T")[1];
    const y = date.split("-")[0];
    const m = date.split("-")[1];
    const d = date.split("-")[2];
    const h = time.split(":")[0];
    const min = time.split(":")[1];
    return `${m}/${d}/${y} ${h}:${min}`
}

const CheckDate = (timeStart, timeEnd) => {
    var check = false;
    const s = new Date(timeStart);
    const e = new Date(timeEnd);
    console.log({
        start: s,
        end: e,
        hieu: e - s
    })
    if (e - s > 0) {
        check = true
    }

    return check
}

module.exports = {
    formatMoney,
    formatDate,
    formatDate2,
    formatMoney2,
    formatDate3,
    CheckDate
}