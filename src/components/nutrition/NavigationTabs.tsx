import { Button } from "@/components/ui/button";
import { Home, Map, Brain, Search, Target, FileText } from "lucide-react";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationTabs = ({ activeTab, setActiveTab }: NavigationTabsProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "hotspots", label: "Hotspot Mapping", icon: Map },
    { id: "predictive", label: "Predictive Models", icon: Brain },
    { id: "causes", label: "Root Causes", icon: Search },
    { id: "interventions", label: "Interventions", icon: Target },
    { id: "policy", label: "Policy Briefs", icon: FileText },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto py-4 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id ? "" : "hover:bg-accent/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavigationTabs;
