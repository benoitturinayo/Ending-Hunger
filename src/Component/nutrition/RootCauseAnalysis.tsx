import { Card, CardContent, CardHeader, CardTitle } from "@/Component/ui/card";
import { Search, Users, DollarSign, Home, Droplets, Book } from "lucide-react";
import { Progress } from "@/Component/ui/progress";

const RootCauseAnalysis = () => {
  const rootCauses = [
    {
      category: "Economic Factors",
      icon: DollarSign,
      impact: 82,
      causes: [
        { factor: "Poverty & low household income", contribution: 45 },
        { factor: "Food price volatility", contribution: 28 },
        { factor: "Limited livelihood opportunities", contribution: 37 },
        { factor: "Agricultural productivity challenges", contribution: 42 },
      ],
      description:
        "Economic constraints limit access to diverse, nutrient-rich foods and healthcare services",
    },
    {
      category: "Food Security",
      icon: Home,
      impact: 78,
      causes: [
        { factor: "Dietary diversity gaps", contribution: 52 },
        { factor: "Seasonal food availability", contribution: 44 },
        { factor: "Post-harvest losses", contribution: 31 },
        { factor: "Limited food storage", contribution: 36 },
      ],
      description:
        "Inadequate access to varied nutritious foods throughout the year",
    },
    {
      category: "Health & WASH",
      icon: Droplets,
      impact: 71,
      causes: [
        { factor: "Limited clean water access", contribution: 48 },
        { factor: "Poor sanitation facilities", contribution: 43 },
        { factor: "Disease burden (malaria, diarrhea)", contribution: 56 },
        { factor: "Inadequate maternal care", contribution: 39 },
      ],
      description:
        "Health challenges and WASH deficiencies impair nutrient absorption",
    },
    {
      category: "Education & Knowledge",
      icon: Book,
      impact: 65,
      causes: [
        { factor: "Low nutritional awareness", contribution: 54 },
        { factor: "Traditional feeding practices", contribution: 38 },
        { factor: "Limited health education", contribution: 47 },
        { factor: "Maternal education gaps", contribution: 51 },
      ],
      description:
        "Knowledge gaps lead to suboptimal infant feeding and care practices",
    },
    {
      category: "Geographic & Climate",
      icon: Droplets,
      impact: 63,
      causes: [
        { factor: "Climate variability", contribution: 49 },
        { factor: "Soil degradation", contribution: 41 },
        { factor: "Limited arable land", contribution: 35 },
        { factor: "Geographic isolation", contribution: 32 },
      ],
      description:
        "Environmental factors affect agricultural productivity and food availability",
    },
    {
      category: "Social & Cultural",
      icon: Users,
      impact: 58,
      causes: [
        { factor: "Gender inequality", contribution: 44 },
        { factor: "Early marriage & pregnancy", contribution: 37 },
        { factor: "Cultural food taboos", contribution: 29 },
        { factor: "Limited women's decision-making", contribution: 42 },
      ],
      description:
        "Social norms and practices influence feeding behaviors and care",
    },
  ];

  const interconnections = [
    {
      link: "Poverty → Limited Food Access",
      strength: "Strong",
      description: "Households with income <$1.90/day have 3.2x higher stunting rates",
    },
    {
      link: "Poor WASH → Disease → Malnutrition",
      strength: "Strong",
      description: "Repeated infections reduce nutrient absorption by up to 45%",
    },
    {
      link: "Low Maternal Education → Poor Child Nutrition",
      strength: "Medium",
      description: "Children of mothers with <6 years education have 2.1x higher risk",
    },
    {
      link: "Climate Shocks → Food Insecurity",
      strength: "Medium",
      description: "Drought periods correlate with 18% increase in acute malnutrition",
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold sky-gradient-text">Root Cause Analysis</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Multi-dimensional analysis of underlying factors driving stunting and micronutrient deficiencies
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Primary Contributing Factors</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rootCauses.map((cause, index) => {
            const Icon = cause.icon;
            return (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-8 h-8 text-primary" />
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{cause.impact}%</p>
                      <p className="text-xs text-muted-foreground">Impact Score</p>
                    </div>
                  </div>
                  <CardTitle>{cause.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{cause.description}</p>

                  <div className="space-y-3">
                    {cause.causes.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{item.factor}</span>
                          <span className="text-sm font-semibold">{item.contribution}%</span>
                        </div>
                        <Progress value={item.contribution} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Cause Interconnections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interconnections.map((connection, index) => (
            <Card key={index} className="card-hover bg-accent/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold">{connection.link}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          connection.strength === "Strong"
                            ? "bg-destructive/20 text-destructive"
                            : "bg-orange-500/20 text-orange-500"
                        }`}
                      >
                        {connection.strength}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{connection.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card rounded-xl p-8 border border-border">
        <h3 className="text-2xl font-bold mb-6">Key Insights from Root Cause Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-primary mb-2">Multi-Sectoral Challenge</h4>
              <p className="text-sm text-muted-foreground">
                Malnutrition stems from interconnected issues across health, agriculture, education,
                and economic sectors - requiring coordinated interventions
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">Economic Primacy</h4>
              <p className="text-sm text-muted-foreground">
                Economic factors show the highest impact score (82%), suggesting poverty reduction is
                foundational to nutrition improvements
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">Geographic Disparities</h4>
              <p className="text-sm text-muted-foreground">
                Rural districts face compounding challenges: limited infrastructure, lower income,
                reduced health access, and climate vulnerability
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-primary mb-2">Education as Leverage</h4>
              <p className="text-sm text-muted-foreground">
                Maternal education shows strong correlation with child nutrition outcomes - a key
                intervention point with long-term multiplier effects
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">WASH Integration Critical</h4>
              <p className="text-sm text-muted-foreground">
                Disease burden from poor water/sanitation undermines nutrition interventions by
                reducing nutrient absorption and increasing energy requirements
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">Climate Adaptation Needed</h4>
              <p className="text-sm text-muted-foreground">
                Climate variability increasingly threatens food security, requiring climate-smart
                agriculture and resilient food systems
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RootCauseAnalysis;
