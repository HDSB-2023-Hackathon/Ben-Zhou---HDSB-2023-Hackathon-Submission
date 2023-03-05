import React from "react";
import ContentDirectories from "./ContentDirectories";

const Directories: React.FC<{ classActive: string }> = ({ classActive }) => {

  return (
    <div className="py-4">
      <ContentDirectories classActive={classActive} />
    </div>
  );
};

export default Directories;
