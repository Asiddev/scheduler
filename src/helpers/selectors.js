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
