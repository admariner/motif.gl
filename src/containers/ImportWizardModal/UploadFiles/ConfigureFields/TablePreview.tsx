import React from 'react';
import { Table } from 'baseui/table-semantic';
import { Theme } from 'baseui/theme';

const COLUMNS: string[] = [
  'Name',
  'Age',
  'Address',
  'something',
  'fishy',
  'boolean',
  '123123',
  '123123',
];
const DATA: any[] = [
  [
    'Sarah Brown',
    31,
    '100 Broadway St., New York City, New York 123123123123123123',
    'true',
  ],
  ['Jane Smith', 32, '100 Market St., San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
];

const TablePreview = () => {
  return (
    <Table
      columns={COLUMNS}
      data={DATA}
      overrides={{
        Root: {
          style: ({ $theme }: { $theme: Theme }) => ({
            // maxHeight: '360px',
            maxHeight: '180px',
            '::-webkit-scrollbar': {
              height: $theme.sizing.scale200,
              width: $theme.sizing.scale200,
            },
            '::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '::-webkit-scrollbar-thumb': {
              background: '#595f6d',
            },
          }),
        },
        TableHeadCell: {
          style: ({ $theme }: { $theme: Theme }) => ({
            fontSize: $theme.sizing.scale500,
            padding: `${$theme.sizing.scale200} ${$theme.sizing.scale300}`,
          }),
        },
        TableBodyRow: {
          style: ({ $theme }: { $theme: Theme }) => ({
            fontSize: $theme.sizing.scale300,
            borderBottom: '1px solid lightgrey',
          }),
        },
        TableBodyCell: {
          style: ({ $theme }: { $theme: Theme }) => ({
            fontSize: $theme.sizing.scale500,
            padding: `${$theme.sizing.scale100} ${$theme.sizing.scale300}`,
          }),
        },
      }}
    />
  );
};

export default TablePreview;
