import React from "react";
import {
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link as RouterLink } from "react-router-dom";
import { FiCalendar, FiUsers } from "react-icons/fi";

interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

interface NavItemProps {
  icon: IconType;
  children: React.ReactNode;
  to: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Calendário", icon: FiCalendar, to: "/" },
  { name: "Pessoas", icon: FiUsers, to: "/pessoas" },
];

const NavItem = ({ icon, children, to }: NavItemProps) => {
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

const SidebarContent = ({ onClose, isOpen }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      display={isOpen ? "block" : ["none", null, "block"]}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
