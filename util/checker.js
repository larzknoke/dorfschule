import React from "react";
import { Icon } from "@chakra-ui/icons";
import { FaCheck, FaTimes } from "react-icons/fa";

function Checker({ boolean }) {
  return (
    <>{boolean ? <Icon as={FaCheck}></Icon> : <Icon as={FaTimes}></Icon>}</>
  );
}

export default Checker;
