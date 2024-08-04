import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import {
  getWeatherDataAtom,
  useQueryErrorAtom,
  useSearchQueryAtom,
} from "../shared/store";

export default function NavbarDark() {
  const [city, setCity] = useSearchQueryAtom();
  const [weatherData, setWeatherData] = getWeatherDataAtom();
  const [error, setError] = useQueryErrorAtom();

  const handleSearch = async () => {
    const res = await fetch(`http://localhost:8000/${city}`);
    if (!res.ok) {
      throw new Error("error fetching the data.");
    }
    const data = await res.json();
    if (data.list == null) {
      setError("City name not found. Please check the city name.");
    }
    setWeatherData(data);
  };

  return (
    <Navbar
      color="blue-gray"
      className="mx-auto max-w-screen-xl bg-transparent  px-4 py-3 font-mono text-black"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer uppercase py-1.5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Weather
        </Typography>
        <div className="ml-auto flex  w-fit md:mr-4">
          <IconButton
            variant="text"
            color="black"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="px-10"
          >
            Home
          </IconButton>
          <IconButton
            variant="text"
            color="black"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="px-10"
          >
            About
          </IconButton>
        </div>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="black"
            label="Enter your city..."
            className="pr-20"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            containerProps={{
              className: "min-w-[288px]",
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </Navbar>
  );
}
