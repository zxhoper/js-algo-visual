import { StrictMode } from "react";
import { createRoot } from "react-dom/client";



import MazeGrid from "./MazeGrid";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MazeGrid />
  </StrictMode>
);
