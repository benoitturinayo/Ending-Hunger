import {
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Search,
  Target,
  FileText,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "hotspots", label: "Hotspot Mapping", icon: MapPin },
  { id: "predictive", label: "Predictive Models", icon: TrendingUp },
  { id: "causes", label: "Root Cause Analysis", icon: Search },
  { id: "interventions", label: "Interventions", icon: Target },
  { id: "policy", label: "Policy Briefs", icon: FileText },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, className }) => {
  return (
    <aside className={cn("w-64 bg-card border-r border-border p-4 flex flex-col", className)}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="mt-auto">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Ending Hidden Hunger
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;