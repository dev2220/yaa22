import React, {useState, useMemo, useEffect, useCallback, memo} from 'react';
import styled from 'styled-components';

export const Root = styled.div``;

const StyledImg = styled.img`
  display: ${({isLoaded}) => !isLoaded && 'none'};
  width: 100%;
  height: 100%;
`;

const Img = ({alt, fallback, className, loading, ...props}) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const timeOut = useMemo(
    () =>
      setTimeout(() => {
        setIsLoaded(false);
      }, 6),
    []
  );
  const onLoad = useCallback(
    () => {
      clearTimeout(timeOut);
      setIsLoaded(true);
    },
    [timeOut]
  );
  useEffect(() => () => clearTimeout(timeOut));
  return (
    <Root className={className}>
      {!loading && <StyledImg alt={alt} isLoaded={isLoaded} {...props} onLoad={onLoad} />}
      {(!isLoaded || loading) && fallback}
    </Root>
  );
};

export default memo(Img);
