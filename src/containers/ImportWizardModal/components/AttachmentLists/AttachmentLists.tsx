import React, { FC, useRef, useState } from 'react';
import { Block } from 'baseui/block';
import { LabelMedium, ParagraphSmall } from 'baseui/typography';
import { TFileContent } from '../../../../redux/import/fileUpload';
import Attachment from './Attachment';
import ConfirmationModal from '../../../../components/ConfirmationModal';

export type AttachmentListsProps = {
  attachments: TFileContent[];
  onDeleteBtnClick: (index: number) => void;
};

const AttachmentLists: FC<AttachmentListsProps> = ({
  attachments,
  onDeleteBtnClick,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const indexRef = useRef<number>(null);
  const filenameRef = useRef<string>(null);

  const onModalAccept = () => {
    setModalOpen(false);
    onDeleteBtnClick(indexRef.current);
    indexRef.current = null;
    filenameRef.current = null;
  };

  const onModalReject = () => {
    setModalOpen(false);
    indexRef.current = null;
    filenameRef.current = null;
  };

  const openModal = (index: number, fileName: string) => {
    setModalOpen(true);
    indexRef.current = index;
    filenameRef.current = fileName;
  };

  return (
    <Block>
      {attachments.map((fileContent: TFileContent, index: number) => {
        const { fileName } = fileContent;
        const key = `${index}-${fileName}`;
        return (
          <Block marginTop={index === 0 ? 0 : 'scale300'} key={key}>
            <Attachment
              fileName={fileName}
              onDeleteBtnClick={(event) => {
                event.preventDefault();
                openModal(index, fileName);
              }}
            />
          </Block>
        );
      })}

      <ConfirmationModal
        onClose={onModalReject}
        isOpen={modalOpen}
        onReject={onModalReject}
        onAccept={onModalAccept}
        rejectBtnText='Cancel'
        confirmBtnText='Delete'
        header={
          <LabelMedium
            as='span'
            overrides={{
              Block: {
                style: {
                  textTransform: 'capitalize',
                },
              },
            }}
          >
            Delete File
          </LabelMedium>
        }
        body={
          <ParagraphSmall>
            Are you sure you want to delete file <b>{filenameRef.current}</b>?{' '}
            <br />
            Your field configuration will be lost.
          </ParagraphSmall>
        }
      />
    </Block>
  );
};

export default AttachmentLists;
