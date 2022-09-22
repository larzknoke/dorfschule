import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
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
  Stack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Link,
  Center,
  Text,
  Divider,
} from "@chakra-ui/react";

export default function LoginBtn() {
  const { isOpen, onOpen: openLogin, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { user } = useAuth();
  console.log(user);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:");
    console.log(data);
  };

  if (user) {
    return (
      <>
        Angemeldet: {session.user.email} <br />
        <button onClick={() => console.log("Logout")}>Logout</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => openLogin()}>Login</button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <form onSubmit={handleLogin}>
                <Stack spacing={4}>
                  <FormControl
                    id="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  >
                    <FormLabel>Email</FormLabel>
                    <Input type="email" />
                  </FormControl>
                  <FormControl
                    id="password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  >
                    <FormLabel>Passwort</FormLabel>
                    <Input type="password" />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Angemeldet bleiben</Checkbox>
                      <Link color={"blue.400"}>Passwort vergessen?</Link>
                    </Stack>
                    <Button type="submit">Login</Button>
                  </Stack>
                </Stack>
              </form>
              <Divider orientation="horizontal" />
              <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
                <Center>
                  <Text>Login mit Google</Text>
                </Center>
              </Button>
            </Stack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
