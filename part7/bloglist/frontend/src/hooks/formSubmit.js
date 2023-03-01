import { useState } from 'react'

export const useField = () => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
  }

  return { value, onChange }
}
export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return [value, handleChange]
}

const useFormSubmit = () => {
  //hook keeps form data in it's own state
  //returning formData to be used later for the api call
  //without { author: '', title: '', url: '' } in use state it
  //returns error "A component is changing an uncontrolled input to be controlled."

  const [formData, setFormData] = useState({ author: '', title: '', url: '' })
  const handleInputChange = (e) => {
    e.persist()
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }))
  }

  const createObj = () => {
    return { title: formData.title, author: formData.author, url: formData.url }
  }

  const emptyForm = () => {
    formData.author = ''
    formData.title = ''
    formData.url = ''
  }

  return {
    handleInputChange,
    formData,
    createObj,
    emptyForm,
  }
}

export default useFormSubmit
