"use client";

import React from "react";

interface MegaTrixIconProps {
  className?: string;
  size?: number | string;
  style?: React.CSSProperties;
}

export const MegaTrixIcon: React.FC<MegaTrixIconProps> = ({
  className = "w-6 h-auto",
  style,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 140 80"
      shapeRendering="crispEdges"
      role="img"
      aria-label="MegaTrix Technologies"
      className={className}
      style={style}
    >
      <title>MegaTrix Technologies</title>
      <desc>MegaTrix pixel-art MT monogram icon.</desc>

      {/* Row 0 */}
      <rect x="1" y="1" width="8" height="8" fill="currentColor" />
      <rect x="11" y="1" width="8" height="8" fill="currentColor" />
      <rect x="61" y="1" width="8" height="8" fill="currentColor" />
      <rect x="71" y="1" width="8" height="8" fill="currentColor" />
      <rect x="81" y="1" width="8" height="8" fill="currentColor" />
      <rect x="91" y="1" width="8" height="8" fill="currentColor" />
      <rect x="101" y="1" width="8" height="8" fill="currentColor" />
      <rect x="111" y="1" width="8" height="8" fill="currentColor" />
      <rect x="121" y="1" width="8" height="8" fill="currentColor" />

      {/* Row 1 */}
      <rect x="1" y="11" width="8" height="8" fill="currentColor" />
      <rect x="11" y="11" width="8" height="8" fill="currentColor" />
      <rect x="21" y="11" width="8" height="8" fill="currentColor" />
      <rect x="51" y="11" width="8" height="8" fill="currentColor" />
      <rect x="61" y="11" width="8" height="8" fill="currentColor" />
      <rect x="71" y="11" width="8" height="8" fill="currentColor" />
      <rect x="81" y="11" width="8" height="8" fill="currentColor" />
      <rect x="91" y="11" width="8" height="8" fill="currentColor" />
      <rect x="101" y="11" width="8" height="8" fill="currentColor" />
      <rect x="111" y="11" width="8" height="8" fill="currentColor" />
      <rect x="121" y="11" width="8" height="8" fill="currentColor" />

      {/* Row 2 */}
      <rect x="1" y="21" width="8" height="8" fill="currentColor" />
      <rect x="11" y="21" width="8" height="8" fill="currentColor" />
      <rect x="21" y="21" width="8" height="8" fill="currentColor" />
      <rect x="31" y="21" width="8" height="8" fill="currentColor" />
      <rect x="41" y="21" width="8" height="8" fill="currentColor" />
      <rect x="51" y="21" width="8" height="8" fill="currentColor" />
      <rect x="61" y="21" width="8" height="8" fill="currentColor" />
      <rect x="71" y="21" width="8" height="8" fill="currentColor" />
      <rect x="91" y="21" width="8" height="8" fill="currentColor" />
      <rect x="101" y="21" width="8" height="8" fill="currentColor" />

      {/* Row 3 */}
      <rect x="1" y="31" width="8" height="8" fill="currentColor" />
      <rect x="11" y="31" width="8" height="8" fill="currentColor" />
      <rect x="31" y="31" width="8" height="8" fill="currentColor" />
      <rect x="41" y="31" width="8" height="8" fill="currentColor" />
      <rect x="61" y="31" width="8" height="8" fill="currentColor" />
      <rect x="71" y="31" width="8" height="8" fill="currentColor" />
      <rect x="91" y="31" width="8" height="8" fill="currentColor" />
      <rect x="101" y="31" width="8" height="8" fill="currentColor" />

      {/* Row 4 */}
      <rect x="1" y="41" width="8" height="8" fill="currentColor" />
      <rect x="11" y="41" width="8" height="8" fill="currentColor" />
      <rect x="61" y="41" width="8" height="8" fill="currentColor" />
      <rect x="71" y="41" width="8" height="8" fill="currentColor" />
      <rect x="91" y="41" width="8" height="8" fill="currentColor" />
      <rect x="101" y="41" width="8" height="8" fill="currentColor" />

      {/* Row 5 */}
      <rect x="1" y="51" width="8" height="8" fill="currentColor" />
      <rect x="11" y="51" width="8" height="8" fill="currentColor" />
      <rect x="61" y="51" width="8" height="8" fill="currentColor" />
      <rect x="71" y="51" width="8" height="8" fill="currentColor" />
      <rect x="91" y="51" width="8" height="8" fill="currentColor" />
      <rect x="101" y="51" width="8" height="8" fill="currentColor" />

      {/* Row 6 */}
      <rect x="1" y="61" width="8" height="8" fill="currentColor" />
      <rect x="11" y="61" width="8" height="8" fill="currentColor" />
      <rect x="61" y="61" width="8" height="8" fill="currentColor" />
      <rect x="71" y="61" width="8" height="8" fill="currentColor" />
      <rect x="91" y="61" width="8" height="8" fill="currentColor" />
      <rect x="101" y="61" width="8" height="8" fill="currentColor" />
      <rect x="121" y="61" width="8" height="8" fill="currentColor" />
      <rect x="131" y="61" width="8" height="8" fill="currentColor" />

      {/* Row 7 */}
      <rect x="1" y="71" width="8" height="8" fill="currentColor" />
      <rect x="11" y="71" width="8" height="8" fill="currentColor" />
      <rect x="61" y="71" width="8" height="8" fill="currentColor" />
      <rect x="71" y="71" width="8" height="8" fill="currentColor" />
      <rect x="91" y="71" width="8" height="8" fill="currentColor" />
      <rect x="101" y="71" width="8" height="8" fill="currentColor" />
      <rect x="121" y="71" width="8" height="8" fill="currentColor" />
      <rect x="131" y="71" width="8" height="8" fill="currentColor" />
    </svg>
  );
};

export default MegaTrixIcon;
