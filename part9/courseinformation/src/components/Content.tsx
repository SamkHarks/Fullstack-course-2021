import React from 'react';
import { CoursePart } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const renderCoursePart = (part: CoursePart) => {

  const CourseInfo = () => {
    return (
      <b>
        {part.name} {part.exerciseCount}
      </b>
    )
  }

  switch (part.type) {
    case "normal":
      return (
        <div>
          <CourseInfo /><br></br>
          <em>{part.description}</em>
        </div>
      )
    case "submission":
      return (
        <div>
          <CourseInfo /><br></br>
          
          submit to {part.exerciseSubmissionLink}
        </div>
      )
    case "groupProject":
      return (
        <div>
        <CourseInfo /><br></br>
        project exercises {part.groupProjectCount}
        </div>
      )
    case "special":
      return (
        <div>
          <CourseInfo /><br></br>
          <em>{part.description}</em><br></br>
          required skills: { part.requirements.reduce((car,cur) => {
            return car+','+cur
          })}
        </div>
      )
    default: assertNever(part);
  }
}

const Part = (props: { part: CoursePart; }) => {
  return (
    <div>
      {renderCoursePart(props.part)}
    </div>
  )
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
      <div>
        {courseParts.map(part => {
          return (
            <div key={part.name}>
              <Part part={part} /><br></br>
            </div>
          )})}
      </div>
    )
}

export { Content };