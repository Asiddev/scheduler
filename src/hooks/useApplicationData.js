import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function findWeekIndex(day) {
    const weekDayIndexs = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    let correctWeekIndex = weekDayIndexs[day];
    return correctWeekIndex;
  }

  const setDay = (day) => setState({ ...state, day });

  //fetch data for days , render once.
  useEffect(() => {
    let getDays = axios.get("/api/days");
    let getAppointments = axios.get("/api/appointments");
    let getInterviewers = axios.get("/api/interviewers");

    const promises = [getDays, getAppointments, getInterviewers];

    Promise.all(promises).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //book interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const weekIndex = findWeekIndex(state.day);
    // console.log("hello", state.days[weekIndex].spots);
    let day = state.days[weekIndex];
    if (!state.appointments[id].interview) {
      //if the interview never existed before then subtract one
      day = {
        ...state.days[weekIndex],
        spots: state.days[weekIndex].spots - 1,
      };
    }

    let days = [...state.days];
    days[weekIndex] = day;

    return axios.put(`api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  //cancelInterview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const weekIndex = findWeekIndex(state.day);
    // console.log("hello", state.days[weekIndex].spots);
    let updatedDay = {
      ...state.days[weekIndex],
      spots: state.days[weekIndex].spots + 1,
    };

    let days = [...state.days];

    days[weekIndex] = updatedDay;

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  return { cancelInterview, bookInterview, setDay, state };
}
