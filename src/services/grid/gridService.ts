import { Cell } from "../../models/Grid/cell";
import { Grid } from "../../models/Grid/grid";
import { Row } from "../../models/Grid/row";

class GridService {
  public getAll = (): Grid => {
    const result = {} as Grid;
    result.rows = new Array<Row>(1);
    for(let i = 0; i < result.rows.length; i += 1) {
      result.rows[i] = {
        id: i,
        cells: new Array<Cell>(5)
      };
      for(let j = 0; j < result.rows[i].cells!.length; j += 1) {
        result.rows[i].cells![j] = {
          name: "",
          value: `Column ${j + 1}`,
          component: "input",
          label: `Column ${j + 1}`,
          required: false
        }
      }
    }
    return result;
  }
}

export default new GridService();