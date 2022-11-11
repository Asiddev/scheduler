export function getAppointmentsForDay(state, day) {
  let result = [];
  const dayObj = state.days.find((d) => d.name === day);

  if (!dayObj) {
    return result;
  }

  for (const id of dayObj.appointments) {
    result.push(state.appointments[id]);
  }

  return result;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const newObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return newObj;
}

export function getInterviewersForDay(state, day) {
  let result = [];
  const dayObj = state.days.find((d) => d.name === day);

  if (!dayObj) {
    return result;
  }

  for (const id of dayObj.interviewers) {
    result.push(state.interviewers[id]);
  }

  return result;
}
