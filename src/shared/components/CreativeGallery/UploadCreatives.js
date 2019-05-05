import React, {useRef, useState, useCallback} from 'react';
import styled from 'styled-components';
import {findLastIndex} from 'lodash';
import {fileUpload} from 'shared/services/api';
import {SecondaryButton} from '../Button';
import UploadModal from './UploadModal';
import {CREATIVE_TYPES} from '../../constants/creatives';

const fileTypes = {
  [CREATIVE_TYPES.VIDEO]: 'video/mp4, video/x-msvideo, video/quicktime, video/mpeg',
  [CREATIVE_TYPES.IMAGE]: 'image/gif, image/jpeg, image/png, image/bmp',
};

const FileInput = styled.input.attrs({
  multiple: true,
  type: 'file',
})`
  display: none;
`;

const UploadCreatives = ({folderId, addCreativeToFolder, creativeType}) => {
  const fileInputRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [uploads, setUploads] = useState([]);
  const setFileStatus = useCallback((file, status = 'success') => {
    setUploads(u => {
      const index = findLastIndex(u, i => i.name === file.name);
      return Object.assign([], u, {[index]: {...u[index], status}});
    });
  }, []);
  const setFilesForUpload = useCallback(
    e => {
      setModalOpen(true);
      const files = Array.from(e.target.files);
      setUploads(u =>
        u.concat(
          files.map(f => ({
            name: f.name,
            size: f.size,
            status: 'loading',
            folderId,
            src: creativeType === CREATIVE_TYPES.IMAGE ? URL.createObjectURL(f) : null,
          }))
        )
      );
      files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folderId', folderId);

        return fileUpload(formData)
          .then(r => r.json())
          .then(response => {
            if (!response.data.videoLengthInSeconds) {
              response.data.videoLengthInSeconds = null;
            }
            addCreativeToFolder(response.data, folderId);
            setFileStatus(file);
          })
          .catch(() => {
            setFileStatus(file, 'failed');
          });
      });
    },
    [addCreativeToFolder, creativeType, folderId, setFileStatus]
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setUploads([]);
    fileInputRef.current.value = '';
  }, []);

  return (
    <>
      <SecondaryButton onClick={() => fileInputRef.current.click()}>
        Upload Creatives
      </SecondaryButton>
      <FileInput ref={fileInputRef} onChange={setFilesForUpload} accept={fileTypes[creativeType]} />
      <UploadModal
        header={`Files to upload ${uploads.length}`}
        isOpen={modalOpen}
        uploads={uploads}
        close={closeModal}
      />
    </>
  );
};

export default UploadCreatives;
