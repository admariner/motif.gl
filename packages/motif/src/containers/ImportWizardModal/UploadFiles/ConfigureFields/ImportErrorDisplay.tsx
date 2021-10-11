import React, { FC, useMemo } from 'react';
import * as JsonError from '../../ErrorCollections/JsonErrors';
import * as MotifError from '../../ErrorCollections/MotifErrors';

export type ImportErrorDisplayProps = { error: Error };
const ImportErrorDisplay: FC<ImportErrorDisplayProps> = ({ error }) => {
  const errorMessage = useMemo(() => {
    const errorName = error?.name ?? '';

    if (errorName === 'edge-source-value-undefined') {
      return <JsonError.EdgeSourceValueUndefined />;
    }

    if (errorName === 'edge-target-value-undefined') {
      return <JsonError.EdgeTargetValueUndefined />;
    }

    if (errorName === 'node-edge-id-conflicts') {
      const conflictIds = JSON.parse(error.message);
      return <JsonError.ConflictNodeEdgeID conflictIds={conflictIds} />;
    }

    if (errorName === 'edge-source-not-exist') {
      const edgeSource = error.message;
      return <MotifError.EdgeSourceNotExist edgeSource={edgeSource} />;
    }

    if (errorName === 'edge-target-not-exist') {
      const edgeTarget = error.message;
      return <MotifError.EdgeTargetNotExist edgeTarget={edgeTarget} />;
    }

    if (errorName === 'unknown-error-occurs') {
      return <MotifError.UnknownErrorOccurs />;
    }

    if (errorName === 'conflict-node-id') {
      const conflictIds = JSON.parse(error.message);
      return <JsonError.DuplicateNodeID conflictIds={conflictIds} />;
    }

    if (errorName === 'conflict-edge-id') {
      const conflictIds = JSON.parse(error.message);
      return <JsonError.DuplicateEdgeID conflictIds={conflictIds} />;
    }

    return null;
  }, [error]);

  return errorMessage;
};

export default ImportErrorDisplay;
