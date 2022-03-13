import axios from "axios";

// INITIAL STATE

const initialState = {
  connections: [],
  connection: {},
}

// ACTION TYPES

const GET_CONNECTIONS_FOR_USER = "GET_CONNECTIONS_FOR_USER"
const CREATE_CONNECTION = "CREATE_CONNECTION"
const UPDATE_CONNECTION = "UPDATE_CONNECTION"
const REMOVE_CONNECTION = "REMOVE_CONNECTION"

// ACTION CREATORS

const _getConnectionsForUser = (connections) => ({ type: GET_CONNECTIONS_FOR_USER, connections });
const _createConnectionForUser = (connection) => ({ type: CREATE_CONNECTION, connection });
const _updateConnectionForUser = (connection) => ({ type: UPDATE_CONNECTION, connection });
const _removeConnectionForUser = (connection) => ({ type: REMOVE_CONNECTION, connection})

//THUNK CREATORS

export const getConnectionsForUser = (requestedUserId) => {
  return async (dispatch) => {
    const connections = (await axios.get(`/api/connections/${requestedUserId}`)).data
    dispatch(_getConnectionsForUser(connections))
  }
}

export const createConnectionForUser = (connection) => {
  return async (dispatch) => {
    const newConnection = (await axios.post('/api/connections'), connection).data
    dispatch(_createConnectionForUser(newConnection))
  }
}

export const updateConnectionForUser = (connection) => {
  return async (dispatch) => {
    connection = (await axios.put(`/api/connections/${connection.requested_UserId}`, connection)).data
    dispatch(_updateConnectionForUser(connection))
  }
}

export const removeConnectionForUser = (connection) => {
  return async (dispatch) => {
    await axios.delete(`/api/challenges/${connection.requested_UserId}`, connection).data
    dispatch(_removeConnectionForUser(connection))
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONNECTIONS_FOR_USER:
      return { ...state, connections: action.connections }
    case CREATE_CONNECTION:
      return { ...state, connections: [...state.connections, action.connection] }
    case UPDATE_CHALLENGE:
      return { ...state, connection: action.connection}
    case REMOVE_CONNECTION:
      return {...state,
        connections: state.connections.filter((connection) => connection.id !== action.connection.id),
      }
    default:
      return state
  }
}