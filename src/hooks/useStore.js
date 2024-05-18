import { nanoid } from "nanoid";
import create from "zustand";
import { imgData } from "../images/Items";

export const useStore = create((set) => ({
  blockTexture: "grass",
  setBlockTexture: (blockTexture) => {
    set(() => ({ blockTexture }));
  },
  cubes: [],
  getLevel: 0,
  setLevel: (toggle) => {
    set(() => ({ getLevel: toggle }));
  },
  setData: (data) => {
    if (data) {
      set(() => ({
        cubes: [...data.cubes],
        items: [...data.items],
      }));
    }
  },
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.blockTexture,
        },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  items: [],
  addItem: (x, y, z) => {
    set((prev) => ({
      items: [
        ...prev.items,
        { key: nanoid(), pos: [x, y, z], texture: prev.blockTexture },
      ],
    }));
  },
  removeItem: (x, y, z) => {
    set((prev) => ({
      items: prev.items.filter((item) => {
        const [X, Y, Z] = item.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  levelMode: false,
  setLevelMode: (toggle) => {
    set(() => ({ levelMode: toggle, cubes: [] }));
  },
  switchModal: false,
  setSwitchModal: (toggle) => {
    set(() => ({ switchModal: toggle }));
  },
  allNFTsData: [],
  setAllNFTsData: (args) => {
    if (args) {
      set(() => ({
        allNFTsData: [...args],
      }));
    }
  },
  NFTData: [],
  setNFTData: (args) => {
    // console.log(args);
    if (args) {
      const data = [];
      imgData.forEach((item1) => {
        args.forEach((item2) => {
          if (Number(item2.uri) == item1.tokenId) {
            item1.level = Number(item2.level);
            item1.uri = Number(item2.tokenId);
            data.push(item1);
          }
        });
      });
      set(() => ({
        NFTData: Array.from(new Set(data)),
      }));
    }
  },
  activeConfig: "e",
  setActiveConfig: (toggle) => {
    set(() => ({ activeConfig: toggle }));
  },
  setActiveWorldID: (toggle) => {
    set(() => ({ activeWorldID: toggle }));
  },
  infoBar: false,
  setInfoBar: (toggle) => {
    set(() => ({ infoBar: toggle }));
  },
  chatBar: false,
  setChatBar: (toggle) => {
    set(() => ({ chatBar: toggle }));
  },
  menu: true,
  setMenu: (toggle) => {
    set(() => ({ menu: toggle }));
  },
  inventoryBar: false,
  setInventoryBar: (toggle) => {
    set(() => ({ inventoryBar: toggle }));
  },

  settingMenu: false,
  setSettingMenu: (toggle) => {
    set(() => ({ settingMenu: toggle }));
  },
  shopMenu: false,
  setShopMenu: (toggle) => {
    set(() => ({ shopMenu: toggle }));
  },
}));
