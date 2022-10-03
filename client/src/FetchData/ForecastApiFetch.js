
export const url = (type,city) => {
    return `http://localhost:3080/${type}/${city}`
}

export const getForecast = async (url) => {
    try {
        const response = await fetch(url)
        const temp =  await response.json()
        return await temp
    } catch (e) {
        throw e
    }
}


export const sendMessageWS = (message, urlString) => {
    let socket = new WebSocket(urlString)

    socket.onopen = () => {
        alert("[open] Connection established");
        alert("Sending to server");
        socket.send(message);
    };

    socket.onmessage = (e) => {
        alert(`[message] Data received from server: ${e.data}`);
    };

    socket.onclose = (e) => {
        if (e.wasClean) {
            alert(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`);
        } else {
            alert('[close] Connection died');
        }
    };

    socket.onerror = (error) => {
        alert(`[error] ${error.message}`);
    };
}