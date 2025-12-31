'use client';

import { useState } from "react";

function Counter(props) {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center gap-4 p-6 rounded-lg border border-gray-200 shadow-md mb-8 dark:border-gray-800">
            <h2 className="text-xl font-bold">{props.title}</h2>
            <div className="flex items-center gap-4">
                <button
                 onClick={() => setCount(count - 1)}
                 className="w-10 h-10 rounded-full bg-red-600 text-black flex items-center justify-center hover:bg-red-350 transition-colors"
                >
                  -
                 </button>

                <span className="mx-2">{count}</span>
                <button onClick={() => setCount(count + 1)} className="w-10 h-10 rounded-full bg-green-600 text-black flex items-center justify-center hover:bg-green-350">+</button>
            </div>
        </div>
    )
}

export default Counter;