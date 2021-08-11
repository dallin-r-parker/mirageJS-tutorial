// Welcome to the tutorial!
import { createServer } from "miragejs";

export default function () {
  createServer({
    routes() {
      this.get("/api/reminders", () => ({
        reminders: [
          {id: 1, text: 'Walk the dog'},
          {id: 2, text: 'Walk the cat'},
          {id: 3, text: 'Walk the dogat'}
        ]
      }))
    }
  })
}
