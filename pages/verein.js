import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";

import { app, db } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import moment from "moment";
import deLocale from "moment/locale/de";

import Header from "./components/Header";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { DateRangePicker } from "react-dates";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { async } from "@firebase/util";
// import deLocale from "@fullcalendar/core/locales/de";

function Verein() {
  const dbEvents = collection(db, "events");

  const [name, setName] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [personenzahl, setPersonenzahl] = useState("");
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState(null);
  const [events, setEvents] = useState([]);

  const calendarRef = useRef(null);

  useEffect(() => {
    moment.locale("de", deLocale);
    getEvents();
  }, []);

  const getEvents = () => {
    getDocs(dbEvents).then((data) => {
      setEvents(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      beschreibung: beschreibung,
      personenzahl: personenzahl,
      startDate: startDate.format("DD-MM-YYYY"),
      endDate: endDate.format("DD-MM-YYYY"),
    };

    console.log("Submit", formData);

    try {
      const docRef = await addDoc(dbEvents, formData);
      console.log("Document written with ID: ", docRef.id);

      setName("");
      setBeschreibung("");
      setPersonenzahl("");
      setStartDate(moment());
      setEndDate(moment());

      getEvents();
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error adding document: ", e);
    }
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header darkNav="true" />

      <main>
        <div className="md:p-20 p-12 text-slate-700 ">
          <h1 className="">Termine und Kalender</h1>
          <div className="flex space-x-8 2xl:space-x-44 flex-col md:flex-row space-y-12 md:space-y-0">
            <div className="DatePicker border-l-2 px-6 py-3 border-slate-200 w-full">
              <h3>Neuen Termin eintragen</h3>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="email"
                  className="border rounded-sm border-slate-300 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="beschreibung" className="block mb-2">
                  Beschreibung
                </label>
                <textarea
                  id="beschreibung"
                  className="border rounded-sm border-slate-300 w-full h-24"
                  value={beschreibung}
                  onChange={(e) => setBeschreibung(e.target.value)}
                />
              </div>
              <div className="flex space-x-8">
                <div className="mb-6 w-1/3">
                  <label htmlFor="personenzahl" className="block mb-2">
                    Personenzahl
                  </label>
                  <input
                    type="number"
                    min={1}
                    id="personenzahl"
                    className="border rounded-sm border-slate-300 w-full"
                    value={personenzahl}
                    onChange={(e) => setPersonenzahl(e.target.value)}
                  />
                </div>

                <div className="w-2/3 mb-6">
                  <label htmlFor="datum" className="block mb-2">
                    Datum
                  </label>
                  <DateRangePicker
                    minimumNights={0}
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={startDate}
                    endDate={endDate}
                    openDirection="up"
                    onDatesChange={({ startDate, endDate }) => {
                      setStartDate(startDate);
                      setEndDate(endDate);
                      console.log(startDate, endDate);
                    }}
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput) => {
                      setFocusedInput(focusedInput);
                    }}
                  />
                </div>
              </div>
              <button onClick={handleSubmit} className="button w-full">
                Senden
              </button>
            </div>
            <div className="w-full">
              <FullCalendar
                innerRef={calendarRef}
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                initialView="dayGridMonth"
                locale="deLocale"
                firstDay={1}
                height={"auto"}
                buttonText={{ today: "Heute" }}
              />
            </div>
          </div>
          {events && (
            <table>
              {events.map((event) => {
                return (
                  <tr>
                    <td>{event.name}</td>
                    <td>{event.beschreibung}</td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default Verein;
