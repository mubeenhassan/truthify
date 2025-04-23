import { MainContent } from "@/components/sections/dashboard/main/main-content";

// Mock data generation function (simulates fetching based on lock status)
const getMockData = () => {
  const mostSearchedBase = [
    {
      id:1,
      name: "Satya Nadella",
      title: "CEO of Microsoft",
      score: 7.8,
      logo: "/icons/microsoft.svg",
      avatar: "/images/avatar-satya.png",
      isLocked: false,
    },
    {
      id:2,
      name: "Sundar Pichai",
      title: "CEO of Google",
      score: 7.1,
      logo: "/icons/google-color.svg",
      avatar: "/images/avatar-sundar.png",
      isLocked: true,
    },
    {
      id:3,
      name: "Elon Musk",
      title: "CEO of Tesla Motors",
      score: 4.6,
      logo: "/images/tesla.png",
      avatar: "/images/avatar-elon.png",
      isLocked: true,
    },
  ];

  const recentProfileData = [
    {
      id:4,
      name: "Elizabeth Holmes",
      title: "CEO of Theranos",
      score: 3.7,
      logo: "/images/theranos-logo.png",
      avatar: "/images/avatar-holmes.png",
      isLocked: false,
      report: {
        id: 1,
        title: "Report Title 1",
        speaker: "Jensen",
        source: "Youtube",
        date: "Mar 15 2025",
        customDate: "N/A",
      },
    },
  ];

  return {
    mostSearched: mostSearchedBase,
    recentProfile: recentProfileData,
    countries: [
      {
        name: "United States",
        value: 30000,
        percentage: 25.8,
        trend: "up",
        flag: "/icons/flag-us.svg",
      },
      {
        name: "Brazil",
        value: 26000,
        percentage: 16.2,
        trend: "down",
        flag: "/icons/flag-br.svg",
      },
      {
        name: "India",
        value: 22000,
        percentage: 12.3,
        trend: "up",
        flag: "/icons/flag-in.svg",
      },
      {
        name: "Australia",
        value: 17000,
        percentage: 11.9,
        trend: "down",
        flag: "/icons/flag-au.svg",
      },
    ],
    chartData:[
      40, 20, 30, 10, 50, 40, 35, 60, 5, 15, 40, 10, 55, 3, 35, 50,
      20, 55, 45, 8, 42, 18, 52, 70, 22, 44, 6, 58, 65, 19, 38, 28,
      4, 24, 68, 12, 33, 21, 26, 66,
    ],
    fallacies: [
      { name: "Argument from Authority", percentage: 78 },
      { name: "Hasty Generalization", percentage: 43 },
      { name: "False Dilemma", percentage: 52 },
      { name: "Appeal to Emotion", percentage: 66 },
    ],
    upgradeItems: [
      { name: "Politicians", icon: "/icons/politician.svg" },
      { name: "Fortune 500", icon: "/icons/fortune500.svg" },
      { name: "Influencers", icon: "/icons/influencer.svg" },
    ],
  };
};

export default function DashboardMainPage() {
  const dashboardData = getMockData();

  return (
    <div className="flex font-['Inter']">
      <main className="flex-1">
        <MainContent dashboardData={dashboardData} />
      </main>
    </div>
  );
}
