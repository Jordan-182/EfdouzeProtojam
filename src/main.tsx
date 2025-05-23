import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import { CountProvider } from "./context/CountContext.tsx";
import { BeautyInside } from "./pages/BeautyInside.tsx";
import { Bug } from "./pages/Bug.tsx";
import { CSS } from "./pages/CSS.tsx";
import { Comique } from "./pages/Comique.tsx";
import { Console } from "./pages/Console.tsx";
import { Cookie } from "./pages/Cookie.tsx";
import { Final } from "./pages/Final.tsx";
import { Homepage } from "./pages/Homepage.tsx";
import { Icon } from "./pages/Icon.tsx";
import { KeyboardIsBroken } from "./pages/KeyboardIsBroken.tsx";
import { LastChapter } from "./pages/LastChapter.tsx";
import { Leon } from "./pages/Leon.tsx";
import { Musique } from "./pages/Musique.tsx";
import { Navigation } from "./pages/Navigation.tsx";
import { Over } from "./pages/Over.tsx";
import { PasswordForNavigation } from "./pages/PasswordForNavigation.tsx";
import { PasswordInLink } from "./pages/PasswordInLink.tsx";
import { StockageInterne } from "./pages/StockageInterne.tsx";
import { Title } from "./pages/Title.tsx";
import { Batman } from "./pages/batman.tsx";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/Over",
        element: <Over />,
      },
      {
        path: "/ThePasswordIsRickRollIPromessItsNotARickRoll",
        element: <PasswordInLink />,
      },
      {
        path: "/Leon",
        element: <Leon />,
      },
      {
        path: "/ReplaceThis",
        element: <Navigation />,
      },
      {
        path: "/Password",
        element: <PasswordForNavigation />,
      },
      {
        path: "/Log",
        element: <Console />,
      },
      {
        path: "/Clicker",
        element: <Cookie />,
      },
      {
        path: "/Comique",
        element: <Comique />,
      },
      {
        path: "/Musique",
        element: <Musique />,
      },
      {
        path: "/CSS",
        element: <CSS />,
      },
      {
        path: "/Icon",
        element: <Icon />,
      },
      {
        path: "/KeyboardIsBroken",
        element: <KeyboardIsBroken />,
      },
      {
        path: "/Bug",
        element: <Bug />,
      },
      {
        path: "/BeautyInside",
        element: <BeautyInside />,
      },
      {
        path: "/StockageInterne",
        element: <StockageInterne />,
      },
      {
        path: "/SomethingMustBeAddedHere",
        element: <LastChapter />,
      },
      {
        path: "/Title",
        element: <Title />,
      },
      {
        path: "/26.357896+127.783809",
        element: <Batman />,
      },
      {
        path: "/final",
        element: <Final />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CountProvider>
      <RouterProvider router={router} />
    </CountProvider>
  </StrictMode>
);
