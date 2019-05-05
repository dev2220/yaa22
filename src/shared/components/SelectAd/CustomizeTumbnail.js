import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {useQuery} from 'react-apollo-hooks';
import {VIDEO_THUMBNAILS_QUERY} from 'shared/services/api';
import Modal, {Content} from '../Modal';
import {PrimaryButton} from '../Button';
import {Caption} from '../SectionHeaders';
import {Img, HiddenOverflow} from './styled';
import LoadingIndicator from '../LoadingIndicator';

const ThumbnailsModal = styled(Modal)`
  ${Content} {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 85px;
  align-items: center;
  padding: 0 34px;
  border-top: 1px solid ${({theme}) => theme.palette.greyWhite};
`;

const ArrowIcon = styled(({visible: _ignore, ...props}) => <FontAwesomeIcon {...props} />)`
  &&& {
    width: 24px;
    height: 24px;
  }

  cursor: pointer;
  flex-shrink: 0;
  visibility: ${({visible}) => (visible ? 'visible' : 'hidden')};
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const List = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  max-width: 550px;
  transform: translateX(${({itemsMovedRight}) => `-${itemsMovedRight * 92}px`});
  transition: transform 0.3s;
`;

const Preview = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  width: 88px;
  height: 88px;
  padding: 3px;
  border: 3px solid ${({theme, selected}) => (selected ? theme.palette.blue : 'transparent')};
  border-radius: 2px;
  font-size: 13px;
  background-color: #fff;
  cursor: pointer;
  margin: 10px 2px;
`;

const CustomCaption = styled(Caption)`
  width: auto;
  margin-left: 31px;
`;

const CustomizeTumbnail = ({videoId, onClose, onSubmit}) => {
  const [itemsMovedRight, setItemsMovedRight] = useState(0);
  const moveRight = useCallback(() => setItemsMovedRight(itemsMovedRight + 1), [itemsMovedRight]);
  const moveLeft = useCallback(() => setItemsMovedRight(itemsMovedRight - 1), [itemsMovedRight]);
  const [selected, setSelected] = useState();
  const {
    data: {videoThumbnails},
    loading,
  } = useQuery(VIDEO_THUMBNAILS_QUERY, {variables: {videoId}});
  return (
    <ThumbnailsModal isOpen header="Customize Thumbnails" loading={loading} close={onClose}>
      <Wrapper>
        <CustomCaption tooltip="Some tooltip" className="pickVideoThumbnail">Pick Video Thumbnail</CustomCaption>
        <ListWrapper>
          <ArrowIcon icon={faAngleLeft} onClick={moveLeft} visible={itemsMovedRight > 0} />
          <HiddenOverflow>
            <List itemsMovedRight={itemsMovedRight}>
              {videoThumbnails?.map(t => (
                <Preview key={t.id} selected={t.id === selected?.id} onClick={() => setSelected(t)}>
                  <Img fallback={<LoadingIndicator />} src={t.url} />
                </Preview>
              ))}
            </List>
          </HiddenOverflow>
          <ArrowIcon
            icon={faAngleRight}
            onClick={moveRight}
            visible={videoThumbnails?.length - itemsMovedRight > 6}
          />
        </ListWrapper>
      </Wrapper>
      <Footer>
        <PrimaryButton disabled={!selected} onClick={() => onSubmit(selected)}>
          Apply Thumbnails
        </PrimaryButton>
      </Footer>
    </ThumbnailsModal>
  );
};

export default CustomizeTumbnail;
