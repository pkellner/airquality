/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */

import { Suspense, useState } from "react";

function CityList(displayCount) {
  const [cityId, setCityId] = useState();
  function RenderComponent() {
    const [data] = useSwr(`/api/cities?count=${cityCount}`);
    const [isPending, startTransition] = useTransition();
    return (
      <ul>
        {data.slice(0, displayCount).map((rec) => (
          <li onClick={() => {
              startTransition(() => {
                setCityId(rec.id);
              });
            }} >
            {rec}
            {isPending ? <div>Pending City Loading...</div> : null}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CityCountDropDownList />
      <RenderComponent /><hr />
      <Suspense fallback={<div>Loading Details</div>}>
        <CityDetail cityId={cityId} />
      </Suspense>
    </Suspense>
  );
}
