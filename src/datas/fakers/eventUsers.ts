// CREATE TABLE group_user (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     group_eventT,
//     user_id INT,
//     FOREIGN KEY (group_id) REFERENCES groupes(id),
//   eventEIGN KEY (user_id) REFERENCES utilisateurs(id)
//   );

import { eventUser } from "../../types/user";

export const eventUsersFaker: eventUser[] = [
  { event_id: 1, user_id: 1 },
  { event_id: 1, user_id: 2 },
  { event_id: 1, user_id: 3 },
  { event_id: 1, user_id: 4 },

  { event_id: 2, user_id: 3 },
  { event_id: 2, user_id: 4 },
  { event_id: 2, user_id: 6 },

  { event_id: 3, user_id: 6 },
  { event_id: 3, user_id: 5 },
  { event_id: 3, user_id: 4 },

  { event_id: 4, user_id: 3 },
  { event_id: 4, user_id: 2 },


];

export default eventUsersFaker;
