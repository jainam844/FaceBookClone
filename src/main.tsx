import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./components/Context/UserContext.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider >
    <App />{" "}
  </UserProvider>
);
