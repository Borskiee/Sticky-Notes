  let body = document.getElementById("noteList");
body.addEventListener("click", function(event) {
 let addButton = event.target.closest(".leftBTN");
 if (addButton) {
  body.innerHTML += `<div class="notes">
      <header>
        <!-- Yellow header you can see at the top. -->
        <button class="leftBTN"><span class="buttonSymbol">+</span></button>
        <div class="right-group">
          <button class="rightBTN">
            <span class="buttonSymbol">...</span>
          </button>
          <button class="rightBTNx">✕</button>
        </div>
      </header>
      <main>
        <!-- Where you can input your text. -->
        <textarea class="textInput"></textarea>
      </main>
      <footer> <!-- Interactive Buttons -->
        <div>
          <button class="bold">𝗕</button>
          <button class="italic">𝐼</button>
          <button class="">U̲</button>
          <button class="">̶a̶b̶</button>
          <button class="">
            <i class="fa fa-list-ul" aria-hidden="true"></i>
          </button>
          <button class="">
            <i class="fa fa-picture-o" aria-hidden="true"></i>
          </button>
        </div>
      </footer>
    </div>`
 }
})

body.addEventListener("click", function(event) {
  let deleteBTN = event.target.closest(".rightBTNx");
  if (deleteBTN) {let note = deleteBTN.closest(".notes"); note.remove()}
})