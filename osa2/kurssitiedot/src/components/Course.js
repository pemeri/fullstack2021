import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  
  
  const Content = (props) => {
    return (
      <div>
        { props.course.parts.map( (part, index) => <Part key={index} part={part.name} exercises={part.exercises} />) }
      </div>
    )
  }
  
  const Total = (props) => {
    return (
      <div>
        <p><b>Total of exercises { props.course.parts.reduce((sum, cur) => sum + cur.exercises, 0) }</b></p>
      </div>
    )
  }

const Course = ({ course }) => {
  return (
    <div>
        <Header course={course} />
        <Content course={course}/>
        <Total course={course} />
    </div>
  )
}

export default Course