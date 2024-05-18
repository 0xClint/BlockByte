import React, { useEffect, useState } from "react";
import { imgData } from "../images/Items/index";
import { useStore } from "../hooks/useStore";
import Loader from "./Loader";
import { ethers } from "ethers";
import {
  createCustomItemFunc,
  getItemsByOwnerFunc,
  getNextItemIDFunc,
} from "../utils/contractFunctionCall";
import { uploadFile } from "../utils/lightouse";

const Inventory = () => {
  const [setBlockTexture, setInventoryBar, NFTData] = useStore((state) => [
    state.setBlockTexture,
    state.setInventoryBar,
    state.NFTData,
  ]);
  const [loader, setLoader] = useState(false);
  const [itemName, setItemName] = useState("");
  const [customNFTData, setCustomNFTData] = useState(null);
  const [customMenu, setCustomMenu] = useState(false);
  const [itemDescription, setItemDescription] = useState("");

  // useEffect(() => {
  //   const getCUstomNFTData = async () => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = provider.getSigner();
  //     setCustomNFTData(await getItemsByOwnerFunc(signer));
  //   };
  //   getCUstomNFTData();
  // }, []);

  // const createCustomItem = async () => {
  //   if (itemName && itemDescription) {
  //     setLoader(true);
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = provider.getSigner();
  //     console.log(itemDescription);
  //     const CID = await uploadFile(itemDescription);

  //     await createCustomItemFunc(signer, itemName, CID);
  //     setLoader(false);
  //     setCustomMenu(false);
  //     setInventoryBar(false);
  //   }
  // };

  console.log(NFTData);

  return (
    <div className="card-box absolute z-1 make-flex w-screen h-screen">
      <div className=" w-[800px]">
        <h2
          className="card-header-container text-3xl"
          style={{ background: "#A6D6ED" }}
        >
          Inventory | Items owned
          <div className="absolute w-[800px] -translate-x-5 -translate-y-11  text-white make-flex justify-end px-2 pt-2 ">
            <span
              className="cursor-pointer"
              onClick={() => setInventoryBar(false)}
            >
              X
            </span>
          </div>
        </h2>

        <div
          className="card-content-container flex h-auto min-h-[300px] justify-start  items-center flex-wrap gap-3 p-3"
          style={{ width: "95%" }}
        >
          {NFTData.map(({ texture, src, isOpen, color, level }) => {
            return (
              <div
                key={texture}
                onClick={() => {
                  if (isOpen) {
                    setBlockTexture(texture);
                  }
                }}
                className="w-[180px] h-[330px] cursor-pointer rounded-xl flex bg-[#253844] border-2 border-black flex-col gap-1  p-2 pt-2 items-center shadow-xl"
              >
                <h3 className=" w-full text-center text-white font-outline-2">
                  {texture}
                </h3>

                <div
                  className="w-full  h-[130px] make-flex flex-col rounded-xl"
                  style={{ backgroundColor: color }}
                >
                  <img
                    src={src[level - 1]}
                    alt="landImg"
                    className="w-[60%] h-auto -translate-y-5"
                  />
                </div>

                <div className="w-[90%] py-2 grid grid-cols-2 gap-3 font-outline-2 text-white">
                  <ul className="flex flex-col gap-3">
                    <li>level</li>
                    <li>type</li>
                    <li>color</li>
                  </ul>
                  <ul className="flex flex-col gap-3">
                    <li>{level}</li>
                    <li>grass</li>
                    <li>green</li>
                  </ul>
                </div>
                <button className="btn bg-[#19B294] hover:scale-105">
                  Level Up
                </button>
              </div>
            );
          })}

          {/* {customNFTData && (
            <div
              className={`w-[120px] h-[140px] rounded-xl flex flex-col gap-1 border-2 bg-[#6b2b19] border-[#41190e] justify-end p-2 pt-2 items-center shadow-xl  hover:scale-[101%]`}
            >
              <div className="flex justify-between w-full">
                <h3 className=" text-xs">{customNFTData.name}</h3>
                <h3 className="text-xs bg-green-600 rounded px-1">custom</h3>
              </div>
              <div className="w-[105px]  h-[150px] make-flex justify-end flex-col bg-[#ead04e] rounded-xl">
                <img
                  src={`https://gateway.lighthouse.storage/ipfs/${customNFTData.description}`}
                  className="w-[70%]"
                />
              </div>
            </div>
          )} */}
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Inventory;
