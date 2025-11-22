import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Component/ui/card";
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/Component/ui/badge";




const OverviewDashboard = () => {
  const metrics = [
    {
      title: "Child Stunting",
      value: "33.1%",
      trend: -2.3,
      status: "improving",
      description: "Children under 5 with stunted growth",
      icon: TrendingDown,
      color: "text-orange-500",
    },
    {
      title: "Anemia in Women",
      value: "37.2%",
      trend: -1.8,
      status: "improving",
      description: "Women of reproductive age",
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      title: "Vitamin A Deficiency",
      value: "42.8%",
      trend: -3.2,
      status: "improving",
      description: "Children 6-59 months",
      icon: TrendingDown,
      color: "text-yellow-500",
    },
    {
      title: "Zinc Deficiency",
      value: "38.5%",
      trend: -2.1,
      status: "improving",
      description: "Children under 5",
      icon: TrendingDown,
      color: "text-blue-500",
    },
  ];

  const challenges = [
    {
      title: "Micronutrient Deficiencies",
      severity: "high",
      description: "Iron, Vitamin A and Zinc deficiencies remain prevalent across all provinces",
      impact: "Affects cognitive development and immune function in children",
    },
    {
      title: "Regional Disparities",
      severity: "medium",
      description: "Eastern and Northern provinces show higher stunting rates",
      impact: "Rural areas have 1.5x higher malnutrition rates than urban centers",
    },
    {
      title: "Food Security Gaps",
      severity: "medium",
      description: "Limited dietary diversity in rural households",
      impact: "Only 23% of households consume nutrient-rich foods regularly",
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-6 sky-gradient-text">
          National Nutrition Indicators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title} className="metric-card card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className={`w-8 h-8 ${metric.color}`} />
                    <Badge variant={metric.status === "improving" ? "default" : "destructive"}>
                      {metric.trend > 0 ? "+" : ""}
                      {metric.trend}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-3xl mb-2">{metric.value}</CardTitle>
                  <CardDescription className="font-semibold">{metric.title}</CardDescription>
                  <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 sky-gradient-text">
          Key Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <Card key={index} className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle
                    className={`w-6 h-6 ${
                      challenge.severity === "high" ? "text-destructive" : "text-orange-500"
                    }`}
                  />
                  <Badge variant={challenge.severity === "high" ? "destructive" : "secondary"}>
                    {challenge.severity.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle>{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Challenge:</p>
                  <p className="text-sm">{challenge.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Impact:</p>
                  <p className="text-sm">{challenge.impact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-sky rounded-xl p-8 text-white">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-10 h-10 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-2xl font-bold mb-3">Progress & Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Stunting Reduction</h4>
                <p className="text-sm opacity-90">
                  From 38% (2015) to 33.1% (2024) - a 12.8% decrease over 9 years
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Fortification Program</h4>
                <p className="text-sm opacity-90">
                  85% of households now access fortified foods through national programs
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Health Coverage</h4>
                <p className="text-sm opacity-90">
                  Community health workers reach 92% of rural populations
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Early Detection</h4>
                <p className="text-sm opacity-90">
                  Growth monitoring coverage increased from 67% to 89%
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewDashboard;
