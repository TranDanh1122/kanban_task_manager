import React from "react";
import { NotiContext } from "../context/NotificationContext";
import clsx from "clsx";
import { v4 } from "uuid";
import Button from "./Button";
const Modal = React.memo((): React.JSX.Element => {
    const { noti, pushNoti } = React.useContext(NotiContext)
    if (!noti.isShow) return <></>
    return (<>
        <div onClick={() => pushNoti({ type: "HIDDEN" })} className="bg-black/20 fixed top-0 left-0 w-full h-full"></div>
        <div className="flex flex-col gap-6 p-8 z-20 bg-white  w-1/3 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-lg ">
            <h2 className={clsx("l", {
                "text-[var(--red)]": noti.type == "warning",
                "text-green-400": noti.type == "success",
                "text-blue-400": noti.type == "confirm"
            })}>{noti.title}</h2>
            <p className="body-l text-[var(--medium-gray)]">
                {noti.content}
            </p>
            <div className="flex items-center justify-between">
                <Button key={v4()} text={noti.title} clickEvent={noti.handleYes} bg={noti.type == "warning" ? "red" : noti.type == "success" ? "green" : "blue"} />
                <Button key={v4()} text="Cancel" clickEvent={noti.handleNo} />

            </div>
        </div>
    </>)
})
export default Modal