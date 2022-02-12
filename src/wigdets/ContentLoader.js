import React from "react";
import { CircularProgress } from "@mui/material";

const ContentLoader = () => (
  <div className="custom-progress-bar opacity04">
    <div className="progress-bar-position">
      <CircularProgress size={70} thickness={1.5} />
    </div>
  </div>
);

export default ContentLoader;
