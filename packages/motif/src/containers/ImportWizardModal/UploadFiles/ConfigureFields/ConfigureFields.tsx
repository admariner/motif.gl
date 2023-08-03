import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { Block } from 'baseui/block';
import { isEmpty, isEqual } from 'lodash';
import { OnChangeParams } from 'baseui/select';
import { useForm, UnpackNestedValue, SubmitHandler } from 'react-hook-form';
import { Button, KIND, SIZE } from 'baseui/button';

import { useDispatch, useSelector } from '../../../../redux/hooks';
import { UISelectors, UISlices } from '../../../../redux/ui';
import DataPreview from './DataPreview';
import AccessorFields from './AccessorFields';

import useFileContents from '../hooks/useFileContents';
import useImportData from '../hooks/useImportData';

import * as Icon from '../../../../components/Icons';
import {
  ConfigureFieldsForm,
  TFileContent,
  SingleFileForms,
} from '../../../../redux/import/fileUpload';
import {
  TLoadFormat,
  GraphSlices,
  ImportFormat,
} from '../../../../redux/graph';
import { getGraph } from '../../../../redux/graph/selectors';
import GroupEdgeConfiguration from '../../../../components/GroupEdgeConfiguration';
import OverwriteStyleModal from './OverwriteStyleModal';
import ImportErrorDisplay from './ImportErrorDisplay';

const ConfigureFields = () => {
  const {
    fileUpload: {
      accessors,
      groupEdge,
      isEdgeGroupable,
      dataType,
      attachments,
    },
    setAccessors,
  } = useFileContents();
  const dispatch = useDispatch();

  // loading indicator progress states
  const { loading, importError } = useSelector((state) =>
    UISelectors.getUI(state),
  );

  const { styleOptions } = useSelector((state) => getGraph(state));
  const { importJson, importEdgeList, importNodeEdge } = useImportData();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const jsonFileRef = useRef<TFileContent[]>(null);
  const groupEdgeRef = useRef<boolean>(groupEdge);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
    setValue,
  } = useForm<ConfigureFieldsForm>({
    defaultValues: {
      nodeID: accessors.nodeID,
      edgeID: accessors.edgeID,
      edgeSource: accessors.edgeSource,
      edgeTarget: accessors.edgeTarget,
      groupEdge,
    },
  });

  const isSubmitDisabled = isEmpty(errors) === false;

  useEffect(() => {
    const { groupEdge, ...accessors } = getValues() as ConfigureFieldsForm;
    setAccessors(accessors);

    if (importError) {
      dispatch(UISlices.clearError());
    }
  }, [
    watch('nodeID'),
    watch('edgeID'),
    watch('edgeSource'),
    watch('edgeTarget'),
  ]);

  const onSelectChange = (params: OnChangeParams, onChange: any) => {
    const [selectedOption] = params.value;
    onChange(selectedOption.id as string);
  };

  const isContainStyle = (attachments: TFileContent[]) => {
    const isStyleOptionModified = !isEqual(
      GraphSlices.initialState.styleOptions,
      styleOptions,
    );

    const isAttachmentContainStyle: boolean = attachments
      .map((file: TFileContent) => file.content)
      .some((content: ImportFormat) => {
        const { style } = content as TLoadFormat;
        const isContainStyle = !!style;
        return isContainStyle;
      });

    return isStyleOptionModified && isAttachmentContainStyle;
  };

  const importLocalFile: SubmitHandler<ConfigureFieldsForm> = (
    data: UnpackNestedValue<ConfigureFieldsForm>,
    e: BaseSyntheticEvent,
  ) => {
    e.preventDefault();
    const { groupEdge, ...accessors } = data;

    if (dataType === 'json') {
      const isJsonContainStyle = isContainStyle(attachments as TFileContent[]);
      if (isJsonContainStyle) {
        jsonFileRef.current = attachments as TFileContent[];
        groupEdgeRef.current = groupEdge;
        setModalOpen(true);
        return;
      }

      importJson(attachments as TFileContent[], groupEdge, accessors, true);
      return;
    }

    if (dataType === 'edgeListCsv') {
      importEdgeList(attachments as TFileContent[], groupEdge, accessors);
      return;
    }

    // nodeEdgeCsv
    importNodeEdge(attachments as SingleFileForms, groupEdge, accessors);
    return;
  };

  const importJsonOverwriteStyles = (overwriteStyles: boolean) => {
    importJson(
      jsonFileRef.current,
      groupEdgeRef.current,
      accessors,
      overwriteStyles,
    );
    jsonFileRef.current = null;
    groupEdgeRef.current = groupEdge;
    setModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(importLocalFile)}>
        <Block marginTop='scale200'>
          <AccessorFields
            onSelectChange={onSelectChange}
            errors={errors}
            control={control}
            watch={watch}
            setError={setError}
            clearErrors={clearErrors}
            getValues={getValues}
            setValue={setValue}
            dataType={dataType}
          />
        </Block>

        {!importError && (
          <>
            <DataPreview
              isEdgeGroupable={isEdgeGroupable}
              dataType={dataType}
            />
            {isEdgeGroupable && <GroupEdgeConfiguration control={control} />}

            <Block position='absolute' bottom='scale300' right='0'>
              <Button
                type='submit'
                disabled={loading || isSubmitDisabled}
                isLoading={loading}
                kind={KIND.primary}
                size={SIZE.compact}
                endEnhancer={<Icon.ChevronRight size={16} />}
              >
                Continue
              </Button>
            </Block>
          </>
        )}
      </form>

      {importError && (
        <Block marginTop='scale300'>
          <ImportErrorDisplay error={importError} />
        </Block>
      )}

      {modalOpen && (
        <OverwriteStyleModal
          isOpen={modalOpen}
          onAction={importJsonOverwriteStyles}
        />
      )}
    </>
  );
};

export default ConfigureFields;
