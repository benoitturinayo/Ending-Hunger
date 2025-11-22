import { useState, useEffect, useMemo } from "react";
import HeroSection from "@/Component/nutrition/HeroSection";
import OverviewDashboard from "@/Component/nutrition/OverviewDashboard";
import MalnutritionHotspots from "@/Component/nutrition/MalnutritionHotspots";
import PredictiveModels from "@/Component/nutrition/PredictiveModels";
import RootCauseAnalysis from "@/Component/nutrition/RootCauseAnalysis";
import InterventionRecommendations from "@/Component/nutrition/InterventionRecommendations";
import PolicyBriefs from "@/Component/nutrition/PolicyBriefs";
import Sidebar from "@/Component/nutrition/Sidebar";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    document.title = "Ending Hidden Hunger";
  }, []);

  const contentMap: { [key: string]: React.ReactNode } = useMemo(() => ({
    overview: <OverviewDashboard />,
    hotspots: <MalnutritionHotspots />,
    predictive: <PredictiveModels />,
    causes: <RootCauseAnalysis />,
    interventions: <InterventionRecommendations />,
    policy: <PolicyBriefs />,
  }), []);

  const activeContent = useMemo(() => contentMap[activeTab] || <OverviewDashboard />, [activeTab, contentMap]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          <HeroSection />
          <main className="container mx-auto px-4 py-8 animate-fade-in-up flex-grow">{activeContent}</main>
          <footer className="bg-card border-t border-border mt-8 py-4">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p className="text-xs">
                Data Sources: World Bank API | HDX Rwanda | WorldPop
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
