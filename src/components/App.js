import TopUsCities from "./TopUsCities";
import { SWRConfig } from "swr";
import { CityProvider } from "../contexts/CityContext";
import {fetcher} from "../utils/fetcher";

function App({fallback}) {
  return (
    <>
      <SWRConfig
        value={{
          suspense: true,
          fallback,
          fetcher
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
