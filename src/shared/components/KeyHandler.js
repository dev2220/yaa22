import React, {useCallback} from 'react';

const KeyHandler = ({children, onEnter, onEscape, stopPropagation = false, ...props}) => {
  const onKeyDown = useCallback(
    e => {
      if (stopPropagation) {
        e.stopPropagation();
      }

      if (onEnter && e.key === 'Enter') {
        onEnter();
      }

      if (onEscape && e.key === 'Escape') {
        onEscape();
      }
    },
    [onEnter, onEscape, stopPropagation]
  );

  return (
    <div {...props} tabIndex="-1" onKeyDown={onKeyDown}>
      {children}
    </div>
  );
};

export default KeyHandler;
