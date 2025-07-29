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

function createNote(color = "yellow", html = "") {
  const colorObj = COLORS.find(c => c.name === color) || COLORS[0];
  const note = document.createElement("div");
  note.className = "note";
  note.style.position = "absolute";
  note.style.top = (Math.random() * 300 + 60) + "px";
  note.style.left = (Math.random() * 300 + 60) + "px";

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
    <div class="note-content" contenteditable="true">${html}</div>
    <div class="note-footer">
      <button title="Bold"><b>B</b></button>
      <button title="Italic"><i>I</i></button>
      <button title="Underline"><u>U</u></button>
      <button title="Strikethrough"><s>S</s></button>
      <button title="List"><i class="fa fa-list-ul"></i></button>
      <button title="Image"><i class="fa fa-picture-o"></i></button>
      <div class="resize-handle"></div>
    </div>
  `;


  // Toggle color palette
  note.querySelector(".color-btn").onclick = () => {
    const palette = note.querySelector(".note-colors");
    palette.style.display = palette.style.display === "flex" ? "none" : "flex";
  };

  // Change color
  note.querySelectorAll(".note-colors button").forEach(btn => {
    btn.onclick = () => {
      const selected = btn.getAttribute("data-color");
      const header = note.querySelector(".note-header");
      COLORS.forEach(c => header.classList.remove(c.class));
      header.classList.add(COLORS.find(c => c.name === selected).class);
      note.querySelector(".note-colors").style.display = "none";

      // Update active color for footer buttons
      const activeColor = window.getComputedStyle(header).backgroundColor;
      note.querySelectorAll(".note-footer button").forEach(b => {
        b.style.setProperty('--active-btn-color', activeColor);
      });
    };
  });

  // Delete
  note.querySelector(".delete-btn").onclick = () => note.remove();

  // Rich text formatting
  const content = note.querySelector(".note-content");
  const header = note.querySelector(".note-header");
  const footerButtons = note.querySelectorAll(".note-footer button[title]");

  footerButtons.forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();

      // Remove 'active' from all buttons
      footerButtons.forEach(b => b.classList.remove("active"));

      // Add 'active' to the clicked button
      btn.classList.add("active");

      // Focus back to contenteditable div (keeps caret in place)
      content.focus();

      // Run formatting command
      const cmd = btn.title;
      if (cmd === "Bold") document.execCommand("bold");
      else if (cmd === "Italic") document.execCommand("italic");
      else if (cmd === "Underline") document.execCommand("underline");
      else if (cmd === "Strikethrough") document.execCommand("strikeThrough");
      else if (cmd === "List") document.execCommand("insertUnorderedList");
      else if (cmd === "Image") {
        const url = prompt("Paste image URL:");
        if (url) document.execCommand("insertImage", false, url);
      }


      
      // Set the active color to match the header
      const activeColor = window.getComputedStyle(header).backgroundColor;
      footerButtons.forEach(b => {
        b.style.setProperty('--active-btn-color', activeColor);
      });
    };
  });

  // Focus new note
  setTimeout(() => content.focus(), 0);

  // Resizing
  const resizeHandle = note.querySelector(".resize-handle");
  let resizing = false, startX, startY, startW, startH;
  resizeHandle.onmousedown = e => {
    e.preventDefault();
    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = note.offsetWidth;
    startH = note.offsetHeight;
    document.body.style.userSelect = "none";
  };
  document.addEventListener("mousemove", e => {
    if (!resizing) return;
    note.style.width = Math.max(200, startW + (e.clientX - startX)) + "px";
    note.style.height = Math.max(120, startH + (e.clientY - startY)) + "px";
  });
  document.addEventListener("mouseup", () => {
    resizing = false;
    document.body.style.userSelect = "";
  });

  return note;
}

// Add note on click
addBtn.onclick = () => {
  notesContainer.appendChild(createNote());
};

// Add a default note
notesContainer.appendChild(createNote());

// Drag logic
document.addEventListener("mousedown", function (e) {
  const header = e.target.closest(".note-header");
  if (!header) return;
  const note = header.closest(".note");
  const shiftX = e.clientX - note.offsetLeft;
  const shiftY = e.clientY - note.offsetTop;
  note.style.zIndex = Date.now();
  function onMouseMove(moveEvent) {
    note.style.left = moveEvent.clientX - shiftX + "px";
    note.style.top = moveEvent.clientY - shiftY + "px";
  }
  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});