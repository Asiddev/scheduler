import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from "react";

function Form(props) {
  // const [student, setStudent] = useState(props.student || "");
  // console.log(props.name);
  const [name, setName] = useState(props.name || "");
  console.log(props.name);
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function () {
    // setStudent("");
    setName("");
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    props.onCancel();
  };

  // function save() {
  //   props.onSave(student, interviewer);
  // }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid={"student-name-input"}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
