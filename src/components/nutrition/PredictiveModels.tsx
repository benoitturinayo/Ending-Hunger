import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, AlertTriangle, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const PredictiveModels = () => {
  const modelPerformance = [
    {
      name: "Random Forest Classifier",
      accuracy: 87.3,
      precision: 84.6,
      recall: 89.2,
      features: ["Household income", "Education", "Health access", "Dietary diversity"],
      status: "deployed",
    },
    {
      name: "Logistic Regression",
      accuracy: 82.1,
      precision: 79.8,
      recall: 85.4,
      features: ["Geographic location", "Population density", "Climate data"],
      status: "validation",
    },
  ];

  const riskPredictions = [
    {
      district: "Kayonza",
      currentRisk: "medium",
      predictedRisk: "high",
      probability: 78.5,
      timeline: "6-12 months",
      drivers: ["Declining rainfall", "Food price inflation", "Health facility gaps"],
    },
    {
      district: "Ngororero",
      currentRisk: "medium",
      predictedRisk: "high",
      probability: 72.3,
      timeline: "9-15 months",
      drivers: ["Soil degradation", "Limited crop diversity", "Market access"],
    },
    {
      district: "Gicumbi",
      currentRisk: "medium",
      predictedRisk: "high",
      probability: 68.9,
      timeline: "12-18 months",
      drivers: ["Population growth", "Land scarcity", "Climate variability"],
    },
  ];

  const preventionImpact = [
    {
      intervention: "Fortified Food Distribution",
      costPerChild: 42,
      preventionRate: 65,
      targetPopulation: 50000,
      estimatedImpact: "Prevent 32,500 cases annually",
    },
    {
      intervention: "Community Health Worker Training",
      costPerChild: 28,
      preventionRate: 48,
      targetPopulation: 75000,
      estimatedImpact: "Prevent 36,000 cases annually",
    },
    {
      intervention: "School Feeding Programs",
      costPerChild: 156,
      preventionRate: 72,
      targetPopulation: 120000,
      estimatedImpact: "Prevent 86,400 cases annually",
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-4 sky-gradient-text">
          Predictive Malnutrition Models
        </h2>
        <p className="text-muted-foreground mb-6">
          Machine learning models to forecast malnutrition risk and enable early intervention
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Model Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modelPerformance.map((model, index) => (
            <Card key={index} className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Brain className="w-8 h-8 text-primary" />
                  <Badge variant={model.status === "deployed" ? "default" : "secondary"}>
                    {model.status}
                  </Badge>
                </div>
                <CardTitle>{model.name}</CardTitle>
                <CardDescription>Multi-factor risk assessment model</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Accuracy</span>
                      <span className="text-sm font-bold">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Precision</span>
                      <span className="text-sm font-bold">{model.precision}%</span>
                    </div>
                    <Progress value={model.precision} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Recall</span>
                      <span className="text-sm font-bold">{model.recall}%</span>
                    </div>
                    <Progress value={model.recall} className="h-2" />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Key Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {model.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Emerging Risk Predictions</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {riskPredictions.map((prediction, index) => (
            <Card key={index} className="card-hover border-2 border-orange-500/20">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  <Badge variant="secondary">EARLY WARNING</Badge>
                </div>
                <CardTitle>{prediction.district}</CardTitle>
                <CardDescription>Risk escalation predicted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Current</p>
                    <p className="text-sm font-semibold uppercase">{prediction.currentRisk}</p>
                  </div>
                  <div className="bg-orange-500/10 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Predicted</p>
                    <p className="text-sm font-semibold uppercase text-orange-500">
                      {prediction.predictedRisk}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Probability:</p>
                  <div className="flex items-center gap-2">
                    <Progress value={prediction.probability} className="h-2 flex-1" />
                    <span className="text-sm font-bold">{prediction.probability}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Timeline:</p>
                  <p className="text-sm">{prediction.timeline}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Risk Drivers:</p>
                  <ul className="space-y-1">
                    {prediction.drivers.map((driver, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{driver}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Prevention Impact Modeling</h3>
        <div className="space-y-4">
          {preventionImpact.map((intervention, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-6 h-6 text-primary" />
                      <h4 className="font-bold text-lg">{intervention.intervention}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{intervention.estimatedImpact}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">${intervention.costPerChild}</p>
                    <p className="text-xs text-muted-foreground">Cost per child/year</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">{intervention.preventionRate}%</p>
                    <p className="text-xs text-muted-foreground">Prevention rate</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold">
                      {(intervention.targetPopulation / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-muted-foreground">Target population</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-ocean rounded-xl p-8 text-white">
        <div className="flex items-start gap-4">
          <TrendingUp className="w-10 h-10 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-2xl font-bold mb-3">Model Insights</h3>
            <div className="space-y-3 text-sm opacity-90">
              <p>
                • Predictive models identify at-risk populations <strong>6-18 months</strong> before
                malnutrition onset
              </p>
              <p>
                • Early intervention can prevent <strong>65-72%</strong> of predicted malnutrition
                cases
              </p>
              <p>
                • Cost-benefit analysis shows <strong>$4.20 saved</strong> for every $1 invested in
                prevention
              </p>
              <p>
                • Geographic and socioeconomic factors account for <strong>73%</strong> of
                malnutrition variance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PredictiveModels;
