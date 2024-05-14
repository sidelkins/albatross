import React, { useEffect } from "react";

const Round = () => {
  useEffect(() => {
    document.title = "Current Round | Albatross";
  }, []);

  return <div>Round</div>;
};

export default Round;
