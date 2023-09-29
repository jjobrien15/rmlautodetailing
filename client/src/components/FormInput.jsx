import { useState } from "react";

const FormInput = (props) => {
    
    const { onChange, ...input } = props

    const [focused, setFocused] = useState(false);

    const handleFocused = (e) => {
        setFocused(true)
      }

  return (
    <div className="formGroup">
        <label htmlFor={input.name}>{input.label}</label>
          <input
              {...input}
              onChange={onChange}
              onBlur={handleFocused}
              focused={focused.toString()}
              onFocus={() => input.name === "pwd2" && setFocused(true)}
              autoComplete="false"
          />
          <span className="formErrMessage">{input.errormessage}</span>
    </div>
  )
}

export default FormInput
