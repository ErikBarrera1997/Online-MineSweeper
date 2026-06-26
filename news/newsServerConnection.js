async function getRandomNews(keyword = 'accidentes') {
    // Apuntamos al proxy para no exponer la API Key en el cliente
    const url = `news/getNewsProxy.php?q=${encodeURIComponent(keyword)}`;

    try {
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            const errorText = await respuesta.text();
            console.error("Respuesta del servidor no válida:", errorText);
            throw new Error(`Error en el proxy: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();

        if (!datos.articles || datos.articles.length === 0) {
            throw new Error("No news found for the specified category and keyword.");
        }

        const index = Math.floor(Math.random() * datos.articles.length);
        const news = datos.articles[index];

        // Returns an object with the title and link of the news article
        return {
            title: news.title,
            link: news.url
        };
    } catch (error) {
        console.error("Error fetching news:", error);
        return null;
    }
}
