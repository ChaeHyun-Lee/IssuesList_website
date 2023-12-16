import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IssuesList from "../src/components/IssuesList";
import IssuesDetail from "../src/components/IssuesDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/list" element={<IssuesList />} />
        <Route path="/detail/:issueNumber" element={<IssuesDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
