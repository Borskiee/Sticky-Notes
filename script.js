const notesContainer = document.getElementById("notes-container");
const addBtn = document.querySelector(".add-btn");

const COLORS = [
  { name: "yellow", class: "header-yellow", btn: "color-yellow" },
  { name: "green",  class: "header-green",  btn: "color-green"  },
  { name: "blue",   class: "header-blue",   btn: "color-blue"   },
  { name: "pink",   class: "header-pink",   btn: "color-pink"   },
  { name: "red",    class: "header-red",    btn: "color-red"    },
  { name: "gray",   class: "header-gray",   btn: "color-gray"   }
];

function createNote(color = "yellow", text = "") {
  const colorObj = COLORS.find(c => c.name === color) || COLORS[0];
  const note = document.createElement("div");
  note.className = "note";

  note.innerHTML = `
    <div class="note-header ${colorObj.class}">
      <span>Sticky Note</span>
      <div class="note-actions">
        <button class="color-btn" title="Change color"><i class="fa fa-paint-brush"></i></button>
        <button class="delete-btn" title="Delete"><i class="fa fa-trash-o"></i></button>
      </div>
    </div>
    <div class="note-colors" style="display:none;">
      ${COLORS.map(c =>
        `<button class="${c.btn}" title="${c.name}" data-color="${c.name}"></button>`
      ).join("")}
    </div>
    <div class="note-content">
      <textarea placeholder="Type your note...">${text}</textarea>
    </div>
    <div class="note-footer">
      <button title="Bold"><b>B</b></button>
      <button title="Italic"><i>I</i></button>
      <button title="Underline"><u>U</u></button>
      <button title="Strikethrough"><s>S</s></button>
      <button title="List"><i class="fa fa-list-ul"></i></button>
      <button title="Image"><i class="fa fa-picture-o"></i></button>
    </div>
  `;

  // Color palette toggle
  note.querySelector(".color-btn").onclick = e => {
    const palette = note.querySelector(".note-colors");
    palette.style.display = palette.style.display === "flex" ? "none" : "flex";
  };

  // Color change
  note.querySelectorAll(".note-colors button").forEach(btn => {
    btn.onclick = e => {
      const selected = btn.getAttribute("data-color");
      const header = note.querySelector(".note-header");
      COLORS.forEach(c => header.classList.remove(c.class));
      header.classList.add(COLORS.find(c => c.name === selected).class);
      note.querySelector(".note-colors").style.display = "none";
    };
  });

  // Delete note
  note.querySelector(".delete-btn").onclick = () => note.remove();

  return note;
}

// Add note on button click
addBtn.onclick = () => {
  notesContainer.appendChild(createNote());
};

// Add a default note on load
notesContainer.appendChild(createNote());