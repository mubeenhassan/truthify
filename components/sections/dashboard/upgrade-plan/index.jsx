"use client";
import React from "react";
import PricingCards from "./pricing-cards";

const UpgradePlan = () => {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Upgrade to a plan that&apos;s right for you
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-Powered Integrity Analysis
        </p>
      </div>
      <PricingCards />
    </section>
  );
};

export default UpgradePlan;
