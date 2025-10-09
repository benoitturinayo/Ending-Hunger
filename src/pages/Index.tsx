import { useState, useEffect } from "react";
import HeroSection from "@/components/nutrition/HeroSection";
import OverviewDashboard from "@/components/nutrition/OverviewDashboard";
import MalnutritionHotspots from "@/components/nutrition/MalnutritionHotspots";
import PredictiveModels from "@/components/nutrition/PredictiveModels";
import RootCauseAnalysis from "@/components/nutrition/RootCauseAnalysis";
import InterventionRecommendations from "@/components/nutrition/InterventionRecommendations";
import PolicyBriefs from "@/components/nutrition/PolicyBriefs";
import Sidebar from "@/components/nutrition/Sidebar";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    document.title = "Ending Hidden Hunger";
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewDashboard />;
      case "hotspots":
        return <MalnutritionHotspots />;
      case "predictive":
        return <PredictiveModels />;
      case "causes":
        return <RootCauseAnalysis />;
      case "interventions":
        return <InterventionRecommendations />;
      case "policy":
        return <PolicyBriefs />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          <HeroSection />
          <main className="container mx-auto px-4 py-8 animate-fade-in-up flex-grow">
            {renderContent()}
          </main>
          <footer className="bg-card border-t border-border mt-8 py-4">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p className="text-xs">
                Data Sources: World Bank API | HDX Rwanda | Rwanda Ministry of Health | WorldPop
              </p>
              <p className="text-xs mt-1">
                TURINAYO Benoit | turinayobenoit2@gmail.com | (+250)781653437
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
