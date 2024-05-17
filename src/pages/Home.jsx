import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { Header, Loader } from "../components";
import {
  bgImg,
  BlockByteLogo,
  landImg,
  landsImg,
  settingIcon,
} from "../assets";
import { useMoralis } from "react-moralis";
import { useStore } from "../hooks/useStore";
import {
  createWorldFunc,
  getNFTsByOwnerFunc,
} from "../utils/contractFunctionCall";

const Home = () => {
  const { isWeb3Enabled } = useMoralis();
  const [loader, setLoader] = useState(false);
  const [controlMenu, setControlMenu] = useState(false);
  const [loadGame, setLoadGame] = useState(false);
  const [worldList, setWorldList] = useState([]);
  const [newWorldMenu, setNewWorldMenu] = useState(false);
  const [worldName, setWorldName] = useState("");
  // const [worldID, setWorldID] = useState("");
  const [worldDescription, setWorldDescription] = useState("");
  const navigate = useNavigate();

  const [setActiveWorldID, setLevel] = useStore((state) => [
    state.setActiveWorldID,
    state.setLevel,
  ]);

  const createWorld = async () => {
    if (worldName && worldDescription) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      // await fetchWorld(signer);

      try {
        setLoader(true);
        const data = await createWorldFunc(signer, worldName, worldDescription);
        setActiveWorldID(data.nextToken);
        setLoader(false);
        setNewWorldMenu(false);
        navigate(`/world/${data.CID}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchWorld = async () => {
    try {
      setLoader(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setWorldList(await getNFTsByOwnerFunc(signer));
      setLoadGame(true);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="homepage">
      {newWorldMenu && (
        <div className=" absolute h-screen w-screen make-flex ">
          <div className="w-[500px]">
            <h2
              className="card-header-container text-3xl"
              style={{ background: "#A6D6ED" }}
            >
              Create World
              <div className="absolute w-[500px] -translate-x-5 -translate-y-11  text-white make-flex justify-end px-2 pt-2 ">
                <span
                  onClick={() => setNewWorldMenu(false)}
                  className="cursor-pointer"
                >
                  X
                </span>
              </div>
            </h2>
            <div className="card-content-container  z-100 min-h-[200px]  py-7 make-flex justify-start flex-col gap-3 px-7 ">
              <div className="w-full">
                <label className="">Name of World</label>
                <input
                  type="text"
                  value={worldName}
                  onChange={(e) => setWorldName(e.target.value)}
                  className="border-2 mt-1 font-mono border-black w-full px-1 text-xl h-10 rounded-md font-vt"
                />
              </div>
              <div className="w-full">
                <label>Description</label>
                <textarea
                  value={worldDescription}
                  onChange={(e) => setWorldDescription(e.target.value)}
                  className="border-2 mt-1 font-mono border-black w-full px-1 text-xl h-20 rounded-md font-vt"
                />
              </div>
              <button
                className="btn py-3 px-6 text-md bg-[#A6D6ED] text-white hover:scale-[102%]"
                onClick={() => createWorld()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {loadGame && (
        <div className="absolute h-screen w-screen make-flex">
          <div className="w-[500px]">
            <h2
              className="card-header-container text-3xl"
              style={{ background: "#A6D6ED" }}
            >
              Your Worlds
              <div className="absolute w-[500px] -translate-x-5 -translate-y-11  text-white make-flex justify-end px-2 pt-2 ">
                <span
                  onClick={() => setLoadGame(false)}
                  className="cursor-pointer"
                >
                  X
                </span>
              </div>
            </h2>
            <ul className="card-content-container  min-h-[300px] py-8 make-flex justify-start flex-col gap-3 px-7">
              {worldList && worldList.length ? (
                worldList.map(({ name, tokenId, uri }) => {
                  const tokenID = Number(tokenId);
                  return (
                    <li
                      className=" text-center w-full py-1  cursor-pointer hover:bg-[#6aa5c1] rounded"
                      key={tokenID}
                      onClick={() => {
                        setActiveWorldID(tokenID);
                        setLoadGame(false);
                        navigate(`/world/${uri}`);
                      }}
                    >
                      {name}
                    </li>
                  );
                })
              ) : (
                <li className=" text-center w-full py-1 bg-[#ececec] cursor-pointer hover:bg-[#e8e8e8]">
                  No world Created Yet
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {controlMenu && (
        <div className="absolute h-screen w-screen make-flex ">
          <div className="w-[500px]">
            <h2
              className="card-header-container text-3xl"
              style={{ background: "#A6D6ED" }}
            >
              Settings
              <div className="absolute w-[500px] -translate-x-5 -translate-y-11  text-white make-flex justify-end px-2 pt-2 ">
                <span
                  onClick={() => setControlMenu(false)}
                  className="cursor-pointer"
                >
                  X
                </span>
              </div>
            </h2>

            <ul className="z-100 card-content-container py-12 text-white font-outline-2 make-flex flex-col gap-3 ">
              <li className=" flex justify-between w-[80%] ">
                <div className="">W</div>
                <div className="">Forward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">A</div>
                <div className="">Leftward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">D</div>
                <div className="">Backward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">S</div>
                <div className="">Forward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">C</div>
                <div className="">Chatbox</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Q</div>
                <div className="">Inventory</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">E</div>
                <div className="">Setting</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">B</div>
                <div className="">Buy</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Space</div>
                <div className="">Jump</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Click</div>
                <div className="">Build</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Alt+Click</div>
                <div className="">Destroy</div>
              </li>
            </ul>
          </div>
        </div>
      )}
      <img src={bgImg} className="absolute -z-10 h-screen w-screen" />
      <Header isHome={true} />
      <div className="make-flex justify-start pt-32 w-screen h-screen flex-col gap-8">
        <img src={BlockByteLogo} className="h-20" />
        <div className="w-screen mx-auto h-[300px] make-flex gap-14">
          <div
            onClick={() => setNewWorldMenu(true)}
            className="w-[280px] h-[280px] cursor-pointer hover:scale-105"
          >
            <h2 className="card-header-container text-2xl ">Create World</h2>
            <div className="card-content-container h-[200px] make-flex">
              <img src={landImg} className="" />
            </div>
          </div>
          <div
            onClick={() => fetchWorld()}
            className="w-[280px] h-[280px] cursor-pointer hover:scale-105"
          >
            <h2 className="card-header-container text-2xl ">Load World</h2>
            <div className="card-content-container h-[200px] make-flex">
              <img src={landsImg} className="" />
            </div>
          </div>
          <div
            onClick={() => setControlMenu(true)}
            className="w-[280px] h-[280px] cursor-pointer hover:scale-105"
          >
            <h2 className="card-header-container text-2xl ">Create World</h2>
            <div className="card-content-container h-[200px] make-flex">
              <img src={settingIcon} className="" />
            </div>
          </div>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Home;
