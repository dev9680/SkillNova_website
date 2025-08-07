import { useEffect, useContext, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown, BsMoonFill, BsSunFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/skillnova-original1.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import { ThemeContext } from "../../contexts/ThemeContext"
import ChatBotDialog from "../ChatBotDialog"


function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
const [isBotOpen, setIsBotOpen] = useState(false);

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center  ${
        theme === "light" ? "border-b-gray-200 bg-white" : "border-b-richblack-700 bg-zinc-900"
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="SkillNova Logo"
            width={140}
            height={40}
            className="object-contain h-11 w-24"
            loading="lazy"
          />
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-500"
                        : theme === "light" ? "text-gray-800" : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div
                      className={`invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg ${
                        theme === "light" ? "bg-white text-gray-900" : "bg-richblack-5 text-richblack-900"
                      } p-4 opacity-0 shadow-md transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]`}
                    >
                      <div
                        className={`absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded ${
                          theme === "light" ? "bg-white" : "bg-richblack-5"
                        }`}
                      ></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        subLinks
                          .filter((subLink) => subLink?.courses?.length > 0)
                          .map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                              key={i}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-500"
                          : theme === "light" ? "text-gray-800" : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
            <li>
    <button
      onClick={() => setIsBotOpen(true)}
      className="text-yellow-100 hover:text-yellow-200 font-semibold"
    >
      Chat with AI
    </button>
  </li>
          </ul>
        </nav>

        {/* Buttons (Dark Mode / Cart / ChatBot / Auth) */}
        <div className="hidden items-center gap-x-4 md:flex">
          {/* Dark/Light Toggle */}
          <button
            onClick={toggleTheme}
            className={`text-xl transition-all duration-200 ${
              theme === "light" ? "text-yellow-500 hover:text-yellow-600" : "text-yellow-50 hover:text-yellow-100"
            }`}
            title="Toggle Theme"
          >
            {theme === "dark" ? <BsSunFill /> : <BsMoonFill />}
          </button>

          {/* ✅ AI ChatBot Dialog */}
        <ChatBotDialog isOpen={isBotOpen} setIsOpen={setIsBotOpen} />

          {/* Cart */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart
                className={`text-2xl ${
                  theme === "light" ? "text-gray-800" : "text-richblack-100"
                }`}
              />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Auth Buttons */}
          {token === null && (
            <>
              <Link to="/login">
                <button
                  className={`rounded-[8px] border px-[12px] py-[8px] ${
                    theme === "light"
                      ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                      : "border-richblack-700 bg-richblack-800 text-richblack-100"
                  }`}
                >
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className={`rounded-[8px] border px-[12px] py-[8px] ${
                    theme === "light"
                      ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                      : "border-richblack-700 bg-richblack-800 text-richblack-100"
                  }`}
                >
                  Sign up
                </button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile Menu Icon */}
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
