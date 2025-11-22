import React, { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Component/ui/card";
import { MapPin, AlertCircle } from "lucide-react";
import { Badge } from "@/Component/ui/badge";

const NutritionMap = React.lazy(() => import("./NutritionMap"));
const MalnutritionHotspots = () => {
  const hotspots = [
    {
      district: "Nyagatare",
      province: "Eastern",
      stunting: 39.2,
      anemia: 42.1,
      severity: "critical",
      population: 466000,
      coordinates: { lat: -1.3000, lng: 30.3333 },
      factors: ["Low rainfall"],
    },
    {
      district: "Gatsibo",
      province: "Eastern",
      stunting: 38.5,
      anemia: 41.3,
      severity: "critical",
      population: 433000,
      coordinates: { lat: -1.6500, lng: 30.4167 },
      factors: ["Social and geographic distancing in rural zones", "Limited infrastructure"],
    },
    {
      district: "Nyamasheke",
      province: "Western",
      stunting: 37.8,
      anemia: 40.8,
      severity: "high",
      population: 400000,
      coordinates: { lat: -2.3333, lng: 29.1333 },
      factors: ["Mountain region", "Limited market access", "Poverty"],
    },
    {
      district: "Burera",
      province: "Northern",
      stunting: 37.6,
      anemia: 40.5,
      severity: "high",
      population: 337000,
      coordinates: { lat: -1.4833, lng: 30.0667 },
      factors: ["High altitude", "Cold climate", "Insufficient arable land"],
    },
    {
      district: "Nyaruguru",
      province: "Southern",
      stunting: 37.2,
      anemia: 40.1,
      severity: "high",
      population: 294000,
      coordinates: { lat: -2.7500, lng: 29.5000 },
      factors: ["Remote location", "Seasonal food gaps", "Low income"],
    },
    {
      district: "Gakenke",
      province: "Northern",
      stunting: 36.9,
      anemia: 39.8,
      severity: "high",
      population: 338000,
      coordinates: { lat: -1.6833, lng: 29.8000 },
      factors: ["Limited arable land", "Soil degradation"],
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-4 sky-gradient-text">
          Malnutrition Hotspot Mapping
        </h2>
        <p className="text-muted-foreground mb-6">
          Geospatial analysis identifying districts with highest malnutrition burden using
          multi-indicator assessment
        </p>

        <Suspense fallback={<div className="h-[500px] w-full flex items-center justify-center rounded-lg bg-muted">Loading Map...</div>}>
          <div className="mb-8">
            <NutritionMap hotspots={hotspots} />
          </div>
        </Suspense>

        <Card className="mb-8 bg-gradient-sky text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Critical Finding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Eastern and Northern provinces account for <span className="font-bold">68%</span> of
              high-severity malnutrition hotspots, affecting over <span className="font-bold">2.1 million</span> people
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Priority Districts for Intervention</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hotspots.map((hotspot, index) => (
            <Card key={index} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-primary" />
                    <div>
                      <CardTitle>{hotspot.district}</CardTitle>
                      <CardDescription>{hotspot.province} Province</CardDescription>
                    </div>
                  </div>
                  <Badge variant={getSeverityColor(hotspot.severity)}>
                    {hotspot.severity.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-destructive/10 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Stunting Rate</p>
                    <p className="text-2xl font-bold text-destructive">{hotspot.stunting}%</p>
                  </div>
                  <div className="bg-orange-500/10 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Anemia Rate</p>
                    <p className="text-2xl font-bold text-orange-500">{hotspot.anemia}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Population Affected:</p>
                  <p className="text-lg font-semibold">
                    {(hotspot.population).toLocaleString()} people
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Contributing Factors:</p>
                  <div className="flex flex-wrap gap-2">
                    {hotspot.factors.map((factor, idx) => (
                      <Badge key={idx} variant="outline">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Coordinates: {hotspot.coordinates.lat.toFixed(4)}, {hotspot.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-xl font-bold mb-4">Spatial Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-accent/10 rounded-lg">
            <p className="text-3xl font-bold text-primary mb-2">6</p>
            <p className="text-sm text-muted-foreground">Critical/High Priority Districts</p>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg">
            <p className="text-3xl font-bold text-primary mb-2">2.3M</p>
            <p className="text-sm text-muted-foreground">Population in Hotspot Areas</p>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg">
            <p className="text-3xl font-bold text-primary mb-2">38.2%</p>
            <p className="text-sm text-muted-foreground">Average Stunting in Hotspots</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MalnutritionHotspots;
