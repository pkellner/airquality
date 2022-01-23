import { Suspense, SuspenseList, useState } from "react";

// typical component, just render data and really easy to understand what is going on
function CityList0(displayCount) {
  const data = [{id: 1, name: "NY"},{id: 2,}]
  return (
    <ul>
      {data.map
        .slice(0, displayCount)
        .map(rec => <li>{rec.name}</li>)}
    </ul>
  );
}

// introducing async, like calling REST services makes things more complicated
// have to add state management, have to set state after component renders,
//   have to worry about loading states, have to worry about
// when to re-retrieve data, like if the passed in parameter displayCount changes in this case
// when data asynchronously arrives, have to worry about updating state, re-renders are a concern,
// lots of jumping around in execution, hard to follow
// and.. what happens if displayCount changes between the initial fetch but before the data is returned.
// leads to race conditions
// hard to reason about

function CityList1(displayCount) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    setIsLoading(true);
    fetch(`/api/cities?count=${cityCount}`)
      .then((records) => {
        setData(records);
        setIsLoading(false);
      });
   }, [cityCount]);
  
  if (isLoading) return <div>Loading...</div>;
  return (
    <ul>
      {data.map(rec => <li>{rec}</li>)}
    </ul>
  );
}


// this is reason people use data fetching libraries that take care of much of this complexity.
// react query,  Apollo with GraphQL or useSwr, all basically do the same thing for us.
// We are going to code with useSwr in all our examples because it's very simple to use.

// The code simplifies as follows.  All the state management, that is defining state for data and isLoading, as well as
// useEffect, are replaced by a single hook, useSwr in our case that return data and an isLoading state.

// code is really clear, easy to follow.

function CityList2(displayCount) {
  const [data, isLoading] = useSwr(`/api/cities?count=${cityCount}`);

  if (isLoading) return <div>Loading...</div>;
  return (
    <ul>
      {data.map(rec => <li>{rec}</li>)}
    </ul>
  );
}

// still not perfect
// Our goal in writing great code is to separate concerns as much as we can.  This code, they straight forward,
// mixes two concerns.  loading the data (and tracking that loading state), the rendering that data.
// In this simple example, it's not so bad, but when we start adding more components, we have to worry about
// the loading state in each component.  Maybe we want to show only one spinner, which means we need to somehow
// combine loading states and move them up the component hierarchy.

// It would be perfect if we could somehow completely eliminated the loading state and declarative define
// a fallback UI if the components data in the component is not ready (or loaded)

// That's exactly what the suspense element does for us.
// The idea is we extract a component that just calls our data fetching library and just assumes that the
// data is available.
// Then, wrap that component in a new "Suspense" element that has a fallback attribute, that gets assigned JSX that gets 
// rendered when the data component itself has not completed whatever async data call it's making.

// Looking at this new code, you have to be wondering, how can the Suspense component possibly know
// when it should render the fallBack jsx, or render the elements enclosed in our new Suspense element.

// That's where the new React library comes in and has to have deep integration with our data fetching library.
// That is, in our example, useSwr has to know how to communicate with Suspense, which in this case, is the parent 
// component wrapping the our RenderComponent which as the usrSwr code in it.

function CityList3(displayCount) {

  function RenderComponent() {
    const [data, isLoading] = useSwr([]);
    if (isLoading) return <div>Loading...</div>;
    return (
      <ul>
        {data.map(rec => <li>{rec}</li>)}
      </ul>
    );
  }

  return (
    <RenderComponent />
  )
}

function CityList4(displayCount) {

  function RenderComponent() {
    const [data] = useSwr([]);
    return (
      <ul>
        {data.map(rec => <li>{rec}</li>)}
      </ul>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>} >
      <RenderComponent />
    </Suspense>
  )
}

// CLIP-040

// what happens if our React app hierarchary gets more complicated?  Like, say for example, 
// we added a dropdown list that we could pick the displayCount (which in our case is how many
// cities to retrieve from our async service)?  The good news is that the Suspense Boundary still
// works for us.  Assuing our CityCountDropDownList just has a hard code count of something like an array
// of 3, 5 and 10, RenderComponent is the only one that contains a call to our data fetch library so the suspense
// boundary works just as before.

function CityList5(displayCount) {

  function RenderComponent() {
    const [data] = useSwr([]);
    return (
      <ul>
        {data.map(rec => <li>{rec}</li>)}
      </ul>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>} >
      <CityCountDropDownList />
      <RenderComponent />
    </Suspense>
  )
}

// let's say things get more complicated.  Say for example, we want to add another component, like a City Detail
// component, that when we click on a particlar  city, the data in that detail component renders.

// the code might change to something like this where we first add a click event to our list item in our render
// component...

function CityList6(displayCount) {

  function RenderComponent() {
    const [data] = useSwr([]);
    return (
      <ul>
        {data.map(rec => <li onClick=
          {() => showCityDetail(rec.id)}>{rec}</li>)}
      </ul>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>} >
      <CityCountDropDownList />
      <RenderComponent />
    </Suspense>
  )
}

// then add a CityDetail component

function CityList7(displayCount) {

  function RenderComponent() {
    const [cityId, setCityId] = useState();
    const [data] = useSwr([]);
    return (
      <ul>
        {data.map(rec => <li onClick=
          {() => setCityId(rec.id)}>{rec}</li>)}
      </ul>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>} >
      <CityCountDropDownList />
      <RenderComponent />
      <hr />
      <CityDetail cityId={cityId} />
    </Suspense>
  )
}

// assume City Detail component looks something like this:
//
function CityDetail({cityId}) {
  const [data] = useSwr(`/api/citydetail?id=${cityId}`)
  return <div>{data.cityName} population:{data.population}</div>
}

// problem now is every time we choose a new city to display, the completely page reloads.
// solve by adding a new suspese boundary around City Detail
//
// Now, when the CityDetail data is returned from the async code at the end of the /api/citydetail
// just the citydetail record updates, and until then, the fallback, Loading Details is showing.

// better UI experience

function CityList8(displayCount) {

  function RenderComponent() {
    const [cityId, setCityId] = useState();
    const [data] = useSwr([]);
    return (
      <ul>
        {data.map(rec => <li onClick=
          {() => setCityId(rec.id)}>{rec}</li>)}
      </ul>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>} >
      <CityCountDropDownList />
      <RenderComponent />
      <hr />
      <Suspense fallback={<div>Loading Details</div>}>
        <CityDetail cityId={cityId} />
      </Suspense>
    </Suspense>
  )
}




// I realize the code I've written is completely lacking in state and passed props to actually work, but I mostly
// wanted to show you the concepts.  Later in the course, we'll build out a scenario very similar to this and we'll
// include all the coding details so it will actualy work.  Expect Visual Studio Code and not powerpoint, but for now
// and the rest of this module, we are sticking to concepts and slides only.


function CityList9(displayCount) {

  function RenderComponent() {
    const [cityId, setCityId] = useState();
    const [data] = useSwr([]);
    const [isPending, startTransition] = useTransition();
    return (
      <ul>
        {data.map(rec =>
          <li onClick=
            {() => {
            startTransition(() => {
                setCityId(rec.id)
              })
            }}>
            {rec}
          </li>)}
      </ul>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>} >
      <CityCountDropDownList />
      <RenderComponent />
      <hr />
      <Suspense fallback={<div>Loading Details</div>}>
        <CityDetail cityId={cityId} />
      </Suspense>
    </Suspense>
  )
}


// add pending button


function CityList(displayCount) {
  function RenderComponent() {
    const [cityId, setCityId] = useState();
    const [data] = useSwr([]);
    const [isPending, startTransition] = useTransition();
    return (
      <ul>
        {data.map(rec =>
          <li onClick=
            {() => {
              startTransition(() => {
                setCityId(rec.id)
              })
            }}>
            {rec}
            {isPending? 
              <div>Pending City Loading...</div> : null
            }
          </li>)}
      </ul>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <CityCountDropDownList />
      <RenderComponent />
      <hr />
      <Suspense fallback={<div>Loading Details</div>}>
        <CityDetail cityId={cityId} />
      </Suspense>
    </Suspense>
  )
}





function Demo() {

  return (
    <SuspenseList>
      <Suspense fallback={...}>
        {component rendered on server}
      </Suspense>
      <Suspense fallback={...}>
        {component rendered on client}
      </Suspense>
    </SuspenseList>
  )

  return (
    <SuspenseList revealOrder="forwards">
      <Suspense fallback={...}>UI-1</Suspense>
      <Suspense fallback={...}>UI-2</Suspense>
      <Suspense fallback={...}>UI-3</Suspense>
    </SuspenseList>
  )
  

const delay = t => 
  new Promise(resolve => 
    setTimeout(resolve, t))

const [hour, setHour] = useState()
const [minute, setMinute] = useState()
const [second, setSecond] = useState()

useEffect( () => {
   delay(1000).then( () => {
      setHour(..); setMinute(..); 
      setSecond(..);
   });
});





  if (isLoading) return <div>Loading...</div>
  return (<div>UI...</div>)

  return (
    <Suspense
      fallback={<div>Loading...</div>}>
         <div>UI...</div>
    </Suspense>
  )




}