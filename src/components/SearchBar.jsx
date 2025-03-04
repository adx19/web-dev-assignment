import React, { useEffect, useState } from "react";
import Logo from "../assets/download.png";
import Loader from "./Loader";
import { fetchData } from "../hooks/useGitHubUser";
import ErrorMessage from "./ErrorMessage";
import UserCard from "./UserCard";
import { fetchRepoData } from "../hooks/useGitHubUser";
import { debounce } from "lodash";
function SearchBar() {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const handleSearch = async (e) => {
    handleSearchHistory();
    e.preventDefault();
    setisLoading(true);
    setData(null);
    setRepoData(null);
    setErrorMessage(null);
    try {
      const userData = await fetchData(userName);
      const userRepoData = await fetchRepoData(userName);
      setRepoData(userRepoData);
      setData(userData);
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };

  const searchDropDown = debounce(() =>{
    if (userName) {
      const filtered = searchHistory.filter((item) =>
        item.toLowerCase().includes(userName.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(searchHistory);
    }
  },300);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#input")) {
        setFilteredHistory([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const selectItem = (item) => {
    setUserName(item);
    setFilteredHistory([]);
  };
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);

  const handleSearchHistory = () => {
    if (!userName.trim()) return;

    if(!searchHistory.includes(userName)){
      const updatedHistory = [userName, ...searchHistory].slice(0, 10);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  };

  return (
    <>
      <div className="p-2.5 flex  bg-indigo-950 text-indigo-50 font-bold h-20">
        <img src={Logo} className="w-20 h-15"></img>
        <h3 className="mr-10 ml-5 mt-5">Github User Finder</h3>
        <input
          type="text"
          placeholder="Enter username"
          className="mr-10 ml-35 w-300"
          id="input"
          value={userName || ""}
          onChange={(e) => {
            setUserName(e.target.value);
            searchDropDown();
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          onClick={searchDropDown}
        ></input>
        {filteredHistory.length > 0 && (
          <div className="dropdown bg-indigo-950 border mt-2 absolute w-300 ml-105 mt-17.5 z-10">
            {filteredHistory.map((item, index) => (
              <div
                key={index}
                onClick={() => selectItem(item)}
                className="p-2 hover:bg-indigo-800 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        )}

        <button className="cursor-pointer" onClick={handleSearch}>
          Search
        </button>
      </div>

      <i className="font-bold p-2.5 flex text-xl justify-center">
        {isLoading && <Loader />}
      </i>
      <i className="font-bold p-2.5 flex text-xl justify-center">
        {errorMessage && <ErrorMessage error={errorMessage} />}
      </i>
      {data && <UserCard data={data} topRepos={repoData} />}
    </>
  );
}

export default SearchBar;
