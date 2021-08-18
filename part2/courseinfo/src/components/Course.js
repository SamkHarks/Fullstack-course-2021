import React from 'react'

const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}
  
const Content = ({course}) => {
    return (
        <div>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Total = ({course}) => {
    const sum = course.parts.reduce((sum,ex) => {
        return sum + ex.exercises
    },0)
    return (
    <p>Number of exercises {sum}</p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course