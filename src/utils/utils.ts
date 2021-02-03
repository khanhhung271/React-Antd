import { Cell } from "../models/Grid/cell";
import { Row } from "../models/Grid/row";

class Utils {
  compareTwoArray = (a: Array<Cell>, b: Array<Cell>) => {
    let isEquals = true;
    if(a.length !== b.length) {
      isEquals = false;
    } else {
      a.forEach((ai, idx) => {
        if(ai.name !== b[idx].name) isEquals = false;
        if(ai.value !== b[idx].value) isEquals = false;
      });
    }

    return isEquals;
  };
  convertTwoToOneDimensionArray = (a: Array<Row>) => {
    let b = new Array;
    a.forEach((r, rowId) => {
      let obj = {};
      obj["rowId"] = rowId;
      if(r.cells?.length) {
        r.cells.forEach((c, i) => {          
          obj["column"+i] = c.value;          
        })
        b.push(obj);
      }
    });
    return b;
  }
}

export default new Utils();