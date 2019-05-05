import React, {useCallback, useState, useEffect, useRef, useLayoutEffect} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile} from '@fortawesome/free-regular-svg-icons';
import 'emoji-mart/css/emoji-mart.css';
import {Picker} from 'emoji-mart';
import Popover from 'react-popover';

const Input = styled.textarea`
  resize: none;
  background: transparent;
`;

const Smile = styled(FontAwesomeIcon).attrs({icon: faSmile})`
  color: ${({theme}) => theme.palette.greyBlack};
  font-size: 11px;
  && {
    width: 11px;
    height: 11px;
  }
`;

const MenuWrapper = styled.div`
  cursor: pointer;
  margin-top: 5px;
`;

const Root = styled.div`
  display: flex;
  border: 1px solid ${({isFoucsed, theme}) => (isFoucsed ? theme.palette.grey : 'transparent')};
  padding: 4px;

  &:hover {
    border: 1px solid ${({theme}) => theme.palette.brightWhite};
  }
  ${Input} {
    flex: 1;
  }
`;

const popoverStyle = {zIndex: 3};

const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Count = styled.div`
  color: ${({theme}) => theme.palette.greyWhite};
  font-size: 11px;
`;

const Textarea = ({value, onChange, placeholder, className}) => {
  const menuRef = useRef();
  const [isFoucsed, setIsFocused] = useState(false);
  const inputRef = useRef();
  const [caretPosition, setCaretPosition] = useState(0);
  const [restoreCaret, setRestoreCaret] = useState(false);

  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const handleMenuOnScrolling = useCallback(() => {
    if (isEmojiOpen) {
      setIsEmojiOpen(false);
    }
  }, [isEmojiOpen]);
  useEffect(() => {
    window.addEventListener('scroll', handleMenuOnScrolling);
    return () => window.removeEventListener('scroll', handleMenuOnScrolling);
  }, [handleMenuOnScrolling]);
  const toggleEmojiMenu = useCallback(() => setIsEmojiOpen(!isEmojiOpen), [isEmojiOpen]);
  const closeEmojiMenu = useCallback(() => setIsEmojiOpen(false), []);
  const onEmojiSelect = useCallback(
    e => {
      const sym = e.unified.split('-');
      const codesArray = [];
      sym.forEach(el => codesArray.push(`0x${el}`));
      const emojiPic = String.fromCodePoint(...codesArray);
      closeEmojiMenu();
      onChange(
        value?.length
          ? [value.slice(0, caretPosition), emojiPic, value.slice(caretPosition)].join('')
          : emojiPic
      );
      setCaretPosition(caretPosition + emojiPic.length);
      setRestoreCaret(true);
    },
    [closeEmojiMenu, onChange, value, caretPosition]
  );
  const handleOnChange = useCallback(e => onChange(e.target.value), [onChange]);
  const handleInputFocus = useCallback(() => {
    setIsFocused(false);
  }, []);
  const handleInputBlur = useCallback(() => {
    setCaretPosition(inputRef.current.selectionStart);
    setIsFocused(false);
  }, [inputRef]);

  useLayoutEffect(() => {
    if (restoreCaret) {
      inputRef.current.setSelectionRange(caretPosition, caretPosition);
      inputRef.current.focus();
      setRestoreCaret(false);
    }
  }, [caretPosition, restoreCaret]);

  return (
    <Root isFoucsed={isFoucsed} className={className}>
      <Input
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <RightInfo>
        <MenuWrapper ref={menuRef}>
          <Popover
            isOpen={isEmojiOpen}
            preferPlace="right"
            place="row"
            style={popoverStyle}
            enterExitTransitionDurationMs={0}
            offset={-10}
            tipSize={0.01}
            refreshIntervalMs={0}
            onOuterAction={closeEmojiMenu}
            body={<Picker onSelect={onEmojiSelect} />}
          >
            <Smile onClick={toggleEmojiMenu} />
          </Popover>
        </MenuWrapper>
        <Count>{value?.length}</Count>
      </RightInfo>
    </Root>
  );
};

export default Textarea;
