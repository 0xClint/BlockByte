import { useStore } from "../hooks/useStore";
import { useEffect, useState } from "react";

const Menu = () => {
  const [menu, setMenu, settingMenu, setSettingMenu] = useStore((state) => [
    state.menu,
    state.setMenu,
    state.settingMenu,
    state.setSettingMenu,
  ]);
  const [controlMenu, setControlMenu] = useState(false);

  return (
    <div className="menu absolute z-10 w-screen h-screen make-flex flex-col">
      <div className="w-[500px]">
        <h2
          className="card-header-container text-3xl"
          style={{ background: "#A6D6ED" }}
        >
          Your Worlds
          <div className="absolute w-[500px] -translate-x-5 -translate-y-11  text-white make-flex justify-end px-2 pt-2 ">
            <span
              onClick={() => setSettingMenu(!settingMenu)}
              className="cursor-pointer"
            >
              X
            </span>
          </div>
        </h2>
      </div>

      <ul className="card-content-container w-[470px] h-[300px] make-flex flex-col gap-10">
        <li
          className="cursor-pointer hover:text-white"
          onClick={() => setSettingMenu(!settingMenu)}
        >
          Resume
        </li>
        <li
          className="cursor-pointer hover:text-white"
          onClick={() => setMenu(true)}
        >
          Home
        </li>
        <li
          className="cursor-pointer hover:text-white"
          onMouseOver={() => setControlMenu(true)}
          onMouseLeave={() => setControlMenu(false)}
        >
          Controls
        </li>
        <li className="cursor-pointer hover:text-white">Save</li>
      </ul>
      {controlMenu && (
        <ul className=" absolute translate-x-[420px] menu-container w-[500px] bg-[#334957] text-white py-12 make-flex flex-col gap-5 rounded-3xl">
          <li className=" flex justify-between w-[80%]">
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
      )}
    </div>
  );
};

export default Menu;
