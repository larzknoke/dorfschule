import React, { useRef, useState } from "react";
import moment from "moment";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Alert,
  Text,
  Stack,
} from "@chakra-ui/react";
import { AlertIcon } from "@chakra-ui/react";

function EventTable({ events }) {
  const { isOpen, onOpen: openEvent, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState({});

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const getEvent = (id) => {
    return events.find((event) => {
      return event.id === id;
    });
  };

  const setModal = (id) => {
    setSelectedEvent(getEvent(id));
    openEvent();
  };

  return (
    <>
      {events.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Stand {moment().format("DD.MM.YYYY")}</TableCaption>
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
                  <Tr
                    key={event.id}
                    onClick={() => setModal(event.id)}
                    className="event-row"
                  >
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
      ) : (
        <Alert status="info">
          <AlertIcon />
          keine Events vorhanden
        </Alert>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEvent.beschreibung}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>Name: {selectedEvent.name}</Text>
              <Text>
                Datum: {moment(selectedEvent.startDate).format("DD.MM.YYYY")} —{" "}
                {moment(selectedEvent.endDate).format("DD.MM.YYYY")}
              </Text>
              <Text>Personen: {selectedEvent.personenzahl}</Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Löschen
            </Button>
            <Button onClick={onClose}>Schließen</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventTable;
