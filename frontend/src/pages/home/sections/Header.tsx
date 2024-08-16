import Forest from "../../../assets/home/Forest.jpg";
import Waterfall from "../../../assets/home/Waterfall.jpg";

export default function Header() {
  return (
    <header className="mx-auto w-11/12 max-w-screen-xl">
      <div className="grid gap-4 pb-20 pt-8 md:min-h-screen md:grid-cols-3 md:pb-32">
        <div className="bg-dark flex items-center justify-center rounded-3xl py-8 md:col-span-2">
          <h1 className="text-light flex font-serif text-2xl md:text-4xl lg:text-5xl">
            Adventurers
          </h1>
        </div>
        <div className="max-h-48 overflow-hidden rounded-3xl md:max-h-full">
          <img
            className="h-full w-full object-cover"
            src={Forest}
            alt="Forest"
          />
        </div>

        <div className="flex max-h-48 overflow-hidden rounded-3xl md:max-h-full">
          <img
            className="h-full w-full object-cover"
            src={Waterfall}
            alt="Waterfall"
          />
        </div>
        <div className="bg-dark row-start-3 flex items-center justify-center rounded-3xl py-8 md:col-span-2 md:row-start-auto">
          <h2 className="text-blue font-serif text-2xl md:text-4xl lg:text-5xl">
            Travel Wild
          </h2>
        </div>
      </div>
    </header>
  );
}
