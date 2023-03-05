import React from "react";
import { ReactComponent as IconView1 } from "../../assets/view-1.svg";
import { ReactComponent as IconView2 } from "../../assets/view-2.svg";

const ButtonsSort: React.FC<{
    isListInView1: boolean;
    sortedBy: string;
    setSortedBy: (option: string) => void;
    setIsListInView1: (status: boolean) => void;
}> = ({ isListInView1, setIsListInView1 }) => {
    return (
        <div className="flex children-styles">
            <button onClick={() => setIsListInView1(true)} title="view in list">
                <IconView1 className={isListInView1 ? "text-violet-600" : ""} />
            </button>
            <button onClick={() => setIsListInView1(false)} title="view in grid">
                <IconView2 className={!isListInView1 ? "text-violet-600" : ""} />
            </button>
        </div>
    );
};

export default ButtonsSort;
