// Welcome to the tutorial!
import { createServer, Model } from "miragejs";

export default function () {
  createServer({
    models: {
      reminder: Model,
    },

    seeds(server) {
      server.create("reminder", { text: "Walk the dog" });
      server.create("reminder", { text: "Take out the trash" });
      server.create("reminder", { text: "Work out" });
    },

    routes() {
      const path = "/api/reminders";
      this.get(path, (schema) => {
        return schema.reminders.all();
      });

      this.post(path, (schema, req) => {
        let attrs = JSON.parse(req.requestBody);

        return schema.reminders.create(attrs);
      });

      this.delete(`${path}/:id`, (schema, { params }) =>
        schema.reminders.find(params.id).destroy()
      );
    },
  });
}
