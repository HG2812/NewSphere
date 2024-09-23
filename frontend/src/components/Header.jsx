import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import countries from "./countries";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEarthAsia} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
function Header() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate('/signup');
  };
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const [theme, setTheme] = useState("light-theme");
  let category = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    "politics"
  ];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  function toggleTheme() {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  }
  const [newsTitles, setNewsTitles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=cff215ef16434352ad77c1d6d2b91605`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                const titles = data.articles.map(article => article.title);
                setNewsTitles(titles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

  return (
    <>
      <nav className="bg-gray-800">
        <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">
                NewSphere
              </h3>
            </div>
            <button className="rounded-full ... font-bold border-2 border-blue-700 p-2 hover:bg-blue-700 hover:border-blue-900 transition" onClick={goToSignup}>SignUp</button>
            <div className="justify-start">
                      <li className="list-none gap-4 p-4">
                        <Link
                          className="no-underline font-semibold"
                          to="#"
                          onClick={() => {
                            toggleTheme();
                          }}
                        >
                          <input
                            type="checkbox"
                            className="checkbox"
                            id="checkbox"
                          />
                          <label htmlFor="checkbox" className="checkbox-label">
                            <i className="fas fa-moon"></i>
                            <i className="fas fa-sun"></i>
                            <span className="ball"></span>
                          </label>
                        </Link>
                      </li>
                      </div>
          </div>
        </div>
      </nav>
      <nav className="overflow-visible bg-gray-800">
        <div className="mx-auto">
          <div className="relative flex h-16 items-center justify-evenly font-extrabold gap-1 px-4 text-xl">Headlines
          <div className="slant-line"></div>
            <div className="flex items-between justify-evenly">
              <div>
                <div className="flex space-x-4 marquee">
                  <ul
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white marquee"
                    aria-current="page"
                  >
                   <li> <div className="relative overflow-hidden bg-white w-full max-w-screen-lg">
                   <div className="relative animate-marquee marquee-wrapper overflow-hidden bg-white w-full max-w-screen-lg">
            <div className="marquee-content text-gray-700">
                {newsTitles.concat(newsTitles).map((title, index) => (
                    <span key={index} className="marquee-item">{title}</span>
                ))}
            </div>
        </div>
        </div>
        </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-800">
        <div className="mx-auto">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <div
                    className="rounded-md bg-gray-900 py-2 text-sm font-large text-white "
                    aria-current="page"
                  >
                    <ul className="flex list-none text-lg">
                      {category.map((element, index) => (
                        <li key={index} className="px-9">
                          
                            <Link
                              to={"/top-headlines/" + element}
                              className="text-white hover:bg-gray-300 hover:text-black capitalize flex rounded-md text-base font-medium"
                              type="btn"
                              onClick={() => {
                                setActive(!active);
                              }}
                            >
                              {element}
                            </Link>
                        </li>
                      ))}
                      <ul
                className={
                  active
                    ? "nav-ul gap-12 active z-50 px-8"
                    : " nav-ul flex gap-12 px-8"
                }
              >
                <li className="dropdown-li">
                  <Link
                    className="no-underline font-semibold flex items-center gap-1"
                    onClick={() => {
                      setShowCountryDropdown(!showCountryDropdown);
                    }}
                  >
                  <FontAwesomeIcon icon={faEarthAsia} />Country
                  </Link>
                  <ul
                    className={
                      showCountryDropdown
                        ? "dropdown p-2 show-dropdown"
                        : "dropdown p-2"
                    }
                  >
                    {countries.map((element, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setShowCountryDropdown(!showCountryDropdown);
                          }}
                        >
                          <Link
                            to={"/country/" + element?.iso_2_alpha}
                            className="flex gap-3"
                            type="btn"
                            onClick={() => {
                              setActive(!active);
                            }}
                          >
                            <img
                              src={element?.png}
                              srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`}
                              alt={element?.countryName}
                            />
                            <span>{element?.countryName}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
