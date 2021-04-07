import React, { ReactNode, useMemo, FC, useEffect } from 'react';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Controller, Control } from 'react-hook-form';
import { OnChangeParams, Option, Value } from 'baseui/select';
import useFileContents, { defaultField } from '../hooks/useFileContents';
import FormSelectWithTooltip from '../../../../components/FormSelectWithTooltip';
import { ConfigureFieldsForm } from '../../../../redux/import/fileUpload';

type AccessorField = {
  name: string;
  labelText: ReactNode;
  tooltipText?: ReactNode;
  options: Value;
};
type AccessorsFieldsProps = {
  onSelectChange: (params: OnChangeParams, onChange: any) => any;
  control: Control<Record<string, any>>;
  watch: (names?: string | string[]) => any;
  setError: (
    name: string,
    error: {
      type?: string;
      types?: object;
      message?: string;
      shouldFocus?: boolean;
    },
  ) => void;
  clearErrors: (name?: string | string[]) => void;
  getValues: (payload?: string | string[]) => Object;
  errors: Record<string, Object>;
  setValue: (name: string, value: any, config?: Object) => void;
};
const AccessorFields: FC<AccessorsFieldsProps> = ({
  onSelectChange,
  control,
  watch,
  setError,
  clearErrors,
  getValues,
  errors,
  setValue,
}) => {
  const {
    nodeFieldOptions,
    edgeFieldOptions,
    setAccessors,
  } = useFileContents();

  const nodeIDOptions = useMemo(() => {
    return [...defaultField, ...nodeFieldOptions];
  }, [nodeFieldOptions]);

  const edgeIDOptions = useMemo(() => {
    return [...defaultField, ...edgeFieldOptions];
  }, [edgeFieldOptions]);

  const ACCESSOR_FIELDS: AccessorField[] = useMemo(
    () => [
      {
        name: 'nodeID',
        labelText: 'Node ID',
        tooltipText: 'Unique Identifier of Specific Node',
        options: nodeIDOptions,
      },
      {
        name: 'edgeID',
        labelText: 'Edge ID',
        tooltipText: 'Unique Identifier of Specific Edge',
        options: edgeIDOptions,
      },
      {
        name: 'edgeSource',
        labelText: 'Source',
        tooltipText: 'Source attribute of Edges',
        options: edgeFieldOptions,
      },
      {
        name: 'edgeTarget',
        labelText: 'Target',
        tooltipText: 'Target attribute of Edges',
        options: edgeFieldOptions,
      },
    ],
    [nodeIDOptions, edgeIDOptions, edgeFieldOptions],
  );

  useEffect(() => {
    const setDefaultValue = (options: Value, name: string, value: string) => {
      const defaultOption = options.find(
        (option: Option) => option.id === value,
      );

      if (defaultOption === undefined) {
        const [firstOption] = options;
        setValue(name, firstOption.id);
        return;
      }

      setValue(name, defaultOption.id);
      return;
    };

    const {
      nodeID,
      edgeID,
      edgeSource,
      edgeTarget,
    } = getValues() as ConfigureFieldsForm;
    setDefaultValue(nodeIDOptions, 'nodeID', nodeID);
    setDefaultValue(edgeIDOptions, 'edgeID', edgeID);
    setDefaultValue(edgeFieldOptions, 'edgeSource', edgeSource);
    setDefaultValue(edgeFieldOptions, 'edgeTarget', edgeTarget);
  }, []);

  useEffect(() => {
    clearErrors();
    const edgeSource = getValues('edgeSource');
    const edgeTarget = getValues('edgeTarget');
    const edgeID = getValues('edgeID');

    const isSameWithSource = edgeSource === edgeID;
    if (isSameWithSource) {
      setError('edgeID', {
        type: 'manual',
        message: 'Value must differ with Source',
      });
      setError('edgeSource', {
        type: 'manual',
        message: 'Value must differ with Edge ID',
      });
    }

    const isSameWithTarget = edgeTarget === edgeID;
    if (isSameWithTarget) {
      setError('edgeTarget', {
        type: 'manual',
        message: 'Value must differ with Edge ID',
      });
      setError('edgeID', {
        type: 'manual',
        message: 'Value must differ with Target',
      });
    }

    const isSameSourceAndTarget = edgeTarget === edgeSource;
    if (isSameSourceAndTarget) {
      setError('edgeSource', {
        type: 'manual',
        message: 'Value must differ with Target',
      });
      setError('edgeTarget', {
        type: 'manual',
        message: 'Value must differ with Source',
      });
    }
  }, [watch('edgeID'), watch('edgeSource'), watch('edgeTarget')]);

  return (
    <FlexGrid flexGridColumnGap='scale300' flexGridColumnCount={4}>
      {ACCESSOR_FIELDS.map((field: AccessorField) => {
        const { name, tooltipText, options, labelText } = field;
        return (
          <FlexGridItem key={name}>
            <Controller
              name={name}
              control={control}
              render={({ onChange, name, value }) => {
                return (
                  <FormSelectWithTooltip
                    name={name}
                    onChange={(params: OnChangeParams) =>
                      onSelectChange(params, onChange)
                    }
                    labelText={labelText}
                    tooltipText={tooltipText}
                    options={options}
                    value={value}
                    setValue={setValue}
                    error={errors[name] && (errors[name] as any).message}
                  />
                );
              }}
            />
          </FlexGridItem>
        );
      })}
    </FlexGrid>
  );
};

export default AccessorFields;
