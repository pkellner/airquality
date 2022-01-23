import {CityContext} from "../contexts/CityContext";
import {Suspense, useContext, useEffect, useState, useTransition,} from "react";
import useSwr from "swr";
import {CityLinkButton, CityLinkButtonFallback} from "./CityLinkButton";
import {fetcher} from "../utils/fetcher";
import {DEFAULTCITYCOUNT} from "../utils/constants";

export const CityListItemsFallback = () => {
  const dummyArray = Array(DEFAULTCITYCOUNT)
    .fill(null)
    .map((_, i) => i);
  return (
    <div className="city">
      {dummyArray.map(function (rec, index) {
        return (
          <ul key={index} className="list-group">
            <li className="city-list">
              <CityLinkButtonFallback />
            </li>
          </ul>
        );
      })}
    </div>
  );
};

function CityListItems() {
  function ProcessDataAndRender() {
    const {
      setSelectedCityId,
      setSelectedCityName,
      setSelectedStateName,
      selectedCityId,
      cityMax,
      setHoursAgo,
    } = useContext(CityContext);

    const [tempId, setTempId] = useState();
    const [isPending, startTransition] = useTransition();

    const { data, error } = useSwr(
      `/api/data/cities?count=${cityMax}`,
      fetcher,
      { suspense: true }
    );

    useEffect(() => {
      if (data && data?.length > 0) {
        setTempId(data[0].id);
        startTransition(() => {
          setSelectedCityId(data[0].id);
          setSelectedCityName(data[0].city);
          setSelectedStateName(data[0].state);
        });
      }
    }, [data, setSelectedCityId, setSelectedCityName, setSelectedStateName]);

    return (
      <div className="city">
        {data
          ?.sort((a, b) => {
            if (a.pm25 > b.pm25) return -1;
            if (a.pm25 < b.pm25) return 1;
            return 0;
          })
          .map(function (rec, index) {
            return (
              <ul key={rec.id} className="list-group">
                <li
                  className={
                    rec.id === selectedCityId ||
                    (!selectedCityId && index === 0)
                      ? "city-list active"
                      : "city-list"
                  }
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setTempId(rec.id);
                      startTransition(() => {
                        setSelectedCityId(rec.id);
                        setSelectedCityName(rec.city);
                        setSelectedStateName(rec.state);
                        setHoursAgo(0);
                      });
                    }}
                  >
                    <CityLinkButton
                      cityRec={rec}
                      isPending={
                        rec.id === tempId && isPending === true ? true : false
                      }
                    />
                  </a>
                </li>
              </ul>
            );
          })}
      </div>
    );
  }

  return (
    <Suspense fallback={<CityListItemsFallback />}>
      <ProcessDataAndRender />
    </Suspense>
  );
}

export default CityListItems;

// const CityListItemsFallback1 = () => {
//   return <div>lll</div>;
// };

// const ProcessDataAndRender1 = () => {
//   const fetcherDelay = () =>
//     new Promise((resolve) => {
//       setTimeout(() => resolve("test"), 5000);
//     });
//   const { data } = useSwr("/api/suspense", fetcherDelay);
//
//   return <div>lll: {data}</div>;
// };

// https://github.com/reactwg/react-18/discussions/41#discussioncomment-841339
//const [isPending, startTransition] = useTransition();
//const [tempId, setTempId] = useState();

// // this fetcherWithCallback has component mounting issues
// const { data, error } = useSwr(
//   `/api/data/cities?count=${cityMax}`,
//   () =>
//     fetcherWithCallback(`/api/data/cities?count=${cityMax}`, (cityData) => {
//       console.log("CityListItems", cityData);
//       setSelectedCityId(cityData[0].id);
//       setSelectedCityName(cityData[0].city);
//       setSelectedStateName(cityData[0].state);
//     }),
//   {
//     suspense: true,
//     // onSuccess(cityData) {
//     //   // THIS DOES NOT WORK WITH REACT SUSPENSE
//     //   //   https://github.com/vercel/swr/issues/1733
//     //   if (cityData && cityData?.length > 0) {
//     //     setSelectedCityId(cityData[0].id);
//     //     setSelectedCityName(cityData[0].city);
//     //     setSelectedStateName(cityData[0].state);
//     //   }
//     // },
//   }
// );
