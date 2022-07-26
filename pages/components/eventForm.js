import { useRef, useState } from "react";
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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { DateRangePicker } from "react-dates";

function EventForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [personenzahl, setPersonenzahl] = useState("");
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState(null);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen} alignSelf="start">
        neuen Termin eintragen
      </Button>
      {/* <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Neues Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Beschreibung</FormLabel>
              <Textarea size={"sm"} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Personenanzahl</FormLabel>
              <NumberInput min={1} precision={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Datum</FormLabel>
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Abrechen
            </Button>
            <Button colorScheme={"green"}>Speichern</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventForm;
