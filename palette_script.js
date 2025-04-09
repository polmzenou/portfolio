const palette = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");
const copyAllBtn = document.getElementById("copyAllBtn");
const exportBtn = document.getElementById("exportBtn");
const gradientBtn = document.getElementById("gradientBtn");
const imageInput = document.getElementById("imageInput");
const imageStatus = document.getElementById("imageStatus");
const colorCountInput = document.getElementById("colorCount");
const colorCountValue = document.getElementById("colorCountValue");
const savedPalettes = document.getElementById("savedPalettes");
const paletteList = document.getElementById("paletteList");

function generateColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

function createPalette(count = 5) {
  palette.innerHTML = "";
  const colors = [];

  for (let i = 0; i < count; i++) {
    const color = generateColor();
    colors.push(color);

    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = color;
    colorBox.title = "Clique pour copier";

    colorBox.onclick = () => {
      navigator.clipboard.writeText(color);
      showAlert(`${color} copié !`);
    };

    const hex = document.createElement("p");
    hex.className = "mt-2 text-sm font-mono";
    hex.textContent = color;

    const container = document.createElement("div");
    container.className = "flex flex-col items-center text-gray-800";
    container.appendChild(colorBox);
    container.appendChild(hex);

    palette.appendChild(container);
  }

  return colors;
}



function showAlert(text) {
  const alert = document.createElement("div");
  alert.textContent = text;
  alert.className = "fixed top-5 right-5 bg-white text-black px-4 py-2 rounded shadow-md animate-fade-in z-50";
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 2000);
}

function savePalette(colors) {
  const name = generateName();
  const paletteItem = document.createElement("div");
  paletteItem.className = "flex flex-col items-center";
  paletteItem.innerHTML = `<div class="color-box" style="background-color: ${colors[0]}"></div><p class="mt-2">${name}</p>`;

  paletteItem.onclick = () => {
    loadPalette(colors);
  };

  paletteList.appendChild(paletteItem);
}

function generateName() {
  const names = ["Ciel", "Océan", "Fleur", "Forêt", "Éclipse", "Lumière"];
  return names[Math.floor(Math.random() * names.length)];
}

let currentColors = createPalette(5);

generateBtn.addEventListener("click", () => {
  currentColors = createPalette(parseInt(colorCountInput.value));
});

colorCountInput.addEventListener("input", (e) => {
  colorCountValue.textContent = e.target.value;
  currentColors = createPalette(parseInt(e.target.value));
});

copyAllBtn.addEventListener("click", () => {
  const text = currentColors.join(", ");
  navigator.clipboard.writeText(text);
  showAlert("Palette copiée !");
});

exportBtn.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(currentColors, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "palette.json";
  link.click();

  showAlert("Palette exportée !");
});

gradientBtn.addEventListener("click", () => {
  const gradientColor1 = generateColor();
  const gradientColor2 = generateColor();
  const gradientBox = document.createElement("div");
  gradientBox.className = "gradient-box";
  gradientBox.style.backgroundImage = `linear-gradient(45deg, ${gradientColor1}, ${gradientColor2})`;
  gradientBox.textContent = `Dégradé : ${gradientColor1} → ${gradientColor2}`;
  palette.appendChild(gradientBox);
});

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.src = event.target.result;
      img.onload = function() {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        const paletteColors = colorThief.getPalette(img, 5);

        imageStatus.textContent = "Couleurs extraites de l'image !";
        currentColors = paletteColors.map(color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        createPalette(currentColors.length);
      };
    };
    reader.readAsDataURL(file);
  }
});

window.addEventListener("load", () => {
  currentColors = createPalette(parseInt(colorCountInput.value));
});
