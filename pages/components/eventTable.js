import React from "react";
import moment from "moment";

import {
  Box,
  Button,
  ButtonGroup,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Stack,
  HStack,
} from "@chakra-ui/react";
import EventForm from "./eventForm";

function EventTable({ events }) {
  return (
    <Stack spacing={6}>
      <EventForm />
      {events && (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Stand 26.07.2022</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Beschreibung</Th>
                <Th>Datum</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map((event) => {
                return (
                  <Tr key={event.id}>
                    <Td>{event.name}</Td>
                    <Td>{event.beschreibung}</Td>
                    <Td>
                      {moment(event.startDate).format("DD.MM.YYYY")} —{" "}
                      {moment(event.endDate).format("DD.MM.YYYY")}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

export default EventTable;
