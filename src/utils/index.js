export function normaliseData(dataArray) {
    return dataArray.reduce((acc, data) => {
        acc[data._id] = data;
        return acc;
    }, {});
}
export function processArticleData(dataArray) {
    return dataArray.reduce((acc, data) => {
        acc[data._id] = data;
        acc[data._id].commentsVisable = false;
        return acc;
    }, {});
}