import React, { FormEvent, useState } from 'react';
import { Block } from 'baseui/block';
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from 'baseui/checkbox';
import { LabelXSmall } from 'baseui/typography';
import { OnChangeParams, Select, Value, SIZE } from 'baseui/select';
import AddAttributesButton from '../../components/AddAttributesButton';

const GroupEdges = () => {
  const [groupEdge, setGroupEdge] = useState(false);
  const [value, setValue] = useState<Value>([]);

  const onCheckboxChange = (e: FormEvent<HTMLInputElement>) => {
    setGroupEdge(e.currentTarget.checked);
  };

  const onSelectChange = (params: OnChangeParams) => {
    setValue(params.value);
  };

  return (
    <Block paddingLeft='scale300' paddingRight='scale300'>
      <Block
        display='flex'
        justifyContent='space-between'
        marginTop='scale300'
        overrides={{
          Block: {
            style: ({ $theme }) => ({
              ...$theme.typography.ParagraphSmall,
            }),
          },
        }}
      >
        <Block paddingTop='3px' display='flex' flex='1'>
          <Checkbox
            checked={groupEdge}
            onChange={onCheckboxChange}
            checkmarkType={STYLE_TYPE.toggle_round}
            labelPlacement={LABEL_PLACEMENT.left}
            overrides={{
              Label: {
                style: ({ $theme }) => ({
                  ...$theme.typography.LabelSmall,
                  fontSize: $theme.sizing.scale500,
                  paddingRight: $theme.sizing.scale0,
                  paddingTop: $theme.sizing.scale100,
                }),
              },
            }}
          >
            Group Edge
          </Checkbox>
        </Block>

        <LabelXSmall
          width='30px'
          paddingTop='scale300'
          overrides={{
            Block: {
              style: { textTransform: 'capitalize', textAlign: 'center' },
            },
          }}
          marginTop='0'
          marginBottom='0'
        >
          by
        </LabelXSmall>

        <Block display='flex' flex='1'>
          <Select
            size={SIZE.mini}
            clearable={false}
            options={[
              { label: 'AliceBlue', id: '#F0F8FF' },
              { label: 'AntiqueWhite', id: '#FAEBD7' },
              { label: 'Aqua', id: '#00FFFF' },
              { label: 'Aquamarine', id: '#7FFFD4' },
              { label: 'Azure', id: '#F0FFFF' },
              { label: 'Beige', id: '#F5F5DC' },
            ]}
            value={value}
            placeholder='Select color'
            onChange={onSelectChange}
          />
        </Block>
      </Block>

      <Block marginTop='scale500'>
        <Block
          display='flex'
          marginTop='scale200'
          justifyContent='space-between'
        >
          <Block>
            <LabelXSmall>Field</LabelXSmall>
          </Block>

          <Block width='20px' />

          <Block>
            <LabelXSmall>Aggregation</LabelXSmall>
          </Block>
        </Block>

        <Block
          display='flex'
          marginTop='scale200'
          justifyContent='space-between'
        >
          <Block display='flex' flex='1'>
            <Select
              size={SIZE.mini}
              clearable={false}
              options={[
                { label: 'AliceBlue', id: '#F0F8FF' },
                { label: 'AntiqueWhite', id: '#FAEBD7' },
                { label: 'Aqua', id: '#00FFFF' },
                { label: 'Aquamarine', id: '#7FFFD4' },
                { label: 'Azure', id: '#F0FFFF' },
                { label: 'Beige', id: '#F5F5DC' },
              ]}
              value={value}
              placeholder='Select color'
              onChange={onSelectChange}
            />
          </Block>

          <Block width='30px' />

          <Block display='flex' flex='1'>
            <Select
              size={SIZE.mini}
              clearable={false}
              options={[
                { label: 'AliceBlue', id: '#F0F8FF' },
                { label: 'AntiqueWhite', id: '#FAEBD7' },
                { label: 'Aqua', id: '#00FFFF' },
                { label: 'Aquamarine', id: '#7FFFD4' },
                { label: 'Azure', id: '#F0FFFF' },
                { label: 'Beige', id: '#F5F5DC' },
              ]}
              value={value}
              placeholder='Select color'
              onChange={onSelectChange}
            />
          </Block>
        </Block>

        <Block
          display='flex'
          marginTop='scale200'
          justifyContent='space-between'
        >
          <Block display='flex' flex='1'>
            <Select
              size={SIZE.mini}
              clearable={false}
              options={[
                { label: 'AliceBlue', id: '#F0F8FF' },
                { label: 'AntiqueWhite', id: '#FAEBD7' },
                { label: 'Aqua', id: '#00FFFF' },
                { label: 'Aquamarine', id: '#7FFFD4' },
                { label: 'Azure', id: '#F0FFFF' },
                { label: 'Beige', id: '#F5F5DC' },
              ]}
              value={value}
              placeholder='Select color'
              onChange={onSelectChange}
            />
          </Block>

          <Block width='30px' />

          <Block display='flex' flex='1'>
            <Select
              size={SIZE.mini}
              clearable={false}
              options={[
                { label: 'AliceBlue', id: '#F0F8FF' },
                { label: 'AntiqueWhite', id: '#FAEBD7' },
                { label: 'Aqua', id: '#00FFFF' },
                { label: 'Aquamarine', id: '#7FFFD4' },
                { label: 'Azure', id: '#F0FFFF' },
                { label: 'Beige', id: '#F5F5DC' },
              ]}
              value={value}
              placeholder='Select color'
              onChange={onSelectChange}
            />
          </Block>
        </Block>
      </Block>

      <Block marginTop='scale200'>
        <AddAttributesButton onClick={(e) => console.log(e)} />
      </Block>
    </Block>
  );
};

export default GroupEdges;
