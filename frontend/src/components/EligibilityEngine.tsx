"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

interface EligibilityEngineProps {
  schemeName: string;
  rules: Record<string, any>;
  onClose: () => void;
  onApply: () => void;
}

export function EligibilityEngine({ schemeName, rules, onClose, onApply }: EligibilityEngineProps) {
  const ruleKeys = Object.keys(rules || {});
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<"pending" | "eligible" | "ineligible">("pending");
  const [ineligibleReason, setIneligibleReason] = useState<string>("");

  if (ruleKeys.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
        <div className="bg-background rounded-2xl shadow-xl w-full max-w-md p-6 relative">
          <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Special Eligibility Required</h3>
            <p className="text-muted-foreground mb-6">You can proceed directly to apply for {schemeName}.</p>
            <button onClick={() => { onClose(); onApply(); }} className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAnswer = (key: string, value: any) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    // Evaluate current rule
    const expected = rules[key];
    let isMatch = false;
    
    if (Array.isArray(expected)) {
      isMatch = expected.includes(value);
    } else {
      isMatch = expected === value;
    }

    if (!isMatch) {
      setResult("ineligible");
      setIneligibleReason(`Based on the criteria, your response for '${formatKey(key)}' does not meet the requirements for ${schemeName}.`);
      return;
    }

    if (currentStep < ruleKeys.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setResult("eligible");
    }
  };

  const formatKey = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const currentRuleKey = ruleKeys[currentStep];
  const expectedValue = rules[currentRuleKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-background rounded-2xl shadow-xl border border-border/50 w-full max-w-md overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border/50 bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">AI Eligibility Assistant</h3>
              <p className="text-xs text-muted-foreground">{schemeName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 relative min-h-[300px] flex flex-col">
          <AnimatePresence mode="wait">
            {result === "pending" && (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col justify-center"
              >
                <div className="mb-8">
                  <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">
                    Question {currentStep + 1} of {ruleKeys.length}
                  </div>
                  <h4 className="text-xl font-bold text-foreground">
                    Let's check: {formatKey(currentRuleKey)}
                  </h4>
                </div>

                <div className="space-y-3">
                  {typeof expectedValue === "boolean" ? (
                    <>
                      <button 
                        onClick={() => handleAnswer(currentRuleKey, true)}
                        className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                      >
                        <span className="font-medium">Yes, this applies to me</span>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                      <button 
                        onClick={() => handleAnswer(currentRuleKey, false)}
                        className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                      >
                        <span className="font-medium">No, it does not</span>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </>
                  ) : Array.isArray(expectedValue) ? (
                    <>
                      {expectedValue.map((opt) => (
                        <button 
                          key={opt}
                          onClick={() => handleAnswer(currentRuleKey, opt)}
                          className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                          <span className="font-medium">{opt}</span>
                          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                      <button 
                        onClick={() => handleAnswer(currentRuleKey, "Other")}
                        className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                      >
                        <span className="font-medium">Other / None of the above</span>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </>
                  ) : (
                    <input 
                      type="text"
                      className="w-full h-12 rounded-lg border border-border px-4"
                      placeholder="Enter value"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAnswer(currentRuleKey, e.currentTarget.value);
                      }}
                    />
                  )}
                </div>
              </motion.div>
            )}

            {result === "eligible" && (
              <motion.div
                key="eligible"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">Great News!</h4>
                <p className="text-muted-foreground mb-8">
                  Based on your answers, you appear to be eligible for {schemeName}.
                </p>
                <button 
                  onClick={() => { onClose(); onApply(); }}
                  className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Start Application
                </button>
              </motion.div>
            )}

            {result === "ineligible" && (
              <motion.div
                key="ineligible"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">Not Eligible</h4>
                <p className="text-muted-foreground mb-8">
                  {ineligibleReason}
                </p>
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={() => {
                      setResult("pending");
                      setCurrentStep(0);
                      setAnswers({});
                    }}
                    className="flex-1 h-12 bg-secondary text-foreground border border-border/50 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Start Over
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    View Other Schemes
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {result === "pending" && (
          <div className="p-4 bg-muted/30 border-t border-border/50">
            <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-primary h-1.5 transition-all duration-500 ease-out" 
                style={{ width: `${(currentStep / ruleKeys.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
