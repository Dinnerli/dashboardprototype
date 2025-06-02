import { FC, ReactNode } from "react";
import { CardTitle } from "@/components/ui/card";

interface CardHeaderProps {
  title: ReactNode;
  rightContent?: ReactNode;
}

const CardHeader: FC<CardHeaderProps> = ({ title, rightContent }) => (
  <div className="flex flex-row justify-between pb-4 sm:pb-6 items-start sm:items-center w-full border-b border-[#B3B3B3]">
  <div className="flex items-start sm:items-center gap-2.5 px-4  flex-1">
    <CardTitle>{title}</CardTitle>
  </div>
    <div className="flex items-center">
      {rightContent}
    </div>
  </div>
);

export default CardHeader;
