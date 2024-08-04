import { useEffect, useState } from "react";
import { IList, getWeatherDataAtom, useQueryErrorAtom } from "../shared/store";
import { Card, CardBody, Spinner } from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/16/solid";
import { timeconversion } from "../shared/helper";
import Loading from "./Loading";

const Weather = () => {
  const [weatherData, setWeatherData] = getWeatherDataAtom();
  const [currentData, setCurrentData] = useState<null | IList>(null);
  const [error, setError] = useQueryErrorAtom();

  async function fetchData() {
    const res = await fetch("http://localhost:8000");
    const data = await res.json();
    if (!res.ok) {
      setError("Error fetching the data");
    } else {
      setWeatherData(data);
      setCurrentData(data.list[0]);
    }
  }

  useEffect(() => {
    if (weatherData == null) {
      fetchData();
    }
  }, []);

  if (weatherData == null) {
    return <Loading error={error} />;
  }
  if (weatherData.list == null) {
    return (
      <div className="w-full h-full min-h-[60vh] flex justify-center items-center">
        <div className="">
          Error fetching the city name please check the city name
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen text-xl flex flex-col justify-start items-center pt-5">
      <div className="flex flex-col text-center gap-5 text-xl uppercase">
        <h2 className="text-6xl font-black ">Weather report</h2>
        <div className="w-full flex justify-end">
          <p className="font-medium w-fit flex justify-center items-center text-gray-800 pr-3">
            <MapPinIcon className="w-7 h-7" /> {weatherData?.city.name}
          </p>
        </div>
      </div>

      {currentData && (
        <div className="w-full max-w-3xl h-fit min-h-48 px-20 text-sm">
          <p className="text-7xl font-extralight">
            {currentData.main.temp}&deg;C
          </p>
          <div className=" flex flex-col w-full gap-4 pt-2 text-sm">
            <p className="w-full capitalize">
              feels like {currentData.main.feels_like} &deg;
            </p>
            <p>{currentData?.main.humidity}% humidity</p>
          </div>
          <div className=" w-full text-end">
            <p className="uppercase ">{currentData.weather[0].description}</p>
            <p className="w-full text-end">
              {currentData.main.temp_min}&deg; / {currentData.main.temp_max}
              &deg;
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4 justify-center items-center pt-10">
        {weatherData.list?.map((item, idx) => {
          if (idx === 0) return null;
          return <CardComponent key={item.dt_txt} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Weather;

interface ICardComponent {
  item: IList;
}
const CardComponent: React.FC<ICardComponent> = ({ item }) => {
  return (
    <Card
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      placeholder={undefined}
    >
      <CardBody
        onPointerLeaveCapture={undefined}
        onPointerEnterCapture={undefined}
        placeholder={undefined}
        className="min-w-60 min-h-56 p-4"
      >
        <p className="text-black text-xl font-medium">
          {item.main.temp} &deg;C
        </p>
        <p className="w-full text-xs text-end flex gap-3 items-end pt-2">
          <span>{item.dt_txt.split(" ")[0]}</span>
          {timeconversion(item.dt_txt.split(" ")[1])}
        </p>
        <div className="w-full h-fit flex justify-between items-center text-xs uppercase pt-4">
          <p>{item.main.humidity}%</p>
          <p>{item.weather[0].description}</p>
        </div>
      </CardBody>
    </Card>
  );
};
