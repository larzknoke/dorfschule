import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import NextLink from "next/link";
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
  Center,
  Text,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Link,
  useToast,
} from "@chakra-ui/react";

import { FaUser } from "react-icons/fa";

export default function LoginBtn() {
  const { isOpen, onOpen: openLogin, onClose } = useDisclosure();
  const { user, login, logout, signup, providerLogin } = useAuth();

  const toast = useToast();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [doSignUp, setDoSignup] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    await signup(data.email, data.password)
      .then((data) => {
        toast({
          title: "Registrierung erfolgreich",
          description: `${data.email} erfolgreich registriert`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Ein Fehler ist aufgetreten.",
          description: `${err}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  if (user) {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FaUser />}
          variant="ghost"
        />
        <MenuList>
          <NextLink href="/admin" passHref>
            <MenuItem as="a">Admin</MenuItem>
          </NextLink>
          <MenuItem as="a" onClick={() => logout()}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }
  return (
    <>
      <span onClick={() => openLogin()}>Login</span>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{doSignUp ? "Registrieren" : "Login"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <form onSubmit={!doSignUp ? handleLogin : handleSignUp}>
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
                      {!doSignUp ? (
                        <Link onClick={() => setDoSignup(true)}>
                          Registrieren
                        </Link>
                      ) : (
                        <Link onClick={() => setDoSignup(false)}>
                          Bereits registriert?
                        </Link>
                      )}
                      {!doSignUp && <Link>Passwort vergessen?</Link>}
                    </Stack>
                    <Button type="submit">
                      {doSignUp ? "Registrieren" : "Login"}
                    </Button>
                  </Stack>
                </Stack>
              </form>
              <Divider orientation="horizontal" />
              {!doSignUp && (
                <Button
                  w={"full"}
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                  onClick={providerLogin}
                >
                  <Center>
                    <Text>Login mit Google</Text>
                  </Center>
                </Button>
              )}
            </Stack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
