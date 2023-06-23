import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <Notifications />
            <App />
        </MantineProvider>
    </React.StrictMode>
);
