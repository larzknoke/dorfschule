import { useRef, useState } from "react";
import moment from "moment";
import { db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

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

  const dbEvents = collection(db, "events");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      beschreibung: beschreibung,
      personenzahl: personenzahl,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
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
              <Input
                ref={initialRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
            <FormControl mt={4} className="DatePicker">
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
            <Button onClick={handleSubmit} colorScheme={"green"}>
              Speichern
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventForm;
