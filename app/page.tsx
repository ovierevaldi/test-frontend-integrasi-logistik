import Image from "next/image";
import MainTab from "./components/MainTab";
import ListMenu from "./components/ListMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gray-300 h-screen flex flex-col">
      <Header />
       <div className="p-12  flex-grow">
        <div className="bg-white p-4">
            <ListMenu></ListMenu>
            <MainTab />
          </div>
       </div>
      <Footer />
    </div>
  );
}
