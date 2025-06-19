import { ReactNode, useEffect, useState } from "react";
import { useTenantContext } from "@/hooks/useTenantContext";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { data, loading, error } = useTenantContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!loading) {
      timer = setTimeout(() => {
        setIsAuthChecked(true);
        setShowLoading(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  // Show loading state while checking authentication
  if (showLoading || !isAuthChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img src="/status.gif" alt="Loading..." className="h-16 w-16 mx-auto mb-4" />
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // If there's an error after auth check, show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img src="/status.gif" alt="Loading..." className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
      
        </div>
      </div>
    );
  }

  // If we have valid tenant data, render the children
  if (data) {
    return <>{children}</>;
  }

  // Fallback state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Unable to verify access. Please try again.</p>
      </div>
    </div>
  );
};

export default AuthLayout;
