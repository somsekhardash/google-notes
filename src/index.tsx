import React from "react";
import ReactDOM from "react-dom/client";
import _ from 'lodash'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import LoginPage from "./login";
import Dashboard from "./dashboard";
import "./styles/globals.css";

export interface CommonType { 
  id?: string; 
  title?: string; 
  default?: number; 
  location?: string; 
  status?: string; 
  link?: string; 
  amount?: number; 
  dueDate?: string; 
  completedDate?: string; 
  type?: string;
}

function myTransformer(item: any) {
  const result: CommonType = {};
  if(item.kind == 'calendar#event') {
    result.id = item.id;
    result.title = item.summary;
    result.default = item.description ?? 0;
    result.amount = _.get(item, 'attendees[0].comment', 0);
    result.status =  _.get(item, 'attendees[0].responseStatus', 'Needs Action');
    result.location = item.location;
    result.link = item.htmlLink;
    result.dueDate = item.updated;
    result.completedDate = item.updated;
    result.type = item.kind;
  } else if(item.kind == 'tasks#task') {
    result.id = item.id;
    result.title = item.title;
    result.default = item.description ?? 0;
    result.amount = item.notes;
    result.status = item.status;
    result.location = item.location;
    result.link = item.webViewLink;
    result.dueDate = item.due;
    result.completedDate = item.completed;
    result.type = item.kind;
  }
  console.log(result, "result");
  return result;
}

async function myLoader() {
  const data: any = await fetch("http://localhost:4000/api/event?month=11&year=2024", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) => {
    return res.json();
  });
  console.log(data.body);
  const newData = data.map((item:any) => myTransformer(item));
  
  return newData;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard",
    loader: myLoader,
    element: <Dashboard />,
    errorElement: <ErrorBoundary />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
