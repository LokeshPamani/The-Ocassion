import { RECEIVE_CURRENT_USER } from "../../actions/Session";
import { CLEAR_ERRORS, RECEIVE_ERRORS } from "../../actions/Errors";

export default (state = "", { message, type }) => {
    Object.freeze(state);
    switch (type) {
      case RECEIVE_ERRORS:
        return message;
      case RECEIVE_CURRENT_USER:
      case CLEAR_ERRORS:
        return "";
      default:
        return state;
    }
  };
