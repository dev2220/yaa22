import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {Text} from 'shared/components/Typography';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${({open}) => open && 1};
  overflow: hidden;
`;

const Icon = styled(FontAwesomeIcon).attrs({icon: faAngleRight})`
  color: ${({theme}) => theme.palette.defaultText};
  transform: ${({open}) => (open ? 'rotate(90deg)' : 'none')};
  transition: transform 200ms;
`;

const Wrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 5px 10px;

  ${Icon} {
    font-size: ${({theme}) => theme.typography.headers.sizes.small}px;
  }

  ${Text} {
    font-size: ${({theme}) => theme.typography.headers.sizes.xSmall}px;
    padding-left: 5px;
  }
`;

const ChildrenRoot = styled.div`
  display: ${({open}) => (open ? 'flex' : 'none')};
  overflow: auto;
  flex-direction: column;
  flex: 1;
`;

const Collapsible = ({text, children, defaultOpen = false}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Root open={open}>
      <Wrapper onClick={() => setOpen(!open)}>
        <Icon open={open} />
        <Text>{text}</Text>
      </Wrapper>
      <ChildrenRoot open={open}>{children}</ChildrenRoot>
    </Root>
  );
};

export default Collapsible;
