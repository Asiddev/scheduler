export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => singleDay.name === day);
  if (state.days.length === 0 || filteredDays.length === 0) {
    return [];
  }

  const appointments = filteredDays[0].appointments;

  let formattedAppointments = [];

  for (let appointment of appointments) {
    formattedAppointments.push(state.appointments[appointment]);
  }
  return formattedAppointments;
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
  const filteredDays = state.days.filter((singleDay) => singleDay.name === day);
  if (state.days.length === 0 || filteredDays.length === 0) {
    return [];
  }

  let formattedInterviewers = [];

  for (let interviewer of filteredDays[0].interviewers) {
    formattedInterviewers.push(state.interviewers[interviewer]);
  }
  return formattedInterviewers;
}
