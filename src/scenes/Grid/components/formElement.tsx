/* eslint-disable react/react-in-jsx-scope */
import { Input, Form, Checkbox } from "antd"
import React from "react"

const componentMapping = {
  input: Input,
  password: Input.Password,
  checkbox: Checkbox,
}

function onChange(e) {
  e.preventDefault();
}

// export default FormElement;
export default function FormElement({ component, label, required, name, id }: any): JSX.Element {
  // dinamically select a component from componentMapping object
  const Component = componentMapping[component]
  
  

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Form.Item
      label={label}
      name={name}
      rules={[{ required, message: "Field is required!" }]}
    >
      <Component id={`field${id}`} data-id={id} className='field' onChange={(e) => onChange(e)}/>
    </Form.Item>
  )
}