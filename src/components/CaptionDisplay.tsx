import React from 'react';

interface CaptionDisplayProps {
  caption: string;
}

const CaptionDisplay: React.FC<CaptionDisplayProps> = ({ caption }) => (
  <div className="text-xl font-semibold mt-4">
    <h3>Generated Caption:</h3>
    <p>{caption}</p>
  </div>
);

export default CaptionDisplay;
