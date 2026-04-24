export const pricingData = [
  {
    name: "Basic",
    price: 29,
    period: "month",
    features: [
      "Access to all basic courses",
      "Community support",
      "10 practice projects",
      "Course completion certificate",
      "Basic code review"
    ],
    userLimit: 1,
    support: "Email support",
    integrations: ["Zoom"],
    trialPeriod: "7 days free trial",
    mostPopular: false
  },
  {
    name: "Pro",
    price: 79,
    period: "month",
    features: [
      "Access to all Pro courses",
      "Priority community support",
      "30 practice projects",
      "Course completion certificate",
      "Advanced code review",
      "1-on-1 mentoring sessions",
      "Job assistance"
    ],
    userLimit: 5,
    support: "Priority email + chat support",
    integrations: ["Zoom", "Slack", "GitHub"],
    trialPeriod: "14 days free trial",
    mostPopular: true
  },
  {
    name: "Enterprise",
    price: 199,
    period: "month",
    features: [
      "Access to all courses",
      "Dedicated support",
      "Unlimited projects",
      "Course completion certificate",
      "Premium code review"
    ],
    userLimit: 50,
    support: "Dedicated account manager",
    integrations: ["Zoom", "Slack", "GitHub", "Jira"],
    branding: true,
    trialPeriod: "Custom trial available",
    mostPopular: false
  }
];
