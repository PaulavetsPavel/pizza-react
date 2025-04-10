import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton:React.FC = (props:any) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="262" rx="0" ry="0" width="260" height="50" />
    <rect x="0" y="325" rx="0" ry="0" width="260" height="75" />
    <rect x="0" y="415" rx="0" ry="0" width="100" height="30" />
    <rect x="115" y="415" rx="0" ry="0" width="141" height="45" />
  </ContentLoader>
);

export default Skeleton;
