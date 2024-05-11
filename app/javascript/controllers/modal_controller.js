// app/javascript/controllers/modal_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  open(event) {
    event.preventDefault();
    this.element.classList.remove('hidden');
  }

  close(event) {
    if (event) event.preventDefault();
    this.element.classList.add('hidden');
  }
}
