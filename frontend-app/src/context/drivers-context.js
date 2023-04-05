import React, { useState } from "react";

const DriversContext = React.createContext({
  addedDrivers: [],
  setAddedDrivers: () => {},
  driver: {},
  setDriver: () => {},
  isCompletelyNewDriver: false,
  setIsCompletelyNewDriver: () => {},
  isAddNewDriverBtnClicked: false,
  setIsAddNewDriverBtnClicked: () => {},
  isSubscriberAddedAsDriver: false,
  setIsSubscriberAddedAsDriver: () => {},
  passedDriverIsSubscriber: false,
  setPassedDriverIsSubscriber: () => {},
  isAddSubscriberAsDriverBtnVisible: true,
  setIsAddSubscriberAsDriverBtnVisible: () => {},
});

export const DriversContextProvider = (props) => {
  const [addedDrivers, setAddedDrivers] = useState([]);
  const [driver, setDriver] = useState({});
  const [isCompletelyNewDriver, setIsCompletelyNewDriver] = useState(false);
  const [isAddNewDriverBtnClicked, setIsAddNewDriverBtnClicked] =
    useState(false);
  const [isSubscriberAddedAsDriver, setIsSubscriberAddedAsDriver] =
    useState(false);
  const [passedDriverIsSubscriber, setPassedDriverIsSubscriber] =
    useState(false);
  const [
    isAddSubscriberAsDriverBtnVisible,
    setIsAddSubscriberAsDriverBtnVisible,
  ] = useState(true);

  return (
    <DriversContext.Provider
      value={{
        addedDrivers: addedDrivers,
        setAddedDrivers: setAddedDrivers,
        driver: driver,
        setDriver: setDriver,
        isCompletelyNewDriver: isCompletelyNewDriver,
        setIsCompletelyNewDriver: setIsCompletelyNewDriver,
        isAddNewDriverBtnClicked: isAddNewDriverBtnClicked,
        setIsAddNewDriverBtnClicked: setIsAddNewDriverBtnClicked,
        isSubscriberAddedAsDriver: isSubscriberAddedAsDriver,
        setIsSubscriberAddedAsDriver: setIsSubscriberAddedAsDriver,
        passedDriverIsSubscriber: passedDriverIsSubscriber,
        setPassedDriverIsSubscriber: setPassedDriverIsSubscriber,
        isAddSubscriberAsDriverBtnVisible: isAddSubscriberAsDriverBtnVisible,
        setIsAddSubscriberAsDriverBtnVisible:
          setIsAddSubscriberAsDriverBtnVisible,
      }}
    >
      {props.children}
    </DriversContext.Provider>
  );
};

export default DriversContext;
