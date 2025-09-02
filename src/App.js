import { Routes, Route } from "react-router-dom";
import Projects from "./pages/editor/Projects/projects";
import Project from "./pages/editor/Project/project";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { generateDynamicRoutes } from "./routeGenerator";
import Constructor from "./pages/editor/Constructor/constructor";
import ConstructorHeader from "./pages/editor/components/ConstructorHeader/constructor.header";
import ConstructorButton from "./pages/editor/components/ConstructorButton/constructor.button";
import ConstructorMenus from "./pages/editor/components/ConstructorMenus/constructor.menus";
import BlockDecoration from "./pages/editor/components/BlockDecoration/block.decoration";
import BlockContent from "./pages/editor/components/BlockContent/block.content";
import PageSettings from "./pages/editor/components/PageSettings/page.settings";
import RouteParamsSync from "./route/RouteParamsSync";

function App() {
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  const project = useSelector(({ project }) => project);
  const { isPreviewVisible } = useSelector(({ visibility }) => visibility);

  useEffect(() => {
    if (project.status === "succeeded") {
      const newDynamicRoutes = generateDynamicRoutes(project.items.routes);
      setDynamicRoutes(newDynamicRoutes);
    }
  }, [project]);

  return (
    <>
      <RouteParamsSync />
      {isPreviewVisible ? (
        <>
          <ConstructorButton />
        </>
      ) : (
        <>
          <ConstructorHeader />
          <ConstructorMenus />
          <BlockDecoration />
          <BlockContent />
          <PageSettings />
        </>
      )}

      <main>
        <Routes>
          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path=":projectId">
              <Route index element={<Project />} />
              <Route path=":pageId" element={<Constructor />} />
              <Route path=":pageId/:blockId" element={<Constructor />} />
              {/*{dynamicRoutes}*/}
            </Route>
          </Route>

          <Route
            path="*"
            element={<div style={{ padding: 16 }}>Страница не найдена</div>}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
