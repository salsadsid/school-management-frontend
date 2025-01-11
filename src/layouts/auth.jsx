import { Route, Routes } from "react-router-dom";
import { baseRoutes } from "../routes";

export function Auth() {
  return (
    <div className="relative">
      <Routes>
        {baseRoutes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} key={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
