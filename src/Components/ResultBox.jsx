import clear_img from "../assets/clear.png";
import clouds_img from "../assets/clouds.png";
import drizzle_img from "../assets/drizzle.png";
import humidity_img from "../assets/humidity.png";
import mist_img from "../assets/mist.png";
import rain_img from "../assets/rain.png";
import snow_img from "../assets/snow.png";
import wind_img from "../assets/wind.png";

function ResultBox(data) {
  if (data.cod === "404") {
    return (
      <div className="mx-auto">
        <h3>Invalid city Name</h3>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <img src={clear_img} alt="" />
        </div>
        <div>
          <h1>{data.main.temp}</h1>
          <h2>{data.name}</h2>
        </div>
      </div>
    );
  }
}
export default ResultBox;
