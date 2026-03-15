import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const CustomModalContext = createContext(null);
// to button sto new input modal na energopoieitai mono otan exoun siblirothei kai ta dio inputs!
// ta errors sti forma tou add new input na fainontai
// to add new inputs to the form na paizei
// to save sto routing na douleuei
// o paginator
// optimization ola ta objs sto render logic pouperno san props se child components na einai optimized giati an
// o parent kanei rerender tha ksanadimiourgithoun kai na perasoun sto child os kainouria kai tha tou kanoun kai autou rerender askopa !
// typescript
// to search kanei infinite loop kai otan sbino to keyword den fernei pali ta available
// kollaei sta filtered tou keyword !
// tailwind
// delete buttonaki dipla se kathe ingredient sto edit product page !

// se env arxeio ta constants mou na psakso na do pos ginetai !

function reducer(state, action) {
  switch (action.type) {
    case "showCustomModal":
      return { ...state, showCustomModal: action.payload };
    case "modalTriggerButtonName":
      return { ...state, modalTriggerButtonName: action.payload };
    case "modalTitle":
      return { ...state, modalTitle: action.payload };
    case "modalContent":
      return { ...state, modalContent: action.payload };
    case "modalIcon":
      return { ...state, modalIcon: action.payload };
    case "modalActionBtnLeft":
      return { ...state, modalActionBtnLeft: action.payload };
    case "modalActionBtnRight":
      return { ...state, modalActionBtnRight: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}
function CustomModalContextProvider({ children }) {
  const initialState = {
    showCustomModal: false,
    modalTriggerButtonName: "",
    modalTitle: "",
    modalContent: "",
    modalIcon: "",
    modalActionBtnLeft: "",
    modalActionBtnRight: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    showCustomModal,
    modalTriggerButtonName,
    modalTitle,
    modalContent,
    modalIcon,
    modalActionBtnLeft,
    modalActionBtnRight,
  } = state;

  const handleCloseCustomModal = useCallback(() => {
    dispatch({ type: "showCustomModal", payload: false });
  }, [dispatch]);

  const handleConfirmCustomModal = () => {
    dispatch({ type: "showCustomModal", payload: false });
  };

  const value = useMemo(
    () => ({
      showCustomModal: showCustomModal,
      modalTriggerButtonName: modalTriggerButtonName,
      modalTitle: modalTitle,
      modalContent: modalContent,
      modalIcon: modalIcon,
      modalActionBtnLeft: modalActionBtnLeft,
      modalActionBtnRight: modalActionBtnRight,
      dispatch,

      onCloseModal: handleCloseCustomModal,
      onConfirmModal: handleConfirmCustomModal,
    }),
    [
      handleCloseCustomModal,
      modalActionBtnLeft,
      modalActionBtnRight,
      modalContent,
      modalIcon,
      modalTitle,
      modalTriggerButtonName,
      showCustomModal,
    ],
  );

  return (
    <CustomModalContext.Provider value={value}>
      {children}
    </CustomModalContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
function useCustomModalContext() {
  const context = useContext(CustomModalContext);
  if (context === undefined) {
    throw new Error("CustomModalContext was used outside of its Provider");
  }
  return context;
}

export { CustomModalContextProvider, useCustomModalContext };
