import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeadingSmall, LabelMedium, ParagraphSmall } from 'baseui/typography';
import { ChevronLeft } from 'baseui/icon';
import { Button } from 'baseui/button';

import { Cell } from 'baseui/layout-grid';
import { FlushedGrid, Statistic, Hash } from '@blocklynx/ui';
import { clearDetails } from '../redux/graphSlice';
import { RiskBarChart } from '../Charts';

import { CATEGORIES } from '../Utilities/categories';
import {
  multiplyArr,
  roundToTwo,
  timeConverter,
  processScoreVector,
} from '../Utilities/utils';
import { getGraphInit, getGraph } from '../redux/accessors';

const InvestigateDetailed = () => {
  const detailedSelection = useSelector(
    state => getGraph(state).detailedSelection
  );
  const scoreLock = useSelector(state => getGraphInit(state).scoreLock);
  const score = useSelector(state => getGraphInit(state).score);
  const item = detailedSelection.data;
  let riskScore = 0;
  if (!scoreLock) {
    riskScore = multiplyArr(
      Object.values(item.data.score_vector),
      Object.values(score)
    );
  }
  const headingTitle = item.data.displayText;
  const value = item.label;

  return (
    <>
      <BackButton />
      <HeadingSmall marginTop="0">{headingTitle}</HeadingSmall>

      <div style={{ overflowWrap: 'break-word', width: '310px' }}>
        <Hash text={item.data.displayText} />
      </div>
      <br />
      <FlushedGrid>
        <Cell span={6}>
          <Statistic value={`${value} ETH`} label="Value" />
        </Cell>
        <Cell span={6}>
          {!scoreLock && (
            <Statistic value={Math.round(riskScore)} label="Risk Score" />
          )}
        </Cell>
      </FlushedGrid>
      <hr />
      <br />
      <LabelMedium>Sending Address</LabelMedium>
      <Hash text={item.data.from_address} />
      <LabelMedium>Receiving Address</LabelMedium>
      <Hash text={item.data.to_address} />
      <LabelMedium>Block</LabelMedium>
      <ParagraphSmall>
        {`${item.data.blk_num}, ${timeConverter(item.data.blk_ts_unix)}`}
      </ParagraphSmall>
      {!scoreLock && (
        <>
          <LabelMedium>Source of Funds</LabelMedium>
          <div style={{ height: '180px' }}>
            <RiskBarChart
              data={processScoreVector(CATEGORIES, item.data.score_vector)}
            />
          </div>
        </>
      )}
    </>
  );
};

const BackButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      startEnhancer={() => <ChevronLeft size={24} />}
      kind="tertiary"
      size="compact"
      onClick={() => dispatch(clearDetails())}
      overrides={{
        BaseButton: {
          style: {
            paddingLeft: 0,
          },
        },
      }}
    >
      Back
    </Button>
  );
};

export default InvestigateDetailed;
