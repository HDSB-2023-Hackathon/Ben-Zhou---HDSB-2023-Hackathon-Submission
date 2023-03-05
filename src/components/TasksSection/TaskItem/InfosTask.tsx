import React from "react";
import { Task } from "../../../interfaces";

const InfosTask: React.FC<{ task: Task; isListInView1: boolean }> = ({
    task,
    isListInView1,
}) => {

    return (
        <div className={`flex flex-col flex-1 ${isListInView1 ? "mr-6" : ""}`}>
            <div
                className={`flex items-center justify-between ${
                    isListInView1 ? "mb-1" : "mb-2"
                }`}
            >
                <span className="block font-medium dark:text-slate-200">
                    {task.title}
                </span>
            </div>
            <p
                title={task.description}
                className={`description mb-2 text-slate-500 dark:text-slate-500 ${
                    isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"
                }`}
            >
                {task.description}
            </p>
        </div>
    );
};

export default InfosTask;
