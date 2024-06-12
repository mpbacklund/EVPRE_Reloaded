import { useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div class="hasNavBar">
      <NavBar />

      <h1>Error 401 </h1>
      <p>Looks Like this page doesn't exist!</p>
    </div>
  );
}