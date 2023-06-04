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
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  SendTransactionError,
} from "@solana/web3.js";

const SOLANA_NETWORK = "devnet";

const Cards = ({ campaign, wallet }) => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [explorerUrl, setExplorerUrl] = useState("");
  const [donate, setDonate] = useState(false);
  const [showExplore, setShowExplore] = useState("");

  useEffect(() => {
    // let key = window.localStorage.getItem("wallet");
    // setWallet(key);
    // if (key) getBalances(key);
    // if (explorerUrl) setExplorerUrl("");
    async function fetchData() {
      console.log(wallet);
      const provider = window?.phantom?.solana;
      const { solana } = window;
      let phantom;
      if (provider?.isPhantom) {
        phantom = provider;
      }

      const { publicKey } = await phantom.connect({ onlyIfTrusted: true });
      getBalances(publicKey.toString());
    }
    setTimeout(() => {
      fetchData();
    }, 1500);
    if (explorerUrl) setExplorerUrl("");
  }, []);

  const updateRaisedInDB = async (id) => {
    // find the registry in the database that contains the "id" and update the "raised" field
    const docRef = doc(db, "campaigns", id.split("-")[0]);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        let userCampaigns = docSnap.data().userCampaigns;
        for (let i = 0; i < userCampaigns.length; i++) {
          if (userCampaigns[i].id === id) {
            // add the amount to the raised field, no matter if it's 0, int or float rounded to 4 decimals
            userCampaigns[i].raised += parseFloat(amount);
            updateDoc(doc(db, "campaigns", id.split("-")[0]), {
              userCampaigns: userCampaigns,
            });
            break;
          }
        }
      }
    });
  };

  const getBalances = async (wallet) => {
    try {
      const connection = new Connection(
        clusterApiUrl(SOLANA_NETWORK),
        "confirmed"
      );
      const balance = await connection.getBalance(new PublicKey(wallet));
      const balanceInSol = balance / LAMPORTS_PER_SOL;
      setBalance(balanceInSol);
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async (reciever, amount) => {
    getBalances(wallet);
    try {
      if (balance < amount) {
        toast.error("No tienes suficientes fondos");
        return;
      }
      const provider = window?.phantom?.solana;
      const connection = new Connection(
        clusterApiUrl(SOLANA_NETWORK),
        "confirmed"
      );

      const fromPubkey = new PublicKey(wallet);
      const toPubkey = new PublicKey(reciever.split("-")[0]);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      const transactionSignature = await provider.signTransaction(transaction);

      const txid = await connection.sendRawTransaction(
        transactionSignature.serialize()
      );

      const confirmation = await connection.confirmTransaction(txid, {
        commitment: "singleGossip",
      });

      const { slot } = confirmation.value;

      console.log("Transaction confirmed at slot", slot);

      const solanaExplorerUrl = `https://explorer.solana.com/tx/${txid}?cluster=${SOLANA_NETWORK}`;
      setExplorerUrl(solanaExplorerUrl);

      toast.success("Transaction confirmed at slot " + slot);

      getBalances(wallet);

      updateRaisedInDB(reciever);
      setShowExplore(reciever);

      // clear inputs

      setAmount("");
    } catch (error) {
      console.log(error);
      toast.error("Error al enviar la transacción");
    }
  };

  const handleSend = async (reciever, amount) => {
    console.log(reciever, amount);
    sendTransaction(reciever, amount);
    setDonate(false);
  };

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
          className="object-cover rounded-lg max-h-[250px] min-w-full"
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
            <span className="text-green-500 font-bold">Goal:</span> SOL{" "}
            {campaign.goal}
          </p>
          <p className="text-gray-400">
            <span className="text-green-500 font-bold">Raised:</span> SOL{" "}
            {campaign.raised.toFixed(3)}
          </p>
        </div>
      </div>
      <div className="mt-4">
        {donate && (
          // input for the amount
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Amount in SOL"
              className="bg-white px-4 py-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60 mb-3 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent animate-appear"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )}
        {!donate ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => {
              setDonate(true);
            }}
          >
            Donate
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => {
              if (amount === "") {
                toast.error("Please enter an amount");
                return;
              } else if (amount < 0) {
                toast.error("Please enter a positive amount");
                return;
              }
              handleSend(campaign.id, amount);
            }}
          >
            Confirm
          </button>
        )}
        {showExplore === campaign.id && (
          <a
            href={explorerUrl}
            target="_blank"
            className="text-white font-bold flex flex-col mt-3"
          >
            <span className="text-green-500 font-bold">
              Transaction ready! <span className="text-white">🎉</span>{" "}
              <span className="text-blue-500">Click Here</span>
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

const CampaignsList = ({ campaigns, wallet }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {campaigns.map((campaign, index) =>
        campaign["userCampaigns"].map((campaign) => (
          <Cards key={index} campaign={campaign} wallet={wallet} />
        ))
      )}
    </div>
  );
};

const CampaignCard = ({ wallet }) => {
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
      <CampaignsList campaigns={campaigns} wallet={wallet} />
    </div>
  );
};

export default CampaignCard;
