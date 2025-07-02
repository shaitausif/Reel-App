import Navbar from "./components/Navbar";
import Videos from "./components/Videos";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar/>
      <Videos />  
    </div>
  );
}
