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
} from "@chakra-ui/react";
import { AlertIcon } from "@chakra-ui/react";

function EventTable({ events }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const setModal = (e) => {
    console.log(isOpen);
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
                  <Tr key={event.id} onClick={setModal} className="event-row">
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Test</p>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Schließen</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventTable;
