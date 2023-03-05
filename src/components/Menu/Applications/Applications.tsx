import React from "react";
import ContentApplications from "./ContentApplications";

const Applications: React.FC<{ classActive: string }> = ({ classActive }) => {

    return (
        <div className="py-4">
            <ContentApplications classActive={classActive} />
        </div>
    );
};

export default Applications;
