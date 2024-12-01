// CREATE TABLE group_user (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     group_id INT,
//     user_id INT,
//     FOREIGN KEY (group_id) REFERENCES groupes(id),
//     FOREIGN KEY (user_id) REFERENCES utilisateurs(id)
//   );

const GoupUsersFaker = [
    [
        { "group_id": 1, "user_id": 1 },
        { "group_id": 1, "user_id": 2 },
        { "group_id": 2, "user_id": 3 },
        { "group_id": 2, "user_id": 4 },
        { "group_id": 3, "user_id": 1 },
        { "group_id": 3, "user_id": 5 }
      ]
]

export default GoupUsersFaker