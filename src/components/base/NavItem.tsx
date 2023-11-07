import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  IconButton,
  useColorModeValue,
  HStack,
  FlexProps,
  MenuItem,
  Menu,
  MenuButton,
  Avatar,
  Box,
  MenuList,
  Icon,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { LinkItemProps } from "../../Types/LinkItem";

const NavItem = ({ icon, children, to, isExpandable }: LinkItemProps) => {
  return (
    <RouterLink to={to} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#2C3E50",
          color: "white",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </RouterLink>
  );
};

export default NavItem;
