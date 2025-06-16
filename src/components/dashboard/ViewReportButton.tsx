import React from 'react'

interface ViewReportButtonProps {
  target?: string;  // Format as 'admin_leaderboard.php'
}

const ViewReportButton: React.FC<ViewReportButtonProps> = ({ target }) => {

  const baseUrl = import.meta.env.VITE_BASE_URL || "https://www.layupcloud.com/";
  const site = import.meta.env.VITE_TENANT_SITE || "playground";
  const targetUrl = `${baseUrl}${target ? target : ""}?site=${site}`;
  return (
    <div className="flex items-center justify-center gap-1.5 px-0 py-1.5">
      <a href={targetUrl} target="_blank" rel="noopener noreferrer">
        <span
          className="text-xs font-medium border-b pb-1 text-[#8C9BAC] border-[#CDD1D7] font-poppins text-center cursor-pointer hover:text-[#338FFF] transition-colors"
        >
          View Report
        </span>
      </a>
    </div>
  )
}

export default ViewReportButton
