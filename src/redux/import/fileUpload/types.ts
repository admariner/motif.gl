import { Accessors, GraphData, ImportFormat } from '../../graph';

export type TFileReaderResponse = {
  name: string;
  results: string | ArrayBuffer;
};

export type TFileContent = {
  fileName: string;
  content: ImportFormat['data'];
};

export type TFileContentState = {
  /** attachment uploaded with file inputs */
  attachments: TFileContent[] | SingleFileForms;
  /** type of data uploaded */
  dataType: ImportFormat['type'];
  /** data accessors */
  accessors: Accessors;
  /** user preferences on group edges */
  groupEdge: boolean;
  /** data preview to be display in simple table */
  dataPreview: GraphData;
  /** Determine whether datasets possess duplicate connectivity */
  isEdgeGroupable: boolean;
};

export type MultipleFileForms = {
  attachments: TFileContentState['attachments'];
};

export type SingleFileForms = {
  nodeCsv: TFileContent[];
  edgeCsv: TFileContent[];
};
