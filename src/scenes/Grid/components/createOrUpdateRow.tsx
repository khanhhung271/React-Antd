import * as React from 'react';

import { Modal, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Row as MyRow} from '../../../models/Grid/row';
import FormElement from './formElement';
import { Cell } from '../../../models/Grid/cell';
import utils from '../../../utils/utils';

export interface ICreateOrUpdateRowProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
}

export interface ICreateOrUpdateRowState {
  formFields: Cell[];
}

class CreateOrUpdateRow extends React.Component<ICreateOrUpdateRowProps, ICreateOrUpdateRowState> {
  FormFields = [] as Cell[];

  handleChange = (e) => {
    if(e.target.className.indexOf('field') > -1) {
      let formFields = [...this.state.formFields];
      formFields[e.target.dataset.id]["value"] = e.target.value;
      this.setState({ formFields }, () => console.log(this.state.formFields));
      const { formRef } = this.props;
      const row = {
        cells: formFields,
        id: 0
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      formRef.current?.setFieldsValue(row);
    }
  };

  constructor(props: ICreateOrUpdateRowProps | Readonly<ICreateOrUpdateRowProps>) {
    super(props);
    this.state = {
      formFields: []
    };
  }
  
  componentDidUpdate() {
    setTimeout(() => {      
      const { formFields } = this.state;
      const { formRef: { current } } = this.props;
      const { cells } = current?.getFieldsValue(true) as MyRow;
      if(cells?.length && !utils.compareTwoArray(cells, formFields)) {        
        this.createFormField(current);
      }
    }, 150);
  }

  createFormField = (current: any): void => {
    const { cells } = current.getFieldsValue(true) as MyRow;
    if(current) {      
      this.setState({
        formFields: cells || []
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { visible, onCancel, onCreate, formRef } = this.props;
    const { formFields } = this.state;
    return (      
      <Modal visible={visible} cancelText="Cancel" okText='OK' onCancel={onCancel} onOk={onCreate} title='Row' destroyOnClose>
        <Form ref={formRef} onChange={this.handleChange}>
          {formFields.map((c, i) => {
                      return (<FormElement key={`formItem${i}`} id={i} {...c}/>)
                    })}
        </Form>
      </Modal>
    );
  };
}

export default CreateOrUpdateRow;
