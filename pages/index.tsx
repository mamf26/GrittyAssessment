import Image from "next/image";
import React from "react";
import "../app/globals.css";

// main page
export default function Home() {
  // handles
  const [value, setValue] = React.useState<string>("");
  const [completion, setCompletion] = React.useState<string>("");

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  // POST for backend set up
  const handleOnClick = async () => {
    if (value.trim() === "") {
      // Check if input is empty or only contains spaces
      setCompletion("Please enter a valid prompt that is not empty.");
      return; // Prevent API call if input is empty
    }

    setCompletion("Loading..."); // Show loading message while waiting for response

    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: value }),
      });

      const data = await response.json();
      if (data.error) {
        setCompletion(`Error: ${data.error}`);
      } else {
        setCompletion(data.result || "No result returned from OpenAI.");
      }
    } catch (error) {
      setCompletion("An error occurred.");
      console.error("Error during API call:", error);
    }

    setValue(""); // Reset input field after submitting
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Enter a prompt:</h2>
      </div>
      <input className="px-4 py-2 border border-gray-300 rounded-md w-64 mb-4" value={value} onChange={handleInput} />
      <button className="bg-black p-3 text-white hover:bg-gray-600 rounded-full" onClick={handleOnClick}>Generate</button>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">
          Output:
          {" " + completion}
        </h2>
      </div>
    </div>
  );
}
