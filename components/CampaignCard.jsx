import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  collection,
  update,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Cards = ({ campaign }) => {
  campaign.date = new Date(campaign.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-7 hover:transform hover:scale-105 transition duration-300 ease-in-out min-w-[370px]">
      <div className="relative aspect-w-3 aspect-h-2">
        <img
          src={campaign.image}
          alt={campaign.name}
          className="object-cover rounded-lg"
        />
      </div>
      <h2 className="text-2xl font-bold mt-4 text-white">{campaign.name}</h2>
      <p className="text-gray-300 mt-2">{campaign.description}</p>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-400">
            <span className="text-purple-500 font-bold">Created by:</span>
            {campaign.id.split("-")[0].slice(0, 4)}
            ...
            {campaign.id.split("-")[0].slice(-4)}
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
        <button className="bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg">
          Donate
        </button>
      </div>
    </div>
  );
};

const CampaignsList = ({ campaigns }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {campaigns.map((campaign, index) =>
        campaign["userCampaigns"].map((campaign) => (
          <Cards key={index} campaign={campaign} />
        ))
      )}
    </div>
  );
};

const CampaignCard = () => {
  const [campaigns, setCampaigns] = useState([]);

  // read data from firestore collection
  useEffect(() => {
    const data = onSnapshot(collection(db, "campaigns"), (snapshot) => {
      setCampaigns([]);
      snapshot.forEach((doc) => {
        // @ts-ignore
        setCampaigns((campaigns) => [
          ...campaigns,
          { id: doc.id, ...doc.data() },
        ]);
      });
    });

    return data;
  }, []);

  return (
    <div className=" mx-auto py-8">
      <CampaignsList campaigns={campaigns} />
    </div>
  );
};

export default CampaignCard;
