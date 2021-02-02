import { action, observable } from 'mobx';
import { Cell } from '../models/Grid/cell';
import { Grid } from '../models/Grid/grid';
import { Row } from '../models/Grid/row';
import gridService from '../services/grid/gridService';

class GridStore {
  @observable grid!: Grid;

  @observable row!: Row | undefined;

  @action
  createRow = (row: Row): void => {
    this.grid.rows = [...this.grid.rows, row];
  };

  @action
  updateRow = (row: Row): void => {
    this.grid.rows = this.grid.rows.map((r: Row) => {
      if(r.id === row.id) {
        // eslint-disable-next-line no-param-reassign
        r.cells = row.cells;
      }
      return r;
    });
  };

  @action
  deleteRow = (row: Row): void => {
    this.grid.rows = this.grid.rows.filter((r: Row) => r.id !== row.id);
  }

  @action
  addColumn = (cell: Cell): void => {
    this.grid.rows.forEach(e => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      e.cells = [...e.cells!, cell];
    });
  };

  @action
  removeColumn = (): void => {
    this.grid.rows.forEach(e => {
      if(e.cells?.length){
        e.cells.splice(e.cells.length-1, 1);
      }
    });
  };

  @action
  get = (row: Row): void => {
    this.row = this.grid.rows.find((r: Row) => r.id === row.id);
  }

  @action
  getAll = (): void => {
    this.grid = gridService.getAll();
  }

  @action
  createRowEntity = (): void => {
    const header = this.grid.rows[0].cells!;
    this.row= {
      id: 0,
      cells: new Array(header.length)
    };
    for(let i = 0; i < this.row.cells!.length; i += 1) {
      this.row.cells![i] = {
        value: "",
        name: "",
        label: header[i].label,
        component: "input",
        required: false
      } 
    }
  }
}

export default GridStore;
