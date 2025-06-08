// Mostrar la categoría seleccionada
const categoriaNombre = localStorage.getItem("categoriaSeleccionada");
document.getElementById("categoriaElegida").textContent = "Categoría seleccionada: " + (categoriaNombre || "ninguna");

// Manejo del formulario para crear el artículo
document.getElementById("formArticulo").addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const contenido = document.getElementById("contenido").value.trim();
  const usuario = JSON.parse(localStorage.getItem("usuario")); // Obtener usuario desde localStorage

  if (!titulo || !contenido || !categoriaNombre || !usuario?._id) {
    alert("Todos los campos son obligatorios, incluido el usuario.");
    return;
  }

  try {
    // Buscar el ID de la categoría por su nombre
    const resCategoria = await fetch(`/api/categoria/nombre/${encodeURIComponent(categoriaNombre)}`);
    const catData = await resCategoria.json();

    if (!resCategoria.ok || !catData._id) {
      alert("No se encontró la categoría.");
      return;
    }

    const categoria_id = catData._id;

    // Enviar el artículo al backend
    const res = await fetch("/api/articulo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        contenido,
        categoria_id,
        usuario_id: usuario._id
      })
    });

    const data = await res.json();
    alert(data.mensaje || data.error);

    if (res.ok) {
      document.getElementById("formArticulo").reset();
      window.location.href = "panel.html";
    }

  } catch (err) {
    console.error("Error al publicar:", err);
    alert("Error al conectar con el servidor.");
  }
});
