import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import AppPlanner from "./AppPlanner";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<AppPlanner />);
