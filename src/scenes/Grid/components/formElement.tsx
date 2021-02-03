/* eslint-disable react/react-in-jsx-scope */
//import { Form, Input } from "antd"
import React from "react"

// const componentMapping = {
//   input: Input,
//   password: Input.Password,
//   checkbox: Checkbox,
// }

// function onChange(e) {
//   e.preventDefault();
// }

// export default FormElement;
export default function FormElement({ label, required, name, id }: any): JSX.Element {
  // dinamically select a component from componentMapping object
  // const Component = componentMapping[component]  

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div>
      <div>{label}</div>
      <input id={`field${id}`} key={`field${id}`} data-id={id} className='field' />
    </div>
  )
}