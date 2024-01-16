import { useState } from "react";

const ApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?appid=3e83642b50616e122b5dfabdb589d853&units=metric&q=";

function useInfo(city) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(ApiUrl + city)
      .then((response) => response.json())
      .then((response) => setData(response[currency]));
  }, [city]);

  return data;
}
export default useInfo;
