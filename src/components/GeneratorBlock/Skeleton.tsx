
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={443}
    viewBox="0 0 280 500"
    backgroundColor="#C0C0C0"
    foregroundColor="#ecebeb">
    <rect x="5" y="-10" rx="0" ry="0" width="267" height="249" /> 
    <rect x="178" y="241" rx="0" ry="0" width="0" height="1" /> 
    <rect x="155" y="155" rx="0" ry="0" width="3" height="49" />
    <rect x="0" y="279" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="326" rx="10" ry="10" width="280" height="80" />
    <rect x="0" y="436" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="427" rx="24" ry="24" width="152" height="45" />
  </ContentLoader>
);
