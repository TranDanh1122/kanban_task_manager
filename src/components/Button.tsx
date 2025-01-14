import React from "react";
const Button = React.memo(({ text, clickEvent }: { text: string, clickEvent?: () => void }): React.JSX.Element => {
    return (<>
        <button onClick={clickEvent} className="px-6 py-4 w-fit bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white m rounded-3xl">{text}</button>
    </>)
})
export default Button