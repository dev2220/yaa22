import React, {useCallback, useState} from 'react';
import {faTimes, faPlus} from '@fortawesome/free-solid-svg-icons';
import styled, {css, keyframes} from 'styled-components';
import useWindowScrollPosition from '@rehooks/window-scroll-position';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon';
import {calculateNumOfAdsBySingleCreativeTypeBundles} from '../../utils/variationsCalculators/adsVariationsCalculators';

const Y_POSITION_TO_SHOW_STICKY = window.outerHeight / 9;

const borderTopRadius = css`
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
`;

const stickyHeader = css`
  position: fixed;
  width: calc(100% - 240px);
  right: 0;
  top: 92px;
  z-index: 3;
  border-radius: 0;
  opacity: ${({sticky}) => (sticky === true ? 1 : 0)};
  pointer-events: ${({sticky}) => sticky === false && 'none'};
  transition: all 0.2s;
`;

const TabWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 600;
  background-color: ${({theme}) => theme.palette.blue};
  padding: 12px 64px;
  span {
    font-size: 16px;
  }
`;

const ItemsText = styled.div`
  font-weight: normal;
  font-size: 16px;
  margin-left: 7px;
`;

const Times = styled(Icon).attrs({icon: faTimes})`
  position: absolute;
  top: 50%;
  left: 26px;
  transform: translate(-50%, -50%);
  color: white;
  cursor: pointer;
  && {
    width: 16px;
    height: 16px;
  }
`;

const PlusIcon = styled(Icon).attrs({icon: faPlus})`
  color: ${({theme}) => theme.palette.greyWhite};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  && {
    width: 16px;
    height: 16px;
  }
`;

const RemoveNotification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 206px;
  background-color: ${({theme}) => theme.palette.red};
  flex: 1;
  transition: all 0.2s linear;
  ${borderTopRadius};
  ${({sticky}) => sticky && stickyHeader};
`;

const PlusCircle = styled.div`
  display: flex;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  position: relative;
  background-color: white;
`;

const PlusWrapper = styled.div`
  padding: 8px 24px;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({disabled}) => disabled && 0.6};
`;

const Plus = props => (
  <PlusWrapper {...props}>
    <PlusCircle>
      <PlusIcon />
    </PlusCircle>
  </PlusWrapper>
);

const NotSelectedHeader = styled.div`
  display: flex;
  flex: 1;
  padding: 12px 32px;
  background-color: ${({theme}) => theme.palette.greyDarker};
  font-size: 18px;
  font-weight: 600;
`;

const Tab = ({children, sumCards, onDelete}) => (
  <TabWrapper>
    <Times onClick={onDelete} />
    <span>{`${children} AD`}</span>
    <ItemsText>{sumCards}</ItemsText>
  </TabWrapper>
);

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;
`;

const RemoveButton = styled(Button)`
  padding: 5px 26px;
  margin-right: 0;
  border: solid 1px white;
`;

const ConfirmationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  height: 48px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background-color: ${({theme}) => theme.palette.greyWhite};
  box-shadow: 0 2px 4px 0 rgba(51, 51, 51, 0.2);
  overflow: hidden;
  ${borderTopRadius};
  ${({sticky}) => sticky !== undefined && stickyHeader};
`;

const AddCreativeBtn = styled(Button)`
  color: ${({theme}) => theme.palette.selectedText};
  height: 30px;
  width: 138px;
  position: absolute;
  right: 0px;
  top: 10px;
  font-size: 16px;
  padding: 4px 10px;
  border-radius: 2px;
  background-color: ${({theme}) => theme.palette.greyDarker};
  &:hover {
    background-color: ${({theme}) => theme.palette.black};
  }
`;

const AddCreativesPlusIcon = styled(Icon).attrs({icon: faPlusCircle})`
    width: 13px;
    height: 13px;
    margin-right: 13px;
`;

const StickyHeader = props => {
  const position = useWindowScrollPosition();
  const shouldBeSticky = position.y > Y_POSITION_TO_SHOW_STICKY;
  return (
    <>
      <StyledHeader {...props} />
      <StyledHeader sticky={shouldBeSticky} {...props} />
    </>
  );
};

const Header = ({value, onChange, selectedCreatives, onCreativeChange, onAddCreativesClick}) => {
  const [currentRemoving, setCurrentRemoving] = useState(null);
  const handleOnDelete = useCallback(
    e => {
      setCurrentRemoving(null);
      onCreativeChange([]);
      onChange(null);
    },
    [onChange, onCreativeChange]
  );

  const sumCards = calculateNumOfAdsBySingleCreativeTypeBundles(selectedCreatives);

  return (
    <StickyHeader>
      {currentRemoving ? (
        <RemoveNotification>
          <div>Are you sure you want to Delete {currentRemoving.header} Ad type?</div>
          <ConfirmationWrapper>
            <Button onClick={() => setCurrentRemoving(null)}>No</Button>
            <RemoveButton onClick={handleOnDelete}>Delete</RemoveButton>
          </ConfirmationWrapper>
        </RemoveNotification>
      ) : value ? (
        <>
          <Tab
            sumCards={sumCards}
            onChange={onChange}
            selectedTab
            value={value}
            onDelete={() => setCurrentRemoving(value)}
          >
            {value.header}
          </Tab>
          <Plus disabled />
        {!!selectedCreatives.length && <AddCreativeBtn onClick={onAddCreativesClick}>
          <AddCreativesPlusIcon />
              Add {value.header}s
          </AddCreativeBtn>
        }
        </>
      ) : (
        <NotSelectedHeader>Select Ad Type</NotSelectedHeader>
      )}
    </StickyHeader>
  );
};

export default Header;
