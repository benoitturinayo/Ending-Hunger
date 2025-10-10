import { Card, CardContent, CardHeader, CardTitle } from "@/Component/ui/card";
import { FileText, Download, Users, TrendingUp } from "lucide-react";
import { Button } from "@/Component/ui/button";
import { Badge } from "@/Component/ui/badge";

const PolicyBriefs = () => {
  const policyBriefs = [
    {
      title: "Emergency Nutrition Response for Eastern Province Hotspots",
      targetAudience: "District Governors, Health Directors",
      urgency: "Immediate",
      keyMessages: [
        "Nyagatare and Gatsibo districts show critical malnutrition levels (>38% stunting)",
        "Predictive models indicate risk escalation without immediate intervention",
        "Recommended: Deploy mobile nutrition clinics and emergency food distribution",
      ],
      actions: [
        "Allocate emergency nutrition budget ($1.2M for 6 months)",
        "Deploy 50 additional community health workers",
        "Establish temporary nutrition rehabilitation centers",
      ],
      timeline: "Implementation within 30 days",
      impact: "Reach 75,000 children at risk, prevent 8,500 severe cases",
    },
    {
      title: "Scaling Biofortified Crop Adoption for Sustainable Nutrition",
      targetAudience: "Agriculture Ministry, District Agronomists",
      urgency: "High",
      keyMessages: [
        "Biofortified crops (iron beans, vitamin A sweet potato) proven effective",
        "Current coverage only 18% of target farming households",
        "Integrated approach needed: seed distribution + extension + market linkages",
      ],
      actions: [
        "Triple biofortified seed production capacity",
        "Train 1,000 farmer cooperatives on cultivation techniques",
        "Establish purchase guarantees with school feeding programs",
      ],
      timeline: "18-month rollout starting next planting season",
      impact: "Increase micronutrient intake by 40% in 250,000 households",
    },
    {
      title: "Integrating Nutrition into Social Protection Programs",
      targetAudience: "Ministry of Local Government, VUP Coordinators",
      urgency: "Medium",
      keyMessages: [
        "Poorest households face 3.2x higher malnutrition risk",
        "Cash transfer programs currently lack nutrition conditions",
        "Evidence shows conditionality increases health service uptake by 65%",
      ],
      actions: [
        "Add nutrition conditions to VUP direct support",
        "Link beneficiaries to growth monitoring and supplementation",
        "Provide nutrition education alongside livelihood training",
      ],
      timeline: "Pilot in 5 districts, scale over 24 months",
      impact: "Improve nutrition outcomes for 150,000 ultra-poor households",
    },
    {
      title: "Multi-Sectoral Nutrition Governance Strengthening",
      targetAudience: "Cabinet, District Executive Committees",
      urgency: "Medium",
      keyMessages: [
        "Malnutrition requires coordinated action across health, agriculture, education, WASH",
        "Current siloed approaches lead to fragmented, inefficient interventions",
        "Districts with strong coordination show 22% better outcomes",
      ],
      actions: [
        "Establish National Nutrition Coordination Secretariat",
        "Mandate quarterly district multi-sectoral nutrition meetings",
        "Introduce joint nutrition performance contracts",
      ],
      timeline: "Institutional setup: 6 months, full operationalization: 12 months",
      impact: "Improve coordination efficiency, reduce duplication, accelerate progress",
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Immediate":
        return "destructive";
      case "High":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold sky-gradient-text">Policy Briefs</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Evidence-based policy recommendations for local government implementation
        </p>
      </section>

      <div className="bg-gradient-ocean text-white rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <Users className="w-10 h-10 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold mb-2">Policy Brief Purpose</h3>
            <p className="text-sm opacity-90">
              These briefs translate complex data analysis into actionable policy recommendations for
              district and national decision-makers. Each brief includes situation analysis, evidence,
              recommended actions, timelines, and expected impacts to facilitate rapid decision-making.
            </p>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        {policyBriefs.map((brief, index) => (
          <Card key={index} className="card-hover">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{brief.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Target: {brief.targetAudience}</span>
                  </div>
                </div>
                <Badge variant={getUrgencyColor(brief.urgency)} className="ml-4">
                  {brief.urgency}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Key Messages
                </h4>
                <ul className="space-y-2">
                  {brief.keyMessages.map((message, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-1 font-bold">•</span>
                      <span>{message}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-accent/10 rounded-lg p-4">
                <h4 className="font-bold text-sm mb-3">Recommended Actions</h4>
                <ol className="space-y-2">
                  {brief.actions.map((action, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-primary font-bold">{idx + 1}.</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Implementation Timeline</p>
                  <p className="text-sm font-semibold">{brief.timeline}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Expected Impact</p>
                  <p className="text-sm font-semibold text-primary">{brief.impact}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Full Brief (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="bg-card rounded-xl p-8 border border-border">
        <h3 className="text-2xl font-bold mb-6">Policy Implementation Framework</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <FileText className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h4 className="font-bold mb-2">Evidence Generation</h4>
              <p className="text-sm text-muted-foreground">
                Continuous data collection and analysis to inform policy
              </p>
            </div>
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <Users className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h4 className="font-bold mb-2">Stakeholder Engagement</h4>
              <p className="text-sm text-muted-foreground">
                Multi-sectoral consultation and buy-in processes
              </p>
            </div>
            <div className="text-center p-6 bg-primary/5 rounded-lg">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h4 className="font-bold mb-2">Adaptive Management</h4>
              <p className="text-sm text-muted-foreground">
                Regular monitoring and policy adjustments based on results
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <h4 className="font-bold mb-4">Next Steps for Decision-Makers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </span>
                <p className="text-sm">
                  <strong>Review evidence:</strong> Convene stakeholders to discuss data findings and policy recommendations
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </span>
                <p className="text-sm">
                  <strong>Prioritize actions:</strong> Select interventions based on urgency, feasibility, and resource availability
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </span>
                <p className="text-sm">
                  <strong>Allocate resources:</strong> Secure budget commitments and technical support for implementation
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </span>
                <p className="text-sm">
                  <strong>Monitor & adapt:</strong> Establish M&E systems and feedback loops for continuous improvement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolicyBriefs;
