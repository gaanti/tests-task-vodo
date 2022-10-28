interface AdaptedColumns {
  maxColumnsQty: number;
  maxColumnWidth: number;
}
export function adaptColumnsQty() {
  const deviceWidth = window.screen.width;
  if (deviceWidth <= 450) {
    const adaptedColumns: AdaptedColumns = {
      maxColumnWidth: 190,
      maxColumnsQty: 2,
    };
    return adaptedColumns;
  }
  if (deviceWidth <= 770) {
    const adaptedColumns: AdaptedColumns = {
      maxColumnWidth: 240,
      maxColumnsQty: 3,
    };
    return adaptedColumns;
  }
  if (deviceWidth <= 1000) {
    const adaptedColumns: AdaptedColumns = {
      maxColumnsQty: 4,
      maxColumnWidth: 250,
    };
    return adaptedColumns;
  }
  if (deviceWidth > 1000) {
    const adaptedColumns: AdaptedColumns = {
      maxColumnsQty: 5,
      maxColumnWidth: deviceWidth/4 - 20,
    };
    return adaptedColumns;
  }
  const adaptedColumns: AdaptedColumns = {
    maxColumnsQty: 3,
    maxColumnWidth: deviceWidth/3 - 40,
  };
  return adaptedColumns;
}
const res = adaptColumnsQty()
console.log(res);
