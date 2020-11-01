import React from 'react';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { ButtonGroup, SHAPE, SIZE, MODE } from 'baseui/button-group';
import { getIcon } from '../TagData';

export type ToggleTokensProps = {
  options: {
    label: string;
    id: string;
    type: string;
    selected: boolean;
  }[];
  onClick: (index: number, status: boolean) => void;
};

// const sampleOptions = [
//   { label: 'data.id', id: 'data.id', type: 'string', selected: true },
//   { label: 'dataStr', id: 'datastr', type: 'boolean', selected: true },
//   { label: 'value', id: 'value', type: 'real', selected: true },
//   { label: 'start_dt', id: 'start_dt', type: 'timestamp', selected: true },
// ];

const ToggleTokens = ({ options, onClick }: ToggleTokensProps) => {
  return (
    <ButtonGroup
      mode={MODE.checkbox}
      shape={SHAPE.pill}
      size={SIZE.mini}
      selected={
        options
          .map((o, idx) => (o.selected === true ? idx : ''))
          .filter(String) as number[]
      }
      onClick={(_, index) => {
        onClick(index, !options[index].selected);
      }}
      overrides={{
        Root: {
          style: {
            display: 'flex',
            flexWrap: 'wrap',
          },
        },
      }}
    >
      {options.map((o) => (
        <Button
          key={o.id}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => {
                return {
                  marginLeft: $theme.sizing.scale300,
                  marginBottom: $theme.sizing.scale200,
                  borderStyle: 'solid',
                  borderWidth: '2px',
                  borderColor: $theme.colors.primary,
                };
              },
            },
          }}
        >
          <Block display='flex' alignItems='center'>
            {getIcon(o.type)}
            {o.label}
          </Block>
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ToggleTokens;
