import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "./components/header";
import ProtectedRoute from "./components/ProtectedRoute";
import { getEvents } from "../lib/events";
import moment from "moment";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

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
} from "@chakra-ui/react";

function Admin() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const events = await getEvents();
    setEvents(events);
  }

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
        <div className="md:p-20 p-12 text-slate-700 ">
          <h1>Alle Events</h1>
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
                            <Icon as={FaRegEdit}></Icon>
                            <Icon
                              as={FaRegTrashAlt}
                              color="red.400"
                              onClick={() => console.log("Icon Click")}
                            ></Icon>
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
      </main>
    </ProtectedRoute>
  );
}

export default Admin;
