import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

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

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={student}
          interviewer={interviewer}
          interview={props.interview}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          interview
          onSave={save}
          onCancel={() => back()}
          bookInterview={props.bookInterview}
        />
      )}
      {mode === SAVING && <Status>SAVING</Status>}
    </article>
  );
}

export default Appointment;
