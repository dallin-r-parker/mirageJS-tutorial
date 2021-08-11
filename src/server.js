// Welcome to the tutorial!
import { createServer } from "miragejs";

export default function () {
  createServer({
    routes() {
      const path = "/api/reminders";
      this.get(path, () => ({
        reminders: [
          { id: 1, text: "Walk the dog" },
          { id: 2, text: "Walk the cat" },
          { id: 3, text: "Walk the dogat" },
        ],
      }));

      let ID = 4
      this.post(path, (schema, req) => {
        let attrs = JSON.parse(req.requestBody);
        attrs.id = ID++;

        return { reminder: attrs };
      });
    },
  });
}
