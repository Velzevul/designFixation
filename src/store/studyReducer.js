import {RECEIVE_STUDY} from './studyActions'
import initialState from './initialState'

const study = (
  state = initialState.study,
  action
) => {
  switch (action.type) {
    case RECEIVE_STUDY:
      return Object.assign({}, state, {
        participantId: action.participantId,
        sessionId: action.sessionId,
        condition: action.condition,
        taskAlias: action.taskAlias
      })
    default:
      return state
  }
}

export default study
