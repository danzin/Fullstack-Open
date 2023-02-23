const Blog = ({blog}) => (
  <div>
    {blog.title} by {blog.author} liked {blog.likes} times
  </div>  
)

export default Blog