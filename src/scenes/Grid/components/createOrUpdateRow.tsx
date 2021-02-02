import * as React from 'react';

import { Modal, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Row as MyRow} from '../../../models/Grid/row';
import FormElement from './formElement';
// import utils from '../../../utils/utils';
// import { Cell } from '../../../models/Grid/cell';
// import FormElement from './formElement';

export interface ICreateOrUpdateRowProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
}

export interface ICreateOrUpdateRowState {
  renderFieldsComplete: boolean;
}

class CreateOrUpdateRow extends React.Component<ICreateOrUpdateRowProps, ICreateOrUpdateRowState> {
  FormFields = [] as JSX.Element[];

  constructor(props: ICreateOrUpdateRowProps | Readonly<ICreateOrUpdateRowProps>) {
    super(props);
    this.state = {
      renderFieldsComplete: false
    };
  }

  // componentDidUpdate() {
  //   setTimeout(() => {
  //     const { formRef } = this.props;
  //     this.createFormField(formRef);
  //   }, 150);
  // }

  createFormField = (formRef: { current: any; }): void => {
    const { current } = formRef;
    if(current) {
      const { cells } = current.getFieldsValue(true) as MyRow;
      const { renderFieldsComplete } = this.state;
      if(!renderFieldsComplete) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        for(let i = 0; i < cells!.length; i += 1) {
          this.FormFields.push(<FormElement key={`formItem${i}`} {...cells![i]} isRender={renderFieldsComplete} />)
          // this.FormFields.push(<Form.Item key={`formItem${i}`} label={cells![i].label} name={cells![i].value as string}>
          //                       <Input />
          //                     </Form.Item>);
        }
        // this.FormFields = cells?.map((r, i) => (
        //   // eslint-disable-next-line react/no-array-index-key
        //   // eslint-disable-next-line react/jsx-key
        //   // eslint-disable-next-line react/no-array-index-key
        //   <Form.Item key={`formItem${i}`} label={r.label} {...formItemLayout} name={r.value as string}>
        //     <Input />
        //   </Form.Item>
        //   //  <FormElement key={`formItem${i}`} {...r} />
        //   )
        // // eslint-disable-next-line react/jsx-key
        // ) || ([]);
        this.setState({
          renderFieldsComplete: true
        });
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { visible, onCancel, onCreate, formRef } = this.props;
    // const { formFields } = this.state;
    return (      
      <Modal visible={visible} cancelText="Cancel" okText='OK' onCancel={onCancel} onOk={onCreate} title='Row' destroyOnClose>
        <Form ref={formRef}>
          {setTimeout(() => {
              if(formRef.current) {
                const { cells } = formRef.current.getFieldsValue(true) as MyRow;
                const { renderFieldsComplete } = this.state;
                if(!renderFieldsComplete) {
                  this.setState({
                    renderFieldsComplete: true
                  });
                  setTimeout(() => {        
                    cells!.map((c, i) => (
                      <FormElement key={`formItem${i}`} {...c} isRender={renderFieldsComplete}/>
                    ));
                  }, 100);                 
                }
                if(!cells) {
                  this.setState({
                    renderFieldsComplete: false
                  });
                }                
              }
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              [];
            }, 150)
          }
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateRow;
