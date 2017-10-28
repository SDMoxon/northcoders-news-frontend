export function normaliseData(dataArray) {
    return dataArray.reduce((acc,data) => {
        acc[data._id] = data;
        return acc;
    },{});
}