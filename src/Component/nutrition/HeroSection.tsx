import { Activity, TrendingDown, Users, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero-gradient text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Ending Hidden Hunger
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-2">
             Addressing micronutrient deficiencies in Rwanda
          </p>
          <p className="text-lg opacity-80">
            Geospatial analysis, predictive models and data-driven policy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
            <Activity className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">33.1%</h3>
            <p className="text-sm opacity-90">Stunting Rate</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
            <TrendingDown className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">37.2%</h3>
            <p className="text-sm opacity-90">Anemia Prevalence</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
            <Users className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">13M+</h3>
            <p className="text-sm opacity-90">Population</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
            <MapPin className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">30</h3>
            <p className="text-sm opacity-90">Districts Analyzed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
