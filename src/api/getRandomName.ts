export const getRandomName = async () => {
    const fetchResponse = await fetch('https://api.randomdatatools.ru/?unescaped=false&params=FirstName');
    const response = await fetchResponse.json();

    return response['FirstName'];
}