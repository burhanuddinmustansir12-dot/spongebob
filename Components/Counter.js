'use client';

import { useState } from "react";

function Counter(props) {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");



       async function handleCounterAction(action) {
        setIsLoading(true);
        setError("");
        
        try {
            const response = await fetch("/api/Counter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                     action,
                     counterId: props.title,
                }),
            });

            if(!response.ok){
                throw new Error("Failed to update counter");
            }

            //Update local state after successful API call
            setCount((prev) => action === 'increment' ? prev + 1 : prev - 1);
        } catch (error){
            setError("Oops seems like an error occurs");
            console.error("Error updating counter:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 p-6 rounded-lg border border-gray-200 shadow-md mb-8 dark:border-gray-800">
            <h2 className="text-xl font-bold">{props.title}</h2>
            {error && (
                <div className="text-red-600 text-sm font-medium">
                    {error}
                </div>
            )}
            <div className="flex items-center gap-4">
                <button
                 onClick={() => handleCounterAction('decrement')}
                 disabled={isLoading}
                 className="w-10 h-10 rounded-full bg-red-600 text-black flex items-center justify-center hover:bg-red-350 transition-colors disabled:opacity-50"
                >
                  -
                 </button>

                <span className="mx-2">{count}</span>
                <button 
                    onClick={() => handleCounterAction('increment')}
                    disabled={isLoading}
                    className="w-10 h-10 rounded-full bg-green-600 text-black flex items-center justify-center hover:bg-green-350 disabled:opacity-50"
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default Counter;