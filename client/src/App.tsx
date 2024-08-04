import Navbar from "./components/Navbar";
import Weather from "./components/Weather";

const App = () => {
  return (
    <div className="w-screen min-h-screen px-10 pt-5">
      <Navbar />
      <Weather />
    </div>
  );
};

export default App;
