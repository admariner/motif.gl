import { ReactNode } from 'react';

export interface ImportError {
  RESTRICTED_WORDS: 'restricted-words';
  EMPTY_DATASET: 'empty-dataset';
  MISSING_NODES_OR_EDGES: 'missing-nodes-or-edges';

  // csv2json
  INVALID_CSV_FORMAT: 'invalid-csv-format';

  // json2csv
  INVALID_JSON_FORMAT: 'invalid-json-format';
  EMPTY_CSV_ROW: 'empty-csv-row';

  INVALID_NODE_CSV_FORMAT: 'invalid-node-csv-format';
  INVALID_EDGE_CSV_FORMAT: 'invalid-edge-csv-format';
  EMPTY_NODE_CSV_ROW: 'empty-node-csv-row';
  EMPTY_EDGE_CSV_ROW: 'empty-edge-csv-row';
}

export type ErrorMessageProps = { title: ReactNode; content?: ReactNode };
