import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Directory from "../Routes/Directory";
import Home from "../Routes/Home";
import SearchResults from "../Routes/SearchResults";
import TaskOnly from "../Routes/TaskOnly";

import HeaderTasks from "./HeaderTasks";

const TasksSection: React.FC = () => {
  return (
    <main className=" pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-8/12 m-auto min-h-screen">
      <HeaderTasks />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/dir/:dir" element={<Directory />} />
        <Route path="/task/:taskId" element={<TaskOnly />} />
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </main>
  );
};

export default TasksSection;
