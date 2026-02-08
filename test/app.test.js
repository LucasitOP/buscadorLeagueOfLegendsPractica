/** @jest-environment jsdom */
import { jest } from '@jest/globals';
import { getChampionData, initApp } from '../js/app.js';

describe('Pruebas de la aplicación LoL', () => {
    
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="search-form"><input id="champ-input"></form>
            <div id="loading" class="hidden"></div>
            <div id="error-message" class="hidden"></div>
            <section id="result-container"></section>
        `;
        global.fetch = jest.fn();
    });

    afterEach(() => { jest.restoreAllMocks(); });

    test('Debe mostrar un campeón si la búsqueda es correcta', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: { "Ahri": { id: "Ahri", name: "Ahri", title: "Nine-Tailed Fox" } }
            })
        });

        await getChampionData('Ahri');
        expect(document.getElementById('result-container').innerHTML).toContain('Ahri');
    });

    test('Debe gestionar errores si el campeón no existe', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: {} })
        });

        await getChampionData('Inexistente');
        expect(document.getElementById('error-message').classList.contains('hidden')).toBe(false);
    });

    test('Caso extremo: No debe fallar si el DOM está incompleto', async () => {
        document.body.innerHTML = ''; // Borramos todo
        global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ data: {} }) });
        
        await expect(getChampionData('Ahri')).resolves.not.toThrow();
    });

    test('Debe disparar la búsqueda desde el formulario', async () => {
        initApp();
        const input = document.getElementById('champ-input');
        input.value = 'Ahri';
        
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: { "Ahri": { id: "Ahri" } } })
        });

        document.getElementById('search-form').dispatchEvent(new window.Event('submit'));
        await new Promise(process.nextTick);
        expect(global.fetch).toHaveBeenCalled();
    });
});