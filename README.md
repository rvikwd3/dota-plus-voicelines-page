<a href="https://dota-plus-voiceline-webpage.netlify.app/"><h1 style="text-align: center">Dota Plus Voicelines Page</h1></a>

A registry of Dota Plus Voicelines to be copied and used with a streamer's Dota Voiceline OBS Browser Source.

### Current flow execution:

1. The OBS Streamer Dota Voiceline Browser Source hosts the WebSocket server. The WebSocket server is connected to two clients:  
    * **Browser Source Voiceline Display Client**  
    This is the Browser Source itself. It displays the voiceline when it receives a WebSocket message of a `!chatwheel` command.
    * **Firebot WebSocket Client**  
    A broadcaster client that broadcasts the `!chatwheel` command to any connected WebSocket clients.
2. [Firebot](https://firebot.app/) runs a script whenever it detectes a `!chatwheel` command in twitch chat. The script broadcasts a WebSocket message to all connected clients.
3. OBS Browser Source receives the broadcasted WebSocket message.
4. OBS Browser Source parses the WebSocket message.
5. On parsing the message, it generates a voiceline HTML element and loads the voiceline audio.
6. The generated voiceline HTML element is displayed and the voiceline audio is played within the OBS Browser Source.

## Webpage Dependencies
* [Typescript](https://reactjs.org/)
* [React](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Vite](https://vitejs.dev/) bundler