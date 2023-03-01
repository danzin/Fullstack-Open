/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query'
import useFormSubmit from '../hooks/formSubmit'
import blogService, { create } from '../services/blogs'
import { useNotification } from '../context/NotificationContext'
import { useLogin } from '../context/LoginContext'

// const useField = (id) => {
//   const [value, setValue] = useState('')

//   const onChange = (event) => {
//     setValue(event.target.value)
//   }

//   return {
//     id,
//     value,
//     onChange,
//   }
// }

const AddBlog = () => {
  //custom react hook handling form data
  const queryClient = useQueryClient()
  const { formData, handleInputChange, createObj, emptyForm } = useFormSubmit()
  const { showNotification } = useNotification()
  const { user } = useLogin()
  const newBlogMutation = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const addBlog = (e) => {
    e.preventDefault()
    blogService.setToken(user.token)
    const newBlog = createObj()
    newBlogMutation.mutate(newBlog)
    emptyForm()
    showNotification('success', `Successfully added ${newBlog.title}`)
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div>
          author:{' '}
          <input
            name="author"
            id="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          title:{' '}
          <input
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          url:{' '}
          <input
            name="url"
            id="url"
            value={formData.url}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-sm">
          save
        </button>
      </form>
    </div>
  )
}

export default AddBlog
