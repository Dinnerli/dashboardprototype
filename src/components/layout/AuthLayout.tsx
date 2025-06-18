import { ReactNode, useEffect, useState } from "react";
import { useTenantContext } from "@/hooks/useTenantContext";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { data, loading, error } = useTenantContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Mark auth as checked once we get a response (either success or error)
    if (!loading) {
      setIsAuthChecked(true);
    }
  }, [loading]);

  // Show loading state while checking authentication
  if (!isAuthChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
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
