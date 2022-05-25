import type { Connection } from "mysql";

export function closeQuery(connection: Connection) {
  connection.end((err) => {
    if (err) throw err;
  });
}
