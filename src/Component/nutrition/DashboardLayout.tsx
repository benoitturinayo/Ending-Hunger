
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-1 flex-col">
        <header className="border-b p-4"></header>
        <main className="flex-1">{children}</main>
        <footer className="p-4 text-center text-xs text-muted-foreground border-t">
          <p>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;