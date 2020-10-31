import React, { useState, Fragment } from 'react';

import { useSelector } from 'react-redux';
import InvestigateMain from './InvestigateMain';
import { getGraph, getUI } from '../../redux';
import Editable from '../../components/Editable';

const InvestigatePanel = () => {
  // const detailedSelection = useSelector(
  //   (state) => getGraph(state).detailedSelection,
  // );
  // const name = useSelector((state) => getUI(state).name);
  const [value, setValue] = useState(useSelector((state) => getUI(state).name));

  return (
    <Fragment>
      <Editable
        text={value}
        iconPosition='right'
        onSubmit={(text) => setValue(text)}
      />
      <br />
      <InvestigateMain />
    </Fragment>
  );
};

export default InvestigatePanel;
