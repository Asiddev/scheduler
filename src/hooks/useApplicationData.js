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

  //book interview
  function bookInterview(id, interview) {
    if (interview.interviewer === null || interview.student === "") {
      return Promise.reject("invalid fields");
    }
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const weekIndex = findWeekIndex(state.day);
    console.log("hello", state.days[weekIndex].spots);
    let updatedDay = {
      ...state.days[weekIndex],
      spots: state.days[weekIndex].spots - 1,
    };

    let days = [...state.days];

    days[weekIndex] = updatedDay;

    console.log(state.days);
    // console.log(state.days[day].name);

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
      console.log(state);
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
    console.log("hello", state.days[weekIndex].spots);
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

  return { cancelInterview, bookInterview, setDay, state };
}
