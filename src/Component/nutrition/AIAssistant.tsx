import React, { useState } from "react";

const AIAssistant: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer("");

    // Simulate fetching an answer from an AI
    setTimeout(() => {
      const simulatedAnswer = `This is a simulated answer to your question: "${question}"

Here is a code snippet:
<pre><code>function helloWorld() {
  console.log("Hello, World!");
}</code></pre>`;
      setIsLoading(false);
    }, 2000);
  };
};

export default AIAssistant;