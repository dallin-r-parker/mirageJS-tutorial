// Welcome to the tutorial!
import { createServer, Model } from "miragejs";

export default function () {
  createServer({
    models: {
      reminder: Model
    },
    routes() {
      const path = "/api/reminders";
      this.get("/api/reminders", (schema) => {
        return schema.reminders.all()
      })


      this.post(path, (schema, req) => {
        let attrs = JSON.parse(req.requestBody);
        
        return schema.reminders.create(attrs)
      });
    },
  });
}
