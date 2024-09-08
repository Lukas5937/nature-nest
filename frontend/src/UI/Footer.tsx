import { Link } from "react-router-dom"
import Facebook from "../assets/footer/Facebook.svg"
import Instagram from "../assets/footer/Instagram.svg"
import X from "../assets/footer/X.svg"
import LinkedIn from "../assets/footer/LinkedIn.svg"

export default function Footer() {
  return (
    <footer className="mt-20 rounded-t-2xl bg-darkGreen px-4 py-8">
      <p className="mb-4 text-center font-extralight text-light">
        Connect with us and stay updated on the latest destinations and offers.
      </p>
      <div className="flex items-center justify-center gap-6">
        <Link to="">
          <img className="h-auto w-4 sm:w-5" src={Facebook} alt="Facebook" />
        </Link>
        <Link to="">
          <img className="h-auto w-4 sm:w-5" src={Instagram} alt="Instagram" />
        </Link>
        <Link to="">
          <img className="h-auto w-4 sm:w-5" src={X} alt="X" />
        </Link>
        <Link to="">
          <img className="h-auto w-4 sm:w-5" src={LinkedIn} alt="Facebook" />
        </Link>
      </div>
    </footer>
  )
}
