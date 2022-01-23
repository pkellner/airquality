import TopUsCities from "./TopUsCities";
import { fetcher } from "../utils/fetcher";
import { SWRConfig } from "swr";
import { CityProvider } from "../contexts/CityContext";

function App() {
  return (
    <>
      <SWRConfig
        value={{
          fetcher,
          suspense: true,
        }}
      >
        <CityProvider>
          <TopUsCities />
        </CityProvider>
      </SWRConfig>
    </>
  );
}

export default App;
