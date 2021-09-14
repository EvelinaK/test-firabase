
import { database } from "../firebase/firebase.js";

const db = database.ref("/products");
class StoreService {


  getAll() {
    return db;
  }

  getProduct(key) {
    return db.child(key);
  }

  removeProduct(key) {
    return db.child(key).remove();
  }

  updateProduct(key, value) {
    debugger;
    return db.child(key).update(value);
  }

  createProduct(data) {
    debugger;
    return db.push(data);
  }
}

export default new StoreService();
