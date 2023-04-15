export const getRowColFromElement = element =>
{
    const row = element.getAttribute('row');
    const col = element.getAttribute('col');
    return [parseInt(row), parseInt(col)];
}

export const callInInterval = (cb, interval) =>
{
    setTimeout(cb, interval);
}