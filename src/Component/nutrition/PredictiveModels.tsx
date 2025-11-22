import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Component/ui/card";
import { Brain, TrendingUp, AlertTriangle, Target } from "lucide-react";
import { Badge } from "@/Component/ui/badge";
import { Progress } from "@/Component/ui/progress";
import { Button } from "@/Component/ui/button";

const initialModelPerformance = [
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
    features: ["Geographic location", "Climate data"],
    status: "validation",
  },
];

const initialRiskPredictions = [
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

const initialPreventionImpact = [
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

const availableIndicators = [
  { id: "rainfall", label: " Average Rainfall (Below 900 mm or Above 1,400 mm " },
  { id: "food_prices", label: "Food Price Inflation > 15%" },
  { id: "conflict", label: "Knowledge gap in the community " },
  { id: "crop_failure", label: "Major Crop Failure" },
];

const PredictiveModels = () => {
  const [modelPerformance, setModelPerformance] = useState(initialModelPerformance);
  const [riskPredictions, setRiskPredictions] = useState(initialRiskPredictions);
  const [preventionImpact, setPreventionImpact] = useState(initialPreventionImpact);
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<{ 
    riskScore: number; 
    riskLevel: string; 
    interpretation: string; 
  } | null>(null);

  const handleIndicatorChange = (indicatorId: string) => {
    setSelectedIndicators((prev) =>
      prev.includes(indicatorId)
        ? prev.filter((id) => id !== indicatorId)
        : [...prev, indicatorId]
    );
  };

  const calculateRisk = () => {
    const baseRisk = 10;
    const riskPerIndicator = 16;
    const riskScore = baseRisk + selectedIndicators.length * riskPerIndicator;

    let riskLevel = "Low";
    let interpretation = "Current conditions suggest a low probability of a malnutrition crisis.";

    if (riskScore > 70) {
      riskLevel = "High";
      interpretation = "The combination of selected indicators points to a high risk of a malnutrition crisis. Urgent preventive action is recommended.";
    } else if (riskScore > 40) {
      riskLevel = "Medium";
      interpretation = "Selected indicators suggest a moderate risk. The situation should be monitored closely.";
    }

    setSimulationResult({ riskScore, riskLevel, interpretation });
  };

  const runSimulation = () => {
    setModelPerformance(
      modelPerformance.map((model) => ({
        ...model,
        accuracy: Math.min(100, model.accuracy + (Math.random() - 0.5) * 2),
        precision: Math.min(100, model.precision + (Math.random() - 0.5) * 2),
        recall: Math.min(100, model.recall + (Math.random() - 0.5) * 2),
      }))
    );

    setRiskPredictions(
      riskPredictions.map((pred) => ({
        ...pred,
        probability: Math.min(100, pred.probability + (Math.random() - 0.4) * 5),
      }))
    );

    setPreventionImpact(
      preventionImpact.map((impact) => ({
        ...impact,
        preventionRate: Math.min(100, impact.preventionRate + (Math.random() - 0.5) * 3),
        costPerChild: Math.max(10, impact.costPerChild + (Math.random() - 0.5) * 5),
      }))
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-3xl font-bold sky-gradient-text">
            Predictive Malnutrition Models
          </h2>
          {/* <Button onClick={runSimulation} className="mt-4 sm:mt-0">
            Rerun Simulation
          </Button> */}
        </div>
        <p className="text-muted-foreground mb-6">
          Machine learning models to forecast malnutrition risk and enable early intervention
        </p>
      </section>

      {/* <section> ... Model Performance section ... </section> */}

      <section>
        <h3 className="text-2xl font-bold mb-6">Interactive Risk calculation</h3>
        <p className="text-muted-foreground mb-6">
          Select indicators to run a real-time risk for a selected district.
        </p>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h4 className="font-bold mb-4">Select Indicators</h4>
                <div className="space-y-2">
                  {availableIndicators.map((indicator) => (
                    <div key={indicator.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={indicator.id}
                        checked={selectedIndicators.includes(indicator.id)}
                        onChange={() => handleIndicatorChange(indicator.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={indicator.id} className="text-sm">
                        {indicator.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="flex flex-col h-full">
                  <Button onClick={calculateRisk} className="mb-4">
                    Calculate Risk
                  </Button>
                  {simulationResult && (
                    <div className="bg-muted rounded-lg p-4 flex-grow">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Risk Score:</span>
                          <span className="font-bold text-primary">
                            {simulationResult.riskScore.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Risk Level:</span>
                          <Badge
                            variant={
                              simulationResult.riskLevel === "High"
                                ? "destructive"
                                : simulationResult.riskLevel === "Medium"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {simulationResult.riskLevel}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground pt-2">
                          {simulationResult.interpretation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
                    <span className="text-sm font-bold">{prediction.probability.toFixed(1)}%</span>
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
                    <p className="text-2xl font-bold text-primary">${intervention.costPerChild.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Cost per child/year</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">{intervention.preventionRate.toFixed(1)}%</p>
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