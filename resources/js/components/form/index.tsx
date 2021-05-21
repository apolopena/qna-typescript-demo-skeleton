import React, {
  HTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes
} from 'react'

type FormWrapper = React.HTMLAttributes<HTMLDivElement>
type FormBase = React.FormHTMLAttributes<HTMLFormElement>
type FormError = React.HTMLAttributes<HTMLDivElement>
type FormTitle = React.HTMLAttributes<HTMLDivElement>
type FormInput = React.InputHTMLAttributes<HTMLInputElement>
type FormTextArea = React.TextareaHTMLAttributes<HTMLTextAreaElement>
type FormSubmit = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Form ({ children, ...restProps }: FormWrapper) {
  return <div {...restProps} >{children}</div>
}

Form.Base = function FormBase({ children, ...restProps }: FormBase) {
  return <form {...restProps}>{children}</form>
}

Form.Error = function FormError({ children, ...restProps }: FormError) {
  return <div {...restProps}>{children}</div>
}

Form.Title = function FormTitle({ children, ...restProps }: FormTitle) {
  return <div {...restProps}>{children}</div>
}

Form.Input = function FormInput({ children, ...restProps }: FormInput) {
  return <input {...restProps}>{children}</input>
}

Form.TextArea = function FormTextArea({ children, ...restProps }: FormTextArea) {
  return <textarea {...restProps}>{children}</textarea>
}

Form.Submit = function FormSubmit({ children, ...restProps }: FormSubmit) {
  return <button {...restProps}>{children}</button>
}