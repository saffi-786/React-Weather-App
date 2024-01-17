import { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import search_btn from "./assets/search.png";
import useInfo from "./Hooks/useInfo";
import ResultBox from "./Components/ResultBox";

const ApiKey = "f8be4780b627bb353c930660784cec53";

function App() {
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const weatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${ApiKey}&units=metric&q=${inputRef.current.value}`;

    setLoading(true);

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);

        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        }
        setShowWeather(
          weatherTypes.filter((weather) => {
            return weather.type === data.weather[0].main;
          })
        );
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-800 h-screen grid place-items-center gap-1 font-[Salsa]">
      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-between gap-3">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter Your Location"
            className="text-xl border-none p-2 font-semibold uppercase flex-1"
          />
          <button>
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="..."
              className="w-8"
              onClick={fetchWeather}
            />
          </button>
        </div>

        {/* Result Box */}

        <div
          className={`duration-300 delay-75 overflow-hidden ${
            showWeather ? "h-[27rem]" : "h-0"
          }`}
        >
          {loading ? (
            <div className="grid place-items-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="..."
                className="w-14 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-semibold uppercase">
                    {apiData?.name + "," + apiData?.sys?.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt=""
                  className="w-52 mx-auto"
                />
                <h3 className="text-2xl font-bold text-zinc-800">
                  {" "}
                  {showWeather[0]?.type}
                </h3>

                {apiData && (
                  <>
                    <div className="flex justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png "
                        alt="..."
                        className="h-9 mt-1 "
                      />
                      <h2 className="text-4xl font-extrabold ">
                        {Math.floor(apiData?.main?.temp)}&#176;C
                      </h2>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
