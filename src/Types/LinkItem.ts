import { IconType } from "react-icons";

export interface LinkItemProps {
  name?: string;
  icon: IconType;
  to: string;
  isExpandable?: boolean;
  children?: React.ReactNode;
}
