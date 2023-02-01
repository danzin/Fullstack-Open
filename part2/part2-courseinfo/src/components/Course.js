import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
    const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
    console.log(sum)
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total sum={sum} />

        </div>
    )
}
export default Course