import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

function Appointment(props) {
  let student = undefined;
  let interviewer = undefined;
  if (props.interview) {
    student = props.interview.student;
    interviewer = props.interview.interviewer.name;
    console.log(student, interviewer);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {props.interview ? (
        <Show student={student} interviewer={interviewer} />
      ) : (
        <Empty />
      )}
    </article>
  );
}

export default Appointment;
