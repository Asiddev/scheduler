import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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

  function remove() {
    transition(DELETING);

    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
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
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          interview
          onSave={save}
          onCancel={() => back(EMPTY)}
          bookInterview={props.bookInterview}
        />
      )}
      {mode === SAVING && <Status>SAVING</Status>}
      {mode === DELETING && <Status>DELETING</Status>}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={remove}
          onCancel={back}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.name ? props.name : props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
    </article>
  );
}

export default Appointment;
