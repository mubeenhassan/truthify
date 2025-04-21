// This is a mock API service to simulate fetching user profile data
// In a real application, this would make actual API calls

export async function getUserProfile(userId) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data for Elizabeth Holmes
  return {
    info: {
      id: userId,
      name: "Elizabeth Holmes",
      title: "CEO",
      companyName: "Therenos",
      profileImage: "/images/avatar-holmes.png",
      companyLogo: "/images/theranos-logo.png",
      integrityScore: 3.7,
      totalReports: 126,
      comparativeScorePercent: 12.7,
    },
    reports: [
      {
        id: 1,
        title: "The Future of AI: Innovations and Challenges",
        speaker: "Elon Musk",
        source: "YouTube",
        date: "2022-05-12",
        customDate: "May 12, 2022",
        isLocked: false,
      },
      {
        id: 2,
        title: "Tech Giants: Who Will Dominate in 2025?",
        speaker: "Sundar Pichai",
        source: "Vimeo",
        date: "2023-02-18",
        customDate: "Feb 18, 2023",
        isLocked: false,
      },
    ],
    fallacies: [
      {
        id: "f1",
        title:
          "Interview : Theranos’s Elizabeth Holmes on the Lifeblood of the Internet - FULL CONVERSATION",
        thumbnailUrl: "/images/fallacy-thumb-1.png",
        platformIconUrl: "/icons/youtube.svg",
        date: "13 Oct 2015",
        conclusion: "Conclusion and Number of Fallacies: 9",
        count: 9,
        tags: [
          "Non Sequitur",
          "Circular Reasoning",
          "Affirming the Consequent",
          "Appeal to Novelty",
          "False Dichotomy",
          "Cherry Picking",
          "Oversimplification",
        ],
      },
      {
        id: "f2",
        title:
          "Interview :Jonathan Zittrain in conversation with Elizabeth Holmes",
        thumbnailUrl: "/images/fallacy-thumb-2.png",
        platformIconUrl: "/icons/youtube.svg",
        date: "12 Oct 2018",
        conclusion: "Conclusion and Number of Fallacies: 8",
        count: 8,
        tags: [
          "Non Sequitur",
          "Circular Reasoning",
          "Appeal to Authority",
          "Undistributed Middle",
        ],
      },
      {
        id: "f3",
        title:
          "Interview :Jonathan Zittrain in conversation with Elizabeth Holmes",
        thumbnailUrl: "/images/fallacy-thumb-3.png",
        platformIconUrl: "/icons/youtube.svg",
        date: "12 Oct 2018",
        conclusion: "Conclusion and Number of Fallacies: 8",
        count: 8,
        tags: [
          "Non Sequitur",
          "Circular Reasoning",
          "Appeal to Authority",
          "Undistributed Middle",
        ],
      },
    ],
  };
}
