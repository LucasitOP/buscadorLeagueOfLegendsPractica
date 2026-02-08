/**
 * Cliente Web asíncrono para búsqueda de campeones de League of Legends.
 */

const API_URL = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json';
const IMG_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/';

// Inicializa el formulario de búsqueda y su evento submit.
/**
 * @fileoverview Cliente Web asíncrono para búsqueda de campeones de League of Legends.
 */

/**
 * Tipado simple para un campeón.
 * @typedef {Object} Champion
 * @property {string} id
 * @property {string} name
 * @property {string} [title]
 * @property {string} [blurb]
 * @property {string[]} [tags]
 */

/**
 * Inicializa el manejador del formulario de búsqueda.
 * Evita añadir múltiples listeners usando un flag en el dataset.
 * @returns {void}
 */
export function initApp() {
    const searchForm = document.getElementById('search-form');
    if (searchForm && !searchForm.dataset.listenerSet) {
        searchForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const input = document.getElementById('champ-input');
            const query = input ? input.value.trim() : '';
            if (query) await getChampionData(query);
        });
        searchForm.dataset.listenerSet = 'true';
    }
}

// Obtiene la lista de campeones y muestra la tarjeta del campeón buscado.
/**
 * Recupera datos de campeones y muestra la tarjeta del campeón buscado.
 * Muestra indicadores de carga y gestiona mensajes de error en el DOM.
 * @param {string} name Nombre del campeón a buscar (sensible a mayúsculas/ minúsculas).
 * @returns {Promise<void>}
 */
export async function getChampionData(name) {
    const loadingIndicator = document.getElementById('loading');
    const resultContainer = document.getElementById('result-container');
    const errorMessage = document.getElementById('error-message');

    if (loadingIndicator) loadingIndicator.classList.remove('hidden');
    if (resultContainer) resultContainer.innerHTML = '';
    if (errorMessage) errorMessage.classList.add('hidden');

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error de red: ${response.status}`);

        const dataJson = await response.json();
        const allChampions = dataJson.data || {};

        const champKey = Object.keys(allChampions).find(
            key => key.toLowerCase() === name.toLowerCase()
        );

        if (!champKey) throw new Error(`El campeón "${name}" no existe.`);

        renderChampionCard(allChampions[champKey], resultContainer);

    } catch (error) {
        if (errorMessage) {
            errorMessage.textContent = error.message;
            errorMessage.classList.remove('hidden');
        }
    } finally {
        if (loadingIndicator) loadingIndicator.classList.add('hidden');
    }
}

// Renderiza la tarjeta del campeón en el contenedor proporcionado.
/**
 * Renderiza la tarjeta del campeón en el contenedor proporcionado.
 * @param {Champion} champ Objeto con los datos básicos del campeón.
 * @param {HTMLElement} container Nodo donde se insertará la tarjeta.
 * @returns {void}
 */
function renderChampionCard(champ, container) {
    if (!container) return;
    const card = document.createElement('div');
    card.className = 'champ-card';
    const tagsText = (champ.tags && champ.tags.length) ? champ.tags.join(', ') : '';
    card.innerHTML = `
        <img src="${IMG_BASE_URL}${champ.id}.png" alt="${champ.name}">
        <h2>${champ.name}</h2>
        <p><em>${champ.title || ''}</em></p>
        <p class="champ-blurb">${champ.blurb || ''}</p>
        ${tagsText ? `<p class="champ-tags">Roles: ${tagsText}</p>` : ''}
    `;
    container.appendChild(card);
}

if (typeof window !== 'undefined') {
    initApp();
}