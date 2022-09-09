import { useRef, useState } from "react";
import moment from "moment";
import { db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

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

function EventForm({ fetchEvents }) {
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
  const toast = useToast();

  const handleSubmit = async () => {
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

      toast({
        title: "Event gespeichert.",
        description: "Das Event wurde erfolgreich angelegt.",
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      fetchEvents();
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
            <form
              id="new-event"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
                onClose();
              }}
            >
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
                <Textarea
                  value={beschreibung}
                  onChange={(e) => setBeschreibung(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Personenanzahl</FormLabel>
                <NumberInput
                  min={1}
                  precision={0}
                  value={personenzahl}
                  onChange={(value) => setPersonenzahl(value)}
                >
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
            </form>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Abrechen
            </Button>
            <Button
              // onClick={handleSubmit}
              colorScheme={"green"}
              type="submit"
              form="new-event"
            >
              Speichern
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventForm;
