import { useTenantContext } from "@/hooks/useTenantContext";
import { useState } from 'react';
const Header = () => {
  const { data, loading } = useTenantContext();

  return <header className="animate-fade-in max-w-full">
    <div className="flex flex-col w-full">


      <div className="max-w-full h-auto p-2 flex justify-between border-b m-2">
        <div>
          {/* Tenant Logo */}
            {loading ? (
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
            ) : (
            <img
              src={data?.tenantLogoUrl || "/layup_logo.png"}
              alt={data?.tenantName || "Tenant Logo"}
              className="h-8"
              onError={(e) => {
              e.currentTarget.src = "/layup_logo.png";
              }}
            />
            )}
        </div>
        <div className='flex items-center  gap-6'>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 mr-2 sm:mr-3 overflow-hidden">
            {/* User Avatar */}
            {loading ? (
              <div className="w-full h-full bg-gray-300 animate-pulse" />
            ) : (
              <img
                src={data?.userImage || `https://i.pravatar.cc/150?img=11`}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  </header>;
};
export default Header;