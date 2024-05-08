class Panel {
  text;
  id = 0;
  newPanelCreated = false; // Flag to track if new panel has been created

  constructor(text) {
    this.incrementId();
    this.setText(text);
    this.buildPanel();
    this.animate();
  }

  buildPanel() {
    const div = document.createElement("div");
    div.classList.add("panel");
    div.classList.add(this.getId());
    const container = document.querySelector(".container");
    container.appendChild(div);
  }

  incrementId() {
    this.id = this.getId() + 1;
  }

  getId() {
    return this.id;
  }

  animate() {
    const h1 = document.createElement("h1");
    h1.classList.add("panel__text");

    const panel = document.querySelector(".panel");

    panel.appendChild(h1);
    h1.innerText = this.getText();

    const textWidth = h1.offsetWidth;

    h1.style.width = `${textWidth + 100}px`;

    let limit = 800;
    h1.style.left = limit;
    h1.style.opacity = 0;
    let counterLeft = limit;
    const self = this; // Save reference to `this`

    function animateRequested() {
      counterLeft -= 5;
      h1.style.opacity = 1;

      h1.style.left = `${counterLeft}px`;

      if (counterLeft < -200 && !self.newPanelCreated) {
        // Check if new panel can be created
        self.newPanelCreated = true; // Set flag to true to prevent further creations
        self.animate();
      }

      if (counterLeft <= Number(`-${limit}`)) {
        // Animation completed
        // cancelAnimationFrame(animateRequested);
        // self.animate();
        self.newPanelCreated = false;
        const h1s = document.querySelectorAll("h1.panel__text");
        document.querySelector(".panel").removeChild(h1s[0]);
      } else {
        requestAnimationFrame(animateRequested);
      }
    }

    requestAnimationFrame(animateRequested);
  }

  setText(text) {
    this.text = text;
  }

  getText() {
    return this.text;
  }
}

const panel = new Panel("Marcos Junior");
