// This is a mock API service to simulate fetching user profile data

export async function getUserProfile(userId) {
  await new Promise((resolve) => setTimeout(resolve, 500));

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
    reportList: [
      {
        id: "1",
        icon: "/icons/feature-fair.svg",
        score: 4.2,
        category: "Unbias",
        description:
          "Holmes' speech exhibits a highly rehearsed and strategically persuasive tone, characteristic of someone attempting to sell a vision rather than transparently discuss facts.",
        level: 7,
      },
      {
        id: "2",
        icon: "/icons/feature-logical.svg",
        score: 6.1,
        category: "Consistent",
        description:
          "Holmes' speech demonstrates a moderate level of internal inconsistency, primarily due to contradictions in her portrayal of transparency, technology capabilities, and timeline.",
        level: 8,
      },
      {
        id: "3",
        icon: "/icons/finance.svg",
        score: 8.3,
        category: "Conceptual",
        description:
          "Holmes' speech is highly abstract, relying heavily on visionary rhetoric rather than concrete explanations of how Theranos' technology functions.",
        level: 9,
      },
      {
        id: "4",
        icon: "/icons/fortune500.svg",
        score: 5.2,
        category: "Logical",
        description:
          "Holmes' speech contains multiple logical inconsistencies, particularly in how she frames Theranos' mission versus the realities of its execution.",
        level: 8,
      },
      {
        id: "5",
        icon: "/icons/politician.svg",
        score: 5.7,
        category: "Excessive fear",
        description:
          "Holmes employs moderate exaggeration of fear, particularly in her framing of the healthcare system as fundamentally broken and inaccessible.",
        level: 8,
        negative: true,
      },
      {
        id: "6",
        icon: "/icons/security.svg",
        score: 8.6,
        category: "Overoptimism",
        description:
          "Holmes' speech contains a significant degree of exaggerated excitement, particularly in her portrayal of Theranos as a revolutionary force in healthcare.",
        level: 9,
        negative: true,
      },
      {
        id: "7",
        icon: "/icons/private-capital.svg",
        score: 7.8,
        category: "Deflection",
        description:
          "Holmes demonstrates a notable degree of deflection throughout the conversation, often shifting focus away from direct scrutiny and redirecting to emotional appeals.",
        level: 8,
        negative: true,
      },
      {
        id: "8",
        icon: "/icons/feature-aggregation.svg",
        score: 7.2,
        category: "Triangulation",
        description:
          "Holmes employs a moderate level of triangulation, frequently invoking external authorities, regulatory milestones, and high-profile endorsements to bolster credibility.",
        level: 8,
        negative: true,
      },
      {
        id: "9",
        icon: "/icons/feature-conceptual.svg",
        score: 7.9,
        category: "Formal Fallacies",
        description:
          "Holmes' speech contains multiple logical fallacies that weaken the coherence of her arguments, particularly in how she justifies Theranos' mission.",
        level: 9,
        negative: true,
      },
      {
        id: "10",
        icon: "/icons/feature-conceptual.svg",
        score: 8.2,
        category: "Informal Fallacies",
        description:
          "Holmes exhibits a significant reliance on informal fallacies, using rhetorical tactics that obscure the weaknesses in her arguments while amplifying their emotional appeal.",
        level: 9,
        negative: true,
      },
      {
        id: "11",
        icon: "/icons/feature-consistency.svg",
        score: 7.4,
        category: "Emotional Misdirection",
        description:
          "She repeatedly invokes themes of personal loss, mission-driven purpose, and an almost spiritual devotion to her work, which serves to build an emotional connection while diverting from factual scrutiny.",
        level: 8,
      },
    ],
  };
}
