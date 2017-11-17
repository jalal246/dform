const f = false;
const t = true;

// slice array
const slc = (arr, i, nElm = f, isRw = f) =>
  (nElm
    ? [...arr.slice(0, i), nElm, ...arr.slice(isRw ? i : i + 1)]
    : [...arr.slice(0, i), ...arr.slice(i + 1)]);

const row = (arr, ri, info) =>
  slc(
    arr,
    ri,
    info
      ? {
        rowID: info.rowID,
        cells: [{ cellID: info.cellID, lable: info.lable, value: info.value }],
      }
      : f,
    t,
  );

const cell = (arr, ri, ci, info, opt = 'a') =>
  slc(arr, ri, {
    rowID: arr[ri].rowID,
    cells: slc(
      arr[ri].cells,
      ci,
      info ? Object.assign({}, opt !== 'a' ? arr[ri].cells[ci] : {}, info) : f,
    ),
  });

export default {
  row,
  cell,
};
