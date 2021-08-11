// Welcome to the tutorial!
import { createServer, Model, hasMany, belongsTo } from "miragejs";

export default function () {
  createServer({
    models: {
      list: Model.extend({
        reminders: hasMany(),
      }),
      reminder: Model.extend({
        list: belongsTo(),
      }),
    },

    seeds(server) {
      server.create("reminder", { text: "Walk the dog" });
      server.create("reminder", { text: "Take out the trash" });
      server.create("reminder", { text: "Work out" });

      let homeList = server.create("list", { name: "Home" });
      server.create("reminder", { list: homeList, text: "Do taxes" });

      let workList = server.create("list", { name: "Work" });
      server.create("reminder", { list: workList, text: "Visit bank" });
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

      this.get(
        `${listPath}/:id/reminders`,
        ({ lists }, { params }) => lists.find(params.id).reminders
      );
    },
  });
}
