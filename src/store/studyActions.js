export const RECEIVE_STUDY = 'RECEIVE_STUDY'
export const KILL_STUDY = 'KILL_STUDY'

export const receiveStudy = (
  participantId,
  sessionId,
  condition,
  taskAlias
) => {
  return {
    type: RECEIVE_STUDY,
    participantId,
    sessionId,
    condition,
    taskAlias
  }
}

export const killStudy = () => {
  return {
    type: KILL_STUDY
  }
}
