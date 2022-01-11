// @ts-nocheck
export const timeUtils = {
    getRangeLastWeek,
    getRangeLastMonth,
    getRangeLastSixMonth,
    getRangeDateLastYear
}

function getFormattedDate(date) {
    const todayTime = new Date(date);
    let month = todayTime.getMonth() + 1;
    let day = todayTime.getDate();
    const year = todayTime.getFullYear();
    if (month < 10)
        month = '0' + month;

    if (day < 10)
        day = '0' + day;

    return year + "/" + month + "/" + day;
}

function getRangeLastWeek() {
    const beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000);
    const day = beforeOneWeek.getDay();
    const diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1);
    const lastMonday = new Date(beforeOneWeek.setDate(diffToMonday));
    const lastSunday = new Date(lastMonday.getTime() + 60 * 60 * 24 * 4 * 1000);
    const fromDate = getFormattedDate(lastMonday);
    const toDate = getFormattedDate(lastSunday);
    return { fromDate, toDate };
}

function getRangeLastMonth() {
    let toDate = new Date();
    const firstDay = new Date(toDate.getFullYear(), toDate.getMonth() - 1, 1);
    const endOfLast = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
    const fromDate = getFormattedDate(firstDay);
    toDate = getFormattedDate(endOfLast);
    return { fromDate, toDate };
}

function getRangeLastSixMonth() {
    let toDate = new Date();
    const firstDay = new Date(toDate.getFullYear(), toDate.getMonth() - 6, 1);
    const endOfLast = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
    const fromDate = getFormattedDate(firstDay);
    toDate = getFormattedDate(endOfLast);
    return { fromDate, toDate };
}

function getRangeDateLastYear() {
    let toDate = new Date();
    const firstDay = new Date(toDate.getFullYear() - 1, 0, 1);
    const endOfLast = new Date(toDate.getFullYear() - 1, 12, 0);
    const fromDate = getFormattedDate(firstDay);
    toDate = getFormattedDate(endOfLast);
    return { fromDate, toDate };
}
