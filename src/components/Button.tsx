import React from "react";
const Button = React.memo(({ text, clickEvent, width }: { text: string, clickEvent?: () => void, width?: string }): React.JSX.Element => {
    return (<>
        <button onClick={(e: React.MouseEvent) => { e.preventDefault(); clickEvent?.() }} style={{ width: width ?? "fit-content" }} className="px-6 py-4 w-fit bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white m rounded-3xl">{text}</button>
    </>)
})
export default Button