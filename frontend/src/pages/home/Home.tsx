import Header from "./sections/Header";
import Introduction from "./sections/Introduction";
import WhatWeOffer from "./sections/WhatWeOffer";
import ExploreOurSelection from "./sections/ExploreOurSelection";
import Footer from "../../UI/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <Introduction />
        <WhatWeOffer />
        <ExploreOurSelection />
      </main>
      <Footer />
    </>
  );
}
