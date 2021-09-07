export const RECEIVE_PROPERTIES = 'RECEIVE_PROPERTIES';

export function receiveProperties (properties) {
    return {
      type: RECEIVE_PROPERTIES,
      properties,
    }
  }