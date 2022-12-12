import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client/link/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Models from '../../interface/Models'

const GET_EVENTMSGS = gql`
  query Query {
    EventMsg {
      messages {
        eventMSGID
        eventMSG
      }
    }
  }
`;

const SEND_EVENT = gql`
  mutation CreateEventLogs($input: EventParam!) {
  createEventLogs(input: $input)
}
`;
const SEND_EVENT_HOLD = gql`
  mutation createEventLogsHold($input: EventParam!) {
    createEventLogsHold(input: $input)
}
`;
@Injectable({
  providedIn: 'root'
})
export class CEventsService {

  constructor(
    private apollo: Apollo
  ) { }

  getEventMessages(): QueryRef<Models.EventMessages> {
    return this.apollo.watchQuery<Models.EventMessages>(
      { query: GET_EVENTMSGS }
    )
  }
  sendEvent(msgID: number): Observable<FetchResult<Models.CreateEventLogs>> {
    return this.apollo.mutate({
      mutation: SEND_EVENT,
      variables: {
        input: {
          msgID
        }
      }
    })
  }
  sendEventHold(msgID: number): Observable<FetchResult<Models.CreateEventLogsHold>> {
    return this.apollo.mutate({
      mutation: SEND_EVENT_HOLD,
      variables: {
        input: {
          msgID
        }
      }
    })
  }
}
