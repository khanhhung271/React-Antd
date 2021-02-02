/* eslint-disable react/react-in-jsx-scope */
import { Input, Form, Checkbox } from "antd"
import React from "react"

export interface IFormElementProps {
  component: any;
  label: any;
  required: any;
  name: any;
  key: any;
  isRender: any;
}

export interface IFormElementState {
  isRender: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class FormElement extends React.Component<IFormElementProps, IFormElementState> {
  // mapping of our components
  componentMapping = {
    input: Input,
    password: Input.Password,
    checkbox: Checkbox,
  }

  constructor(props: IFormElementProps | Readonly<IFormElementProps>) {
    super(props);
    this.state = {
      isRender: false
    };
  }

  handleChange() {
    this.setState({
      isRender: this.props.isRender
    });
  }

  return () {
    const {component, key, label, name, required} = this.props;
    const Component = this.componentMapping[component];
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <Form.Item key={key}
        label={label}
        name={name}
        rules={[{ required, message: "Field is required!" }]}
      >
        <Component onChange={() => this.handleChange()}/>
      </Form.Item>
    )
  }    
}

export default FormElement;
// export default function FormElement(this: any, { component, label, required, name, key, isRender }): JSX.Element {
//   // dinamically select a component from componentMapping object
//   const Component = componentMapping[component]
  
//   return (
//     // eslint-disable-next-line react/react-in-jsx-scope
//     <Form.Item key={key}
//       label={label}
//       name={name}
//       rules={[{ required, message: "Field is required!" }]} isRender={isRender}
//     >
//       <Component />
//     </Form.Item>
//   )
// }