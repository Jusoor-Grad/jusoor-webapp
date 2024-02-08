/* eslint-disable no-undef */
const logger = (store) => (next) => (action) => {
  if (import.meta.env.MODE !== "production") {
    console.group(action.type);
    console.log("The action is ", action);
  }
  //here we dispatch the action
  const returnValue = next(action);
  //after, the state will be updated
  if (import.meta.env.MODE !== "production") {
    console.log("The new state is ", store.getState());
    console.groupEnd();
  }
  return returnValue;
};
export default logger;
