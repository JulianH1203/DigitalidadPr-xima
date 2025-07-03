function drawViz(data, element) {
  // Accede a la primera fila de la tabla
  const record = data.tables.DEFAULT[0];

  // Crea el contenedor visual
  const container = document.createElement("div");
  container.style.cssText = `
    width:100%; height:100px; position:relative; overflow:hidden;
    display:flex; justify-content:center; align-items:center;
    background: linear-gradient(to bottom, #b5dafa, #ffffff);
    border-radius:16px; box-shadow:0 4px 10px rgba(0,0,0,0.15);
    font-family:'Comic Sans MS', cursive, sans-serif;
    text-align:center;
  `;

  // Limpia el contenedor y lo agrega al DOM
  element.innerHTML = "";
  element.appendChild(container);

  // 🟡 OBTIENE el contenido desde la columna `frases_join` y lo divide por salto de línea
  const frasesRaw = record["frases_join"] || "";
  const frases = frasesRaw.split(/\r?\n/).filter(f => f.trim());

  const total = frases.length;
  const animationTime = 35; // segundos
  const perFrase = total > 0 ? animationTime / total : 0;

  frases.forEach((frase, index) => {
    const div = document.createElement("div");
    div.className = "animated-slide";
    div.style.animationDelay = `${index * perFrase}s`;

    const span = document.createElement("span");
    span.className = "animated-text";
    span.innerHTML = frase
      .split("")
      .map((char, i) => `<span style="animation-delay:${i * 0.05}s">${char}</span>`)
      .join("");

    div.appendChild(span);
    container.appendChild(div);
  });
}
