import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const get = async () => {
    const res = await axios.get(baseUrl)
    setResources(resources => res.data)
  }

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource)
    setResources(resources => resources.concat(res.data))
  }

  const service = {
    get,
    create
  }

  return [
    resources, service
  ]
}