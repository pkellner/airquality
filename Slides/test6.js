/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */

export default function MyApp() {

  

}






















  const [cityId, setCityId] = useState();
  const [isPending, startTransition] = useTransition();
  function RenderComponent() {
    const [data] = useData(`/api/cities?count=${displayCount}`);
    return (<ul>{data.slice(0, displayCount).map(rec =>
      <li key={id} onClick={() => {
        startTransition(() => { setCityId(rec.id); });
        }}>
        {rec.name}
        {isPending ? <div>Pending City Loading...</div> : null}
      </li>)}
      </ul>
    );
  }
  return (
    <Suspense fallback={<div>Loading Cities...</div>} >
      <RenderComponent /><hr/><CityDetail cityId={cityId} />
    </Suspense>
  )
}
function CityDetail({ cityId }) {
  const [data] = useData(`/api/cityDetail?id=${cityId}`);
  return <div>{data.cityName} Population:${data.population}</div>
}
