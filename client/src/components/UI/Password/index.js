import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";

const Password = (props) => {

  const [isPassword, setIsPassword] = useState(true);
  const [visiblePasswordIcon, setVisiblePasswordIcon] = useState('far fa-eye-slash');

  const visiblePasswordChange = () => {
    if (isPassword) {
      setIsPassword(false);
      setVisiblePasswordIcon('far fa-eye');
    } else {
      setIsPassword(true);
      setVisiblePasswordIcon('far fa-eye-slash');
    }
  }

  return (
    <div>
      <Form.Group>
        {props.label && <Form.Label>{props.label}</Form.Label>}
        <div style={{ display: 'flex', border: '1px solid gray' }} >
          {
            isPassword ? (<div style={{ width: '100%' }}>
              <Form.Control
                style={{ border: 'none' }}
                type="password"
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                {...props}
              />
            </div>) : (<div style={{ width: '100%' }}>
              <Form.Control
                style={{ border: 'none' }}
                type="text"
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                {...props}
              />
            </div>)
          }
          <div style={{ padding: '8px' }}>
            <a onClick={() => visiblePasswordChange()} >
              <i className={visiblePasswordIcon} ></i>
            </a>
          </div>
        </div>
        <Form.Text className="text-danger">
          {props.errorMessage}
        </Form.Text>
      </Form.Group>
    </div>
  )
}

export default Password;