import React, { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Search,
  Target,
  FileText,
  LucideIcon,
  MessageSquare,
  Send,
} from "lucide-react";
import { Button } from "@/Component/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/Component/ui/input";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface Message {
  sender: "user" | "ai";
  text: string;
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "hotspots", label: "Hotspot Mapping", icon: MapPin },
  { id: "predictive", label: "Predictive Models", icon: TrendingUp },
  { id: "causes", label: "Root Cause Analysis", icon: Search },
  { id: "interventions", label: "Interventions", icon: Target },
  { id: "policy", label: "Policy Briefs", icon: FileText },
];

// Simulated AI Knowledge Base for Malnutrition
const malnutritionQA: Record<string, string> = {
  "hello": "Hello! I am trained AI about malnutrition data in rwanda, How can I help you today ?",
  "what is malnutrition?": "Malnutrition refers to deficiencies, excesses, or imbalances in a person's intake of energy and/or nutrients. It covers 'undernutrition' (stunting, wasting) and 'overweight/obesity'.",
  "causes of malnutrition": "Key causes include poverty, lack of access to nutritious food, poor infant feeding practices, inadequate health services, lack of clean water, and social inequality. Conflict and climate change are also major drivers.",
  "symptoms of malnutrition": "Symptoms vary. For undernutrition, they include fatigue, dizziness, weight loss, and stunted growth in children. For micronutrient deficiencies, symptoms can be specific, like night blindness from vitamin A deficiency.",
  "how to prevent malnutrition": "Prevention involves promoting breastfeeding, ensuring access to diverse and nutritious foods, fortifying staple foods, treating severe cases with therapeutic foods, and improving access to clean water, sanitation, and healthcare.",
  "what is stunting?": "Stunting is impaired growth and development in children due to poor nutrition, repeated infection, and inadequate stimulation. It has long-term effects on health and cognitive development.",
  "what is wasting?": "Wasting, or low weight-for-height, is a sign of acute malnutrition. It often indicates recent and severe weight loss, although it can also persist for a long time. It usually occurs when a person has not had food of adequate quality and quantity and/or they have had frequent or prolonged illnesses.",
  "impact of malnutrition": "Malnutrition increases the risk of disease and premature death. It impairs physical and cognitive development, reduces productivity, and can trap individuals and communities in a cycle of poverty.",
  "who is most at risk?": "Infants, young children, pregnant and breastfeeding women, and people living in poverty or conflict zones are most vulnerable to malnutrition.",
  "define food security": "Food security means that all people, at all times, have physical, social, and economic access to sufficient, safe, and nutritious food that meets their dietary needs and food preferences for an active and healthy life.",
  "causes, effects, and solutions for malnutrition": "Causes: Poverty, lack of nutritious food, poor health services, and conflict. Effects: It leads to disease, impaired development, and traps communities in poverty. Solutions: Promoting breastfeeding, improving access to diverse foods and clean water, and providing better healthcare are key interventions.",
  "recommendations": "Key recommendations include: 1. Strengthening health systems to deliver nutrition services. 2. Promoting diverse and nutritious food production. 3. Implementing social protection programs to improve food access. 4. Investing in clean water, sanitation, and hygiene (WASH). 5. Empowering women and promoting education on nutrition.",
  // Rwanda-specific additions
  "malnutrition statistics in rwanda": "According to the latest Demographic and Health Survey (DHS 2019-20), 33% of children under 5 in Rwanda are stunted (too short for their age), 1% are wasted (too thin for their height), and 7% are underweight. While progress has been made, stunting remains a significant public health concern. For the most current data and detailed reports, please consult official sources like the National Institute of Statistics of Rwanda (NISR), the World Bank, or the DHS Program website.",
  "why is stunting high in rwanda": "High stunting rates in Rwanda are linked to several factors, including: poverty, which limits access to diverse and nutritious foods; suboptimal infant and young child feeding practices; and recurrent infections due to inadequate access to clean water, sanitation, and healthcare. Addressing these root causes is key to reducing stunting. For deeper analysis, you can search for reports on the official websites of NISR or the World Bank.",
};

const getAIResponse = (question: string): string => {
  const normalizedQuestion = question.toLowerCase().trim();

  // Handle simple greetings
  const greetings = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"];
  if (greetings.some(greeting => normalizedQuestion.startsWith(greeting))) {
    return malnutritionQA["hello"];
  }

  // Find a matching question in the knowledge base
  const matchingQuestion = Object.keys(malnutritionQA).find(key => normalizedQuestion.includes(key.replace(/[?]/g, '')));
  if (matchingQuestion) {
    return malnutritionQA[matchingQuestion];
  }

  // Fallback response if no match is found
  return "I can only answer questions specifically about malnutrition. For other topics or more detailed data, I recommend consulting official sources like the National Institute of Statistics of Rwanda (NISR), the World Bank, or the DHS Program survey website.";
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([
        {
          sender: "ai",
          text: malnutritionQA["hello"],
        },
      ]);
    } else if (!isChatOpen) {
      setMessages([]);
    }
  }, [isChatOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI responding
    setTimeout(() => {
      const aiResponseText = getAIResponse(inputValue);
      const aiMessage: Message = { sender: "ai", text: aiResponseText };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000); // Increased delay for a more realistic "thinking" time
  };

  return (
    <aside className={cn("w-64 bg-card border-r border-border p-4 flex flex-col relative", className)}>
      <div className="flex-grow">
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      {/* AI Assistant Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-4 w-80 h-[450px] bg-card border rounded-lg shadow-xl flex flex-col z-50">
          <div className="p-3 border-b">
            <h3 className="font-semibold text-center">AI Assistant</h3>
          </div>
          <div className="flex-grow p-3 overflow-y-auto pr-2 space-y-3 text-sm" style={{ scrollbarWidth: 'thin' }}>
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col">
                <div
                  className={cn(
                    "p-2 rounded-lg max-w-[90%]",
                    msg.sender === "user" ? "bg-muted self-start" : "bg-primary text-primary-foreground self-end"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-muted-foreground">AI is thinking...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t flex items-center gap-2">
            <Input
              type="text"
              placeholder="Ask a question..."
              className="flex-1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="icon" onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Chat Bubble Toggle Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-4 rounded-full h-14 w-14 shadow-lg z-50"
        onClick={() => setIsChatOpen(prev => !prev)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Footer */}
      <div className="mt-auto pt-4">
        <div className="mt-2">
          <p className="text-xs text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Zero Hunger.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;