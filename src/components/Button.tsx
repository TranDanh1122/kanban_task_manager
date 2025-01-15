import React from "react";
const Button = React.memo(({ text, clickEvent, width, bg }: { text: string, clickEvent?: () => void, width?: string, bg?: string }): React.JSX.Element => {
    return (<>
        <button onClick={(e: React.MouseEvent) => { e.preventDefault(); clickEvent?.() }} style={{
            width: width ?? "fit-content",
            backgroundColor: bg
        }} className="px-6 mb:px-3 py-4 mb:py-2 w-fit bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white m rounded-3xl">{text}</button>
    </>)
})
export default Button