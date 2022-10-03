import React, { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import Head from "next/head";
import Header from "./components/header";
import ProtectedRoute from "./components/ProtectedRoute";
import { getEvents } from "../lib/events";
import moment from "moment";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

import EventForm from "./components/eventForm";

import { deleteEvent } from "../lib/events";

import { useToast } from "@chakra-ui/react";

import {
  TableContainer,
  Alert,
  AlertIcon,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  HStack,
  Icon,
  Tooltip,
} from "@chakra-ui/react";

import fetcher from "../util/fetcher";
import nookies from "nookies";
import { auth } from "../lib/firebase";

function Admin() {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const toast = useToast();
  const cookies = nookies.get();

  useEffect(() => {
    fetchEvents();
  }, []);

  const { data } = useSWR(auth ? ["/api/user", cookies.token] : null, fetcher);

  async function fetchEvents() {
    const events = await getEvents();
    setEvents(events);
  }

  const handleDelete = (id) => {
    deleteEvent(id);
    fetchEvents();
    toast({
      title: "Event gelöscht.",
      description: "Das Event wurde erfolgreich gelöscht.",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Verein - Admin</title>
        <meta
          name="description"
          content="Dorfschule Rahnsdorf - Termine und Kalender"
        />
      </Head>
      <Header darkNav="true" />
      <main>
        <div className="p-12 text-slate-700 md:p-20 ">
          <div className="flex flex-col space-x-8 space-y-12 md:flex-row md:space-y-0 2xl:space-x-28">
            <div>
              <h1>Alle Events</h1>
              <div className="flex flex-col space-y-6">
                <EventForm fetchEvents={fetchEvents} />
                {events.length > 0 ? (
                  <TableContainer>
                    <Table variant="simple" className="admin">
                      <TableCaption>
                        Stand {moment().format("DD.MM.YYYY")}
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Beschreibung</Th>
                          <Th>Personen</Th>
                          <Th>Datum</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {events.map((event) => {
                          return (
                            <Tr key={event.id} className="event-row">
                              <Td>{event.name}</Td>
                              <Td>{event.beschreibung}</Td>
                              <Td>{event.personenzahl}</Td>
                              <Td>
                                {moment(event.startDate).format("DD.MM.YYYY")} —{" "}
                                {moment(event.endDate).format("DD.MM.YYYY")}
                              </Td>
                              <Td>
                                <HStack spacing={6}>
                                  <Tooltip placement="top" label="Bearbeiten">
                                    <span>
                                      <Icon as={FaRegEdit}></Icon>
                                    </span>
                                  </Tooltip>
                                  <Tooltip placement="top" label="Löschen">
                                    <span>
                                      <Icon
                                        className="hover:cursor-pointer"
                                        as={FaRegTrashAlt}
                                        color="red.400"
                                        onClick={() => handleDelete(event.id)}
                                      ></Icon>
                                    </span>
                                  </Tooltip>
                                </HStack>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert status="info">
                    <AlertIcon />
                    keine Events vorhanden
                  </Alert>
                )}
              </div>
            </div>
            <FullCalendar
              ref={calendarRef}
              // innerRef={calendarRef}
              plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
              initialView="dayGridMonth"
              locale="deLocale"
              firstDay={1}
              height={"auto"}
              buttonText={{ today: "Heute" }}
              events={events.map((event) => {
                return {
                  title: event.beschreibung,
                  start: event.startDate,
                  // end: event.endDate,
                  end: moment(event.endDate)
                    .add(1, "days")
                    .format("YYYY-MM-DD"),
                  color: "var(--chakra-colors-gray-600)",
                };
              })}
            />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

export default Admin;
