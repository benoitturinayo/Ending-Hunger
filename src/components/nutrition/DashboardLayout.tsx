import React from "react";
import { NavLink } from "react-router-dom";
import { Map, BarChart2, Droplets, Wheat } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Hotspot Map", href: "/", icon: Map },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Water Access", href: "/water", icon: Droplets },
  { name: "Crop Yields", href: "/crops", icon: Wheat },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Vertical Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r bg-card text-card-foreground">
        <div className="flex h-full flex-col">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold sky-gradient-text">
              Ending Hunger
            </h1>
            <p className="text-sm text-muted-foreground">Rwanda Dashboard</p>
          </div>
          <nav className="flex-1 space-y-1 p-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-6 lg:p-8">{children}</main>
        <footer className="p-4 text-center text-xs text-muted-foreground border-t">
          <p>
            TURINAYO Benoit | turinayobenoit2@gmail.com | (+250)781653437
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;