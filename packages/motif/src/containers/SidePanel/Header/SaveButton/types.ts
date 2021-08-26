import { Theme } from 'baseui/theme';
import { ExplorerContextProps } from 'src/containers/Graph/context';
import * as GraphT from '../../../../redux/graph';

export type SaveChoicesMenuProps = { close: any } & SaveButtonProps;
export type SaveButtonProps = {
  graphList: GraphT.GraphList;
  graphFlatten: GraphT.GraphData;
  styleOptions: GraphT.StyleOptions;
  onSaveCloud?: ExplorerContextProps['onSaveCloud'];
};
export type LabelProps = { theme: Theme };
