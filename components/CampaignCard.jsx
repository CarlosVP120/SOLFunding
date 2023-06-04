import React from "react";

const Cards = ({ campaign }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="relative aspect-w-3 aspect-h-2">
        <img
          src={campaign.photo}
          alt={campaign.title}
          className="object-cover rounded-lg"
        />
      </div>
      <h2 className="text-2xl font-bold mt-4 text-white">{campaign.title}</h2>
      <p className="text-gray-300 mt-2">{campaign.description}</p>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-400">
            <span className="text-purple-500 font-bold">Created by:</span>{" "}
            {campaign.creatorWallet}
          </p>
          <p className="text-gray-400">
            <span className="text-purple-500 font-bold">Date:</span>{" "}
            {campaign.date}
          </p>
        </div>
        <div>
          <p className="text-gray-400">
            <span className="text-green-500 font-bold">Goal:</span> $
            {campaign.goal}
          </p>
          <p className="text-gray-400">
            <span className="text-green-500 font-bold">Raised:</span> $
            {campaign.raised}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 inline-block mr-2 text-blue-500"
        >
          <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        <span className="text-gray-400">Swipe up for more details</span>
      </div>
    </div>
  );
};

const CampaignsList = ({ campaigns }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {campaigns.map((campaign, index) => (
        <Cards key={index} campaign={campaign} />
      ))}
    </div>
  );
};

const CampaignCard = () => {
  const fakeCampaigns = [
    {
      photo:
        "https://www.gofundme.com/c/wp-content/uploads/2018/12/GFM-1200x628-1.png",
      title: "Animal Shelter Support Campaign",
      description: "Help provide a safe home for abandoned animals",
      date: "2021-08-01",
      creatorWallet: "0xabc123def456",
      goal: 5000,
      raised: 3500,
    },
    {
      photo:
        "https://www.gofundme.com/c/wp-content/uploads/2018/12/GFM-1200x628-1.png",
      title: "Student Scholarship Campaign",
      description:
        "Support the education of talented students and foster their development",
      date: "2021-08-01",
      creatorWallet: "0xdef789ghi012",
      goal: 10000,
      raised: 7800,
    },
    {
      photo:
        "https://www.gofundme.com/c/wp-content/uploads/2018/12/GFM-1200x628-1.png",
      title: "Reforestation Campaign",
      description: "Contribute to environmental conservation by planting trees",
      date: "2021-08-01",
      creatorWallet: "0xjkl456mno789",
      goal: 2000,
      raised: 1200,
    },
    {
      photo:
        "https://www.gofundme.com/c/wp-content/uploads/2018/12/GFM-1200x628-1.png",
      title: "Emergency Medical Campaign",
      description:
        "Help financially disadvantaged individuals receive vital medical treatment",
      date: "2021-08-01",
      creatorWallet: "0xpqr789stu012",
      goal: 8000,
      raised: 6200,
    },
    {
      photo:
        "https://www.gofundme.com/c/wp-content/uploads/2018/12/GFM-1200x628-1.png",
      title: "Support Local Entrepreneurs Campaign",
      description:
        "Promote economic development of small businesses in the community",
      date: "2021-08-01",
      creatorWallet: "0xvwx123yza456",
      goal: 3000,
      raised: 2800,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Campaigns</h1>
      <CampaignsList campaigns={fakeCampaigns} />
    </div>
  );
};

export default CampaignCard;
