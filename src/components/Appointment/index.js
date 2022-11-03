import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

function Appointment(props) {
  let student = undefined;
  let interviewer = undefined;
  if (props.interview) {
    student = props.interview.student;
    interviewer = props.interview.interviewer.name;
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // {props.interview ? (
  //   <Show student={student} interviewer={interviewer} />
  // ) : (
  //   <Empty />
  // )}

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={student} interviewer={interviewer} />}
      {mode === CREATE && (
        <Form interviewers={[]} onCancel={() => transition(EMPTY)} />
      )}
    </article>
  );
}

export default Appointment;
