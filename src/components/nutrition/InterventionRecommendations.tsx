import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Sprout, GraduationCap, Heart, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InterventionRecommendations = () => {
  const interventions = [
    {
      sector: "Health",
      icon: Heart,
      priority: "High",
      interventions: [
        {
          name: "Micronutrient Supplementation Scale-Up",
          target: "Children 6-59 months, pregnant women",
          activities: [
            "Vitamin A supplementation (6-month cycles)",
            "Iron-folic acid for pregnant women",
            "Zinc supplementation during diarrhea episodes",
            "Deworming programs (schools & communities)",
          ],
          timeline: "Immediate - 6 months",
          cost: "Low ($2.5M/year)",
          impact: "Reduce anemia by 35%, stunting by 15%",
        },
        {
          name: "Enhanced Growth Monitoring",
          target: "All children under 5",
          activities: [
            "Monthly growth tracking via community health workers",
            "Digital health record system implementation",
            "Early detection protocols for malnutrition",
            "Referral pathways to health facilities",
          ],
          timeline: "3-12 months",
          cost: "Medium ($4.2M/year)",
          impact: "80% early detection rate of malnutrition",
        },
      ],
    },
    {
      sector: "Agriculture",
      icon: Sprout,
      priority: "High",
      interventions: [
        {
          name: "Biofortified Crop Promotion",
          target: "Farming households in priority districts",
          activities: [
            "Distribute iron-rich bean seeds",
            "Promote vitamin A-enriched orange sweet potato",
            "Support zinc-enriched maize cultivation",
            "Provide technical training on biofortified crops",
          ],
          timeline: "6-18 months",
          cost: "Medium ($5.8M/year)",
          impact: "Increase micronutrient intake by 40%",
        },
        {
          name: "Kitchen Garden Programs",
          target: "50,000 rural households",
          activities: [
            "Provide vegetable seeds & training",
            "Promote small livestock (chickens, rabbits)",
            "Establish demonstration gardens",
            "Link to market opportunities",
          ],
          timeline: "6-24 months",
          cost: "Low ($3.1M/year)",
          impact: "Improve dietary diversity in 65% of households",
        },
      ],
    },
    {
      sector: "Education",
      icon: GraduationCap,
      priority: "Medium",
      interventions: [
        {
          name: "School Feeding Enhancement",
          target: "Primary schools in 15 priority districts",
          activities: [
            "Fortified porridge breakfast program",
            "Locally-sourced nutritious meals",
            "Nutrition education curriculum",
            "Home-grown school feeding initiative",
          ],
          timeline: "6-18 months",
          cost: "High ($12.5M/year)",
          impact: "Reduce stunting by 25% among school-age children",
        },
        {
          name: "Community Nutrition Education",
          target: "Mothers, caregivers, community leaders",
          activities: [
            "Mother-to-mother peer support groups",
            "Cooking demonstrations with local foods",
            "Infant & young child feeding counseling",
            "Mass media campaigns (radio, SMS)",
          ],
          timeline: "Immediate - ongoing",
          cost: "Low ($1.8M/year)",
          impact: "Improve feeding practices in 70% of households",
        },
      ],
    },
    {
      sector: "Infrastructure & Social",
      icon: Building,
      priority: "Medium",
      interventions: [
        {
          name: "WASH Infrastructure Expansion",
          target: "Rural communities in high-burden districts",
          activities: [
            "Construct protected water sources",
            "Build improved sanitation facilities",
            "Hygiene behavior change campaigns",
            "Community-led total sanitation approach",
          ],
          timeline: "12-36 months",
          cost: "High ($18.4M/year)",
          impact: "Reduce diarrheal disease by 45%",
        },
        {
          name: "Social Protection Integration",
          target: "Poorest 20% of households",
          activities: [
            "Cash transfers conditioned on health visits",
            "Food vouchers for nutrient-rich foods",
            "Link to livelihood programs",
            "Graduation model for ultra-poor",
          ],
          timeline: "6-24 months",
          cost: "High ($15.2M/year)",
          impact: "Lift 30,000 children out of severe malnutrition",
        },
      ],
    },
  ];

  const crossCutting = [
    {
      title: "Multi-Sectoral Coordination",
      description:
        "Establish district-level nutrition coordination platforms with health, agriculture, education, and local government representatives",
      actions: [
        "Quarterly coordination meetings",
        "Joint planning & budgeting",
        "Shared M&E framework",
      ],
    },
    {
      title: "Data Systems Strengthening",
      description:
        "Integrate nutrition data across sectors for real-time monitoring and adaptive management",
      actions: [
        "Unified digital data platform",
        "GIS-enabled hotspot tracking",
        "Predictive analytics dashboard",
      ],
    },
    {
      title: "Private Sector Engagement",
      description:
        "Partner with food processors for fortification scale-up and with retailers for distribution",
      actions: [
        "Public-private partnerships for fortified foods",
        "Market incentives for nutritious products",
        "Supply chain optimization",
      ],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold sky-gradient-text">Intervention Recommendations</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Evidence-based, multi-sectoral interventions targeting the root causes of malnutrition
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Sector-Specific Interventions</h3>
        <div className="space-y-8">
          {interventions.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon className="w-7 h-7 text-primary" />
                  <h4 className="text-xl font-bold">{sector.sector} Sector</h4>
                  <Badge variant={getPriorityColor(sector.priority)}>
                    {sector.priority} Priority
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sector.interventions.map((intervention, idx) => (
                    <Card key={idx} className="card-hover">
                      <CardHeader>
                        <CardTitle className="text-lg">{intervention.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Target: {intervention.target}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Key Activities:</p>
                          <ul className="space-y-1">
                            {intervention.activities.map((activity, actIdx) => (
                              <li key={actIdx} className="text-sm flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Timeline</p>
                            <p className="text-sm font-semibold">{intervention.timeline}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Annual Cost</p>
                            <p className="text-sm font-semibold">{intervention.cost}</p>
                          </div>
                        </div>

                        <div className="bg-primary/10 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Expected Impact:</p>
                          <p className="text-sm font-semibold text-primary">{intervention.impact}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Cross-Cutting Approaches</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crossCutting.map((approach, index) => (
            <Card key={index} className="card-hover bg-gradient-sky text-white">
              <CardHeader>
                <CardTitle>{approach.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm opacity-90">{approach.description}</p>
                <div>
                  <p className="text-sm font-semibold mb-2">Key Actions:</p>
                  <ul className="space-y-1">
                    {approach.actions.map((action, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card rounded-xl p-8 border-2 border-primary/20">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Users className="w-7 h-7 text-primary" />
          Implementation Strategy
        </h3>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <h4 className="font-bold text-foreground mb-2">Phase 1 (0-6 months): Quick Wins</h4>
            <p className="text-sm">
              Launch micronutrient supplementation, community nutrition education, and growth
              monitoring enhancement in 6 highest-burden districts
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Phase 2 (6-18 months): Scale-Up</h4>
            <p className="text-sm">
              Expand biofortified crops, school feeding, and kitchen garden programs to all priority
              districts. Begin WASH infrastructure projects
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Phase 3 (18-36 months): Sustainability</h4>
            <p className="text-sm">
              Institutionalize social protection integration, complete infrastructure projects,
              strengthen local capacity and financing mechanisms
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm">
              <strong className="text-foreground">Total Investment:</strong> ~$63M annually (Years
              1-3) | <strong className="text-foreground">Expected Outcome:</strong> Reduce stunting
              to &lt;25% and anemia to &lt;28% by 2027
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterventionRecommendations;
