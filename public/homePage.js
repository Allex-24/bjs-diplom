// Выход из личного кабинета

const logoutButton = new LogoutButton();
logoutButton.action = () => {
	ApiConnector.logout(response => {
		if (response.success) {
			location.reload();
		}
	});
};


//  Получение информации о пользователе

ApiConnector.current((responseBody) => {
	if (responseBody.success) {
		ProfileWidget.showProfile(responseBody.data);
	}
});


// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

// Функция для выполнения запроса получения курсов валют
function getCurrencyRates() {
  ApiConnector.getStocks((data) => {
    ratesBoard.clearTable(); // очищаем таблицу
    ratesBoard.fillTable(data); // заполняем таблицу полученными данными
  });
}

getCurrencyRates(); // Вызываем функцию для получения текущих валют

setInterval(getCurrencyRates, 60000); // Устанавливаем интервал для выполнения функции раз в минуту

