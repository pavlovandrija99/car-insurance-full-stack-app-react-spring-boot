import React, { useState } from "react";

const ProposalContext = React.createContext({
  proposal: {},
  setProposal: () => {},
});

export const ProposalContextProvider = (props) => {
  const [proposal, setProposal] = useState({});

  return (
    <ProposalContext.Provider
      value={{ proposal: proposal, setProposal: setProposal }}
    >
      {props.children}
    </ProposalContext.Provider>
  );
};

export default ProposalContext;
