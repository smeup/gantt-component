import React from "react";
import { hexToCSSFilter } from "hex-to-css-filter";

export const Icon: React.FC = () => {
  const cssFilter = hexToCSSFilter("#005000");

  console.log(cssFilter);

  const iconStyle = {
    width: "50px",
    height: "50px",
    background: "black",
    maskSize: "100%",
    filter: cssFilter.filter.replace(";", "")
  };

  return (
    <svg>
      <image
        x="10"
        y="10"
        href="/assets/svg/accessibility.svg"
        style={iconStyle}
      />
    </svg>
  );
};

export default Icon;
