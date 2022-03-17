import axios from "axios";

// ACTION TYPES

const GET_CONNECTIONS = "GET_CONNECTIONS";
const CREATE_CONNECTION = "CREATE_CONNECTION";
const ACCEPT_CONNECTION = "ACCEPT_CONNECTION";
const REMOVE_CONNECTION = "REMOVE_CONNECTION";

// ACTION CREATORS

const _getConnections = (connections) => ({
  type: GET_CONNECTIONS,
  connections,
});
const _createConnection = (connection) => ({
  type: CREATE_CONNECTION,
  connection,
});
const _acceptConnection = (connection) => ({
  type: ACCEPT_CONNECTION,
  connection,
});
const _removeConnection = (connectionId) => ({
  type: REMOVE_CONNECTION,
  connectionId,
});

//THUNK CREATORS

export const getConnections = (userId) => {
  return async (dispatch) => {
    const { data: connections } = await axios.get(`/api/connections/${userId}`);
    dispatch(_getConnections(connections));
  };
};

export const createConnection = (requester_userId, requested_userId) => {
  return async (dispatch) => {
    const { data: newConnection } = await axios.post("/api/connections", {
      requester_userId,
      requested_userId,
    });
    dispatch(_createConnection(newConnection));
  };
};

export const acceptConnection = (connectionId) => {
  return async (dispatch) => {
    const { data: acceptedConnection } = await axios.put(
      `/api/connections/acceptRequest/${connectionId}`
    );
    dispatch(_acceptConnection(acceptedConnection));
  };
};

export const removeConnection = (connectionId) => {
  return async (dispatch) => {
    await axios.delete(`/api/connections/${connectionId}`);
    dispatch(_removeConnection(connectionId));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_CONNECTIONS:
      return action.connections;
    case CREATE_CONNECTION:
      return [...state, action.connection];
    case ACCEPT_CONNECTION:
      return state.map((connection) =>
        connection.id === action.connection.id ? action.connection : connection
      );
    case REMOVE_CONNECTION:
      return state.filter(
        (connection) => connection.id !== action.connectionId
      );
    default:
      return state;
  }
};
