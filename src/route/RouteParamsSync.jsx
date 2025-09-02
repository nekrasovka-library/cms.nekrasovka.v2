import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useSearchParams, useMatch } from "react-router-dom";
import { setRoute } from "../features/route/routeSlice";

const RouteParamsSync = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Паттерны соответствуют вашим маршрутам в App.js
  const matchConstructor = useMatch("/projects/:projectId/:pageId/:blockId");
  const matchConstructorPage = useMatch("/projects/:projectId/:pageId");
  const matchProject = useMatch("/projects/:projectId");

  useEffect(() => {
    const params =
      (matchConstructor && matchConstructor.params) ||
      (matchConstructorPage && matchConstructorPage.params) ||
      (matchProject && matchProject.params) ||
      {};

    const query = Object.fromEntries(searchParams.entries());

    dispatch(
      setRoute({
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        params,
        query,
      }),
    );
  }, [
    dispatch,
    location.pathname,
    location.search,
    location.hash,
    matchConstructor,
    matchConstructorPage,
    matchProject,
    searchParams,
  ]);

  return null;
};

export default RouteParamsSync;
