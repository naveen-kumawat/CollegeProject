import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import { Loader } from '../components';
function TextForm({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [typedData, setTypedData] = useState({}); // State variable for typed data
  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);
  };

  const fetchText = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searchText,
      }),
    });

    if (response.ok) {
      setData(await response.json());
    }
    setLoading(false);
  };

  //   useEffect(() => {
  //     document.addEventListener(
  //       "keydown",
  //       (event) => {
  //         var name = event.key;
  //         var code = event.code;
  //         // Alert the key name and key code on keydown
  //         if (name === "Enter") {
  //           console.log(searchText);
  //           fetchText();
  //         } else return;
  //       },
  //     );
  //     return () =>
  //       document.removeEventListener("keydown", () => {
  //         console.log("removed");
  //       });
  //   }, []);

  //start

  useEffect(() => {
    // Typing animation effect
    const typingEffect = async () => {
      setLoading(true);

      // Delay between each character
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // Loop through each key in the data and simulate typing effect
      for (const key of Object.keys(data)) {
        let typedText = "";

        // Loop through each character of the value and append it to the typedText
        for (const char of data[key]) {
          typedText += char;
          setTypedData((prevState) => ({ ...prevState, [key]: typedText }));
          await delay(50); // Adjust typing speed by changing the delay value
        }
      }

      setLoading(false);
    };

    typingEffect();
  }, [data]); // Run the effect whenever the data changes


  //end
  return (
    <section className="max-w-7xl mx-auto">

      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The College Project Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through a collection of Data generated by AI</p>
      </div>


      <div className="mt-16">
      <div className="flex items-center justify-between "> 
        <div className="formfiledtext w-11/12">

          <FormField labelName="Search Text" type="text" name="text" placeholder="Search something..." value={searchText} handleChange={handleSearchChange} />
          </div>
          <button className="font-inter justify-center mr-0 top-10 mt-6 font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md" type="submit" onClick={fetchText}>Submit</button>

        </div>


        {loading && (
          <div className="inset-0 z-0 flex justify-center items-center bg-[rgba(249, 250, 254, 0.5)] rounded-lg py-10">
            <Loader />
          </div>
        )}

        <div className="textoutput" >
        {Object.keys(typedData)?.map((key) => {
            return (
              <div key={key}>
                <h1>{key}</h1>
                <pre className="code text">{typedData[key]}</pre>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default TextForm;
