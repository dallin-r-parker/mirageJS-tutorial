// Welcome to the tutorial!
import { createServer, Model } from "miragejs";

export default function () {
  createServer({
    models: {
      list: Model,
      reminder: Model,
    },

    seeds(server) {
      server.create("reminder", { text: "Walk the dog" });
      server.create("reminder", { text: "Take out the trash" });
      server.create("reminder", { text: "Work out" });

      server.create("list", { name: "Home" });
      server.create("list", { name: "Work" });
    },

    routes() {
      // ============= REMINDERS =====================
      const remindersPath = "/api/reminders";
      this.get(remindersPath, (schema) => {
        return schema.reminders.all();
      });

      this.post(remindersPath, (schema, req) => {
        let attrs = JSON.parse(req.requestBody);

        return schema.reminders.create(attrs);
      });

      this.delete(`${remindersPath}/:id`, (schema, { params }) =>
        schema.reminders.find(params.id).destroy()
      );
      // ============= List =========================
      const listPath = "/api/lists";
      this.get(listPath, (schema) => schema.lists.all());

      // this.get("/api/lists", (schema, request) => {
      //   return schema.lists.all();
      // });
    },
  });
}
