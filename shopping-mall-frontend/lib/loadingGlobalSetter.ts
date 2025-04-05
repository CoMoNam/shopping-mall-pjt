// vps wating

let setIsGlobalLoading: (val: boolean) => void = () => {};

export const setLoadingSetter = (setter: (val: boolean) => void) => {
  setIsGlobalLoading = setter;
};

export { setIsGlobalLoading };
