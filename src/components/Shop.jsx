import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useStore } from "../hooks/useStore";
import * as imgSrc from "../images/Items/index";
import Loader from "./Loader";
import { createItemFunc, mintitemNFTFunc } from "../utils/contractFunctionCall";

const Shop = () => {
  const [setShopMenu, allNFTsData, NFTData] = useStore((state) => [
    state.setShopMenu,
    state.allNFTsData,
    state.NFTData,
  ]);

  const [loader, setLoader] = useState(false);
  const [buyMenu, setBuyMenu] = useState(false);
  const [buyNFTdata, setBuyNFTData] = useState("");

  useEffect(() => {
    const filterNFTs = () => {
      const data = allNFTsData;
      data.filter((item1) => NFTData.some((item2) => item1.cid == item2.cid));
      console.log(data);
    };
    filterNFTs();
  }, [NFTData]);

  const buyItemNFT = async (tokenId, name) => {
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    await createItemFunc(signer, tokenId.toString(), name, "demo");
    setLoader(false);
    setBuyMenu(false);
  };

  return (
    <div className="card-box absolute z-100 make-flex w-screen h-screen">
      {buyMenu && (
        <div className="menu absolute z-10 make-flex w-screen h-screen bg-[#2d2d2d84]">
          <div className="w-[500px]">
            <h2
              className="card-header-container text-3xl"
              style={{ background: "#A6D6ED" }}
            >
              {buyNFTdata?.texture}
              <div className="absolute w-[500px] -translate-x-5 -translate-y-11  text-white make-flex justify-end px-2 pt-2 ">
                <span
                  className="cursor-pointer"
                  onClick={() => setBuyMenu(false)}
                >
                  X
                </span>
              </div>
            </h2>

            <div className="card-content-container w-[95%]  make-flex justify-start flex-col gap-5  p-5 ">
              <div className="w-full h-[170px] make-flex gap-10">
                <div className="w-[180px] h-full  bg-[#EB91F9] make-flex rounded-lg">
                  <img
                    src={buyNFTdata.src[0]}
                    alt="landImg"
                    className="h-[60%] "
                  />
                </div>
                <div className="w-1/2 h-full grid pt-8 grid-cols-2 gap-3 font-outline-2 text-white">
                  <ul className="flex flex-col gap-3">
                    <li>level</li>
                    <li>type</li>
                    <li>color</li>
                  </ul>
                  <ul className="flex flex-col gap-3">
                    <li>0</li>
                    <li>grass</li>
                    <li>green</li>
                  </ul>
                </div>
              </div>
              <div className="w-full make-flex justify-between my-2">
                <div className="btn  py-2 px-3 border-2 border-black make-flex rounded-md bg-[#19B294] text-lg w-[160px]">
                  10k Wei
                </div>
                <button
                  className="btn w-[100px] make-flex bg-[#5789C4] hover:scale-105"
                  onClick={() =>
                    buyItemNFT(buyNFTdata?.tokenId, buyNFTdata?.texture)
                  }
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className=" min-w-[600px] max-w-[1100px]">
        <h2
          className="card-header-container text-3xl"
          style={{ background: "#A6D6ED" }}
        >
          Marketplace
          <div className="absolute w-[1000px] -translate-x-5 -translate-y-11  text-white make-flex justify-end px-2 pt-2 ">
            <span className="cursor-pointer" onClick={() => setShopMenu(false)}>
              X
            </span>
          </div>
        </h2>
        <div
          style={{ width: "97%" }}
          className="card-content-container flex h-auto min-h-[400px] gap-7 p-4"
        >
          <div className="right-menu w-full flex justify-center flex-wrap gap-4">
            {imgSrc.imgData.map(({ texture, src, isOpen, tokenId, color }) => {
              return (
                <div
                  key={tokenId}
                  onClick={() => {
                    setBuyNFTData({
                      texture,
                      src,
                      tokenId,
                    });
                    setBuyMenu(true);
                  }}
                  className="w-[180px] h-[180px] cursor-pointer rounded-xl flex bg-[#253844] border-2 border-black flex-col gap-1  justify-end p-2 pt-2 items-center shadow-xl hover:scale-[101%]"
                >
                  <div className="flex justify-between w-full px-1 text-xs">
                    <h3 className=" w-full text-white font-outline-2">
                      {texture}
                    </h3>
                    <button className="font-light text-[0.8rem] px-1 bg-[#50BA4A] rounded-lg">
                      level0
                    </button>
                  </div>
                  <div
                    className="w-full  h-[150px] make-flex flex-col rounded-xl"
                    style={{ backgroundColor: color }}
                  >
                    <img
                      src={src[0]}
                      alt="landImg"
                      className="w-[60%] h-auto -translate-y-5"
                    />
                  </div>
                  <div className="absolute w-[125px] py-1 px-3 font-medium text-xs bg-[#eb5a79] border-2 border-black rounded-2xl flex justify-between -translate-y-2 text-white">
                    <span>price</span>
                    <span>10k Wei</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Shop;
