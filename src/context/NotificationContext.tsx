import React from "react"
interface Notification {
    title: string,
    content: string,
    type: "warning" | "confirm" | "success",
    handleYes?: () => void,
    handleNo?: () => void
    isShow: boolean,
}
const initData: Notification = {
    title: "",
    content: "",
    isShow: false,
    type: "warning"
}

type NotiActionType = { type: "SHOW", payload: Notification } | { type: "HIDDEN" }
const notiReducer = (noti: Notification, action: NotiActionType) => {
    switch (action.type) {
        case "SHOW": return { ...noti, ...action.payload, isShow: true }
        case "HIDDEN": return { ...noti, isShow: false }
    }
}
export const NotiContext = React.createContext<{ noti: Notification, pushNoti: React.Dispatch<NotiActionType> }>({ noti: initData, pushNoti: () => { } })
export default function NotiProvider({ children }: { children: React.ReactNode }) {
    const [noti, pushNoti] = React.useReducer(notiReducer, initData)
    return <NotiContext.Provider value={{ noti, pushNoti }}>{children}</NotiContext.Provider>
} 