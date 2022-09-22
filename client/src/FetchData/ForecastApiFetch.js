
export const url = (city) => {
    return `http://localhost:3080/forecast/${city}`
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


