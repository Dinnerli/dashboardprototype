import React from "react";
import { Info } from "lucide-react";
import TrendIndicator from "./TrendIndicator";

export interface StatCardProps {
  title: string;
  tooltip?: string;
  value: string | number;
  trend?: string;
  isPositive?: boolean;
  layout: "horizontal" | "stacked";
  showSideLine?: boolean;
  sideLineColor?: string; // e.g. "bg-blue-500"
  hoverEffect?: boolean;
  onClick?: () => void;
  active?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  tooltip,
  value,
  trend,
  isPositive,
  layout,
  showSideLine = false,
  sideLineColor = "bg-[#338FFF]",
  hoverEffect = false,
  onClick,
  active = false,
  icon,
  className = "",
}) => {
  // Side line
  const sideLine = showSideLine ? (
    <div className={`h-8 w-1 rounded-r ${sideLineColor} mr-3 transition-colors duration-300`} />
  ) : null;

  // Card base classes
  const baseClasses = [
    "flex",
    layout === "horizontal" ? "flex-row items-center" : "flex-col",
    "rounded-lg",
    "p-3",
    "bg-white",
    hoverEffect ? "hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer" : "",
    active ? "bg-[#F5F6F8]" : "",
    className,
  ].join(" ");

  // Title row (with optional tooltip)
  const titleRow = (
    <div className="flex items-center gap-1">
      {icon}
      <span className={`text-sm font-medium ${active ? "text-[#338FFF]" : "text-[#8C9BAC]"}`}>{title}</span>
      {tooltip && (
        <span className="group relative flex items-center">
          <Info className="w-4 h-4 text-[#8C9BAC] ml-1" stroke="#8C9BAC" />
          <span className="absolute left-1/2 -translate-x-1/2 top-7 z-10 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
            {tooltip}
          </span>
        </span>
      )}
    </div>
  );

  // Value + trend row
  const valueRow = (
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold text-[#4F5A69]">{value}</span>
      {trend !== undefined && isPositive !== undefined && (
        <TrendIndicator value={trend} isPositive={isPositive} />
      )}
    </div>
  );

  // Layouts
  let content;
  if (layout === "horizontal") {
    content = (
      <>
        {sideLine}
        {icon && <div className="mr-2 flex items-center">{icon}</div>}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">{titleRow}</div>
          {valueRow}
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className="flex items-center w-full">
          {sideLine}
          {titleRow}
        </div>
        <div className="flex items-center gap-2 mt-1">{valueRow}</div>
      </>
    );
  }

  // Wrapper for click
  if (onClick) {
    return (
      <div className={baseClasses} onClick={onClick} tabIndex={0} role="button">
        {content}
      </div>
    );
  }
  return <div className={baseClasses}>{content}</div>;
};

export default StatCard;
