async function cargarArticulos() {
  try {
    const res = await fetch("/api/articulo");
    if (!res.ok) throw new Error("Error al cargar artículos");
    const articulos = await res.json();

    const container = document.getElementById("posts-container");
    container.innerHTML = ""; // Limpiar antes

    articulos.forEach(a => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <div class="post-title">${a.titulo}</div>
        <div class="post-content">${a.contenido}</div>
        <div class="post-actions">
          <span class="icon editar" title="Editar">✏️</span>
          <span class="icon eliminar" title="Eliminar">❌</span>
          <span class="icon favorito" title="Favorito">❤️</span>
        </div>
      `;

      // Agregar listeners
      card.querySelector('.editar').addEventListener('click', () => {
        alert(`Editar artículo: ${a.titulo}`);
        // Aquí iría la lógica para editar
      });

      card.querySelector('.eliminar').addEventListener('click', () => {
        if (confirm(`¿Eliminar artículo: ${a.titulo}?`)) {
          // Aquí la lógica para eliminar, por ejemplo llamada fetch DELETE
          alert('Eliminar (pendiente implementar)');
        }
      });

      card.querySelector('.favorito').addEventListener('click', () => {
        alert(`Favorito toggled: ${a.titulo}`);
        // Aquí lógica para marcar/desmarcar favorito
      });

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    alert("No se pudieron cargar los artículos.");
  }
}

cargarArticulos();
