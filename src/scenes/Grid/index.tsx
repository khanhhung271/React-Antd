import * as React from 'react';

import { Button, Card, Col, Dropdown, Menu, Modal, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';

import { FormInstance } from 'antd/lib/form';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import CreateOrUpdateRow from './components/createOrUpdateRow';
import Stores from '../../stores/storeIdentifier';
import GridStore from '../../stores/gridStore';
import { Row as MyRow } from '../../models/Grid/row';
import utils from '../../utils/utils';

export interface IGridProps {
  gridStore: GridStore;
}

export interface IGridState {
  modalVisible: boolean;
  // addColumn: boolean;
  // removeColumn: boolean;
  rowId: number;
}

const {confirm} = Modal;

@inject(Stores.GridStore)
@observer
class Grid extends React.Component<IGridProps, IGridState> {
  formRef: React.RefObject<FormInstance<any>>;

  constructor(props: IGridProps | Readonly<IGridProps>) {
    super(props);
    this.state = {
      modalVisible: false,
      rowId: 0
      // addColumn: false,
      // removeColumn: false,      
    };
    this.formRef = React.createRef<FormInstance>();
    this.getAll();
  }

  // handleTableChange = (pagination: any) => {
  //   this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  // };

  Modal = (): void => {
    this.setState((state) => {
      return { modalVisible: !state.modalVisible };
    });
  };

  getAll = ():void => {
    const { gridStore } = this.props;
    gridStore.getAll();
  }

  handleCreate = (): void => {
    const form = this.formRef.current;
    const { rowId } = this.state;
    const { gridStore } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    form?.validateFields().then(async (values: MyRow) => {
      const row = form.getFieldsValue(true) as MyRow;
      if (rowId === 0) {
        row.id = gridStore.grid.rows.length;
        gridStore.createRow(row);
      } else {
        gridStore.updateRow({ cells: row.cells, id: rowId });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.setState({ modalVisible: false });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      form?.resetFields();
    });
  };

  createOrUpdateModalOpen(entityDto: MyRow): void {
    const { gridStore } = this.props;
    if (entityDto.id === 0) {
      gridStore.createRowEntity();
    } else {
      gridStore.get(entityDto);
    }

    this.setState({ rowId: entityDto.id });
    this.Modal();
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.formRef.current?.setFieldsValue({...gridStore.row});
    }, 100);
  }

  delete(input: MyRow): void {
    const { gridStore } = this.props;
    confirm({
      title: 'Do you Want to delete this row?',
      onOk() {
        gridStore.deleteRow(input);
      },
      onCancel() {
        // eslint-disable-next-line no-console
        console.log('Cancel');
      },
    });
  }

  

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public render = () => {
    const { gridStore: { grid } } = this.props;
    const { modalVisible, rowId } = this.state;
    if(grid.rows.length) {
      const { cells } = grid.rows[0];
      const [,...gridItems] = grid.rows;
      const dataSource = utils.convertTwoToOneDimensionArray(gridItems);
      let columns: any[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      cells?.forEach((c, i) => {
        columns = [...columns, {
            title: (`${c.label}`), dataIndex: (`column${i}`), key: (`column${i}`), render: (text: string) => <div>{text}</div>
          }
        ];
      });
      columns = [...columns, {
        title: 'Actions',
        // width: 150,
        render: (text: string, item: MyRow) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={(
                <Menu>
                  <Menu.Item onClick={() => this.createOrUpdateModalOpen({id: item.id})}>Edit</Menu.Item>
                  <Menu.Item onClick={() => this.delete(item)}>Delete</Menu.Item>
                </Menu>
              )}
              placement="bottomLeft"
            >
              <Button type="primary" icon={<SettingOutlined />}>
                Actions
              </Button>
            </Dropdown>
          </div>
        ),
      }];

      return (
        <Card>
          <Row>
            <Col
              xs={{ span: 4, offset: 0 }}
              sm={{ span: 4, offset: 0 }}
              md={{ span: 4, offset: 0 }}
              lg={{ span: 2, offset: 0 }}
              xl={{ span: 2, offset: 0 }}
              xxl={{ span: 2, offset: 0 }}
            >
              {' '}
              <h2>Grid</h2>
            </Col>
            <Col
              xs={{ span: 14, offset: 0 }}
              sm={{ span: 15, offset: 0 }}
              md={{ span: 15, offset: 0 }}
              lg={{ span: 1, offset: 21 }}
              xl={{ span: 1, offset: 21 }}
              xxl={{ span: 1, offset: 21 }}
            >
              <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              lg={{ span: 24, offset: 0 }}
              xl={{ span: 24, offset: 0 }}
              xxl={{ span: 24, offset: 0 }}
            >
              <Table
                rowKey={(record) => record.rowId.toString()}
                bordered
                columns={columns}
                loading={grid === undefined}
                dataSource={grid === undefined ? [] : dataSource}
              />
            </Col>
          </Row>
          <CreateOrUpdateRow
            formRef={this.formRef}
            visible={modalVisible}
            onCancel={() => {
              this.setState({
                modalVisible: false,
              });
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              this.formRef.current?.resetFields();
            }}
            modalType={rowId === 0 ? 'edit' : 'create'}
            onCreate={this.handleCreate}
          />
        </Card>
      );
    }
    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 4, offset: 0 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
            xxl={{ span: 2, offset: 0 }}
          >
            {' '}
            <h2>No header for grid</h2>
          </Col>
        </Row>
      </Card>
    );
  }  
}

export default Grid;