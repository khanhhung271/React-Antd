import { Cell } from "../models/Grid/cell";

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
  }
}

export default new Utils();