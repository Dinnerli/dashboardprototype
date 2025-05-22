import { FC, ReactNode } from "react";
import { CardTitle } from "@/components/ui/card";

interface CardHeaderProps {
  title: ReactNode;
  rightContent?: ReactNode;
}

const CardHeader: FC<CardHeaderProps> = ({ title, rightContent }) => (
  <div className="flex justify-between items-center w-full  border-b border-[#B3B3B3]">
    <div className="flex items-center gap-2.5 px-4 p-6 flex-1">
      <CardTitle>{title}</CardTitle>
    </div>
    <div className="flex items-center">
      {rightContent}
    </div>
  </div>
);

export default CardHeader;
