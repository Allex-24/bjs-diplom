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
	ApiConnector.getStocks((responseBody) => {
		ratesBoard.clearTable(); // очищаем таблицу
		ratesBoard.fillTable(responseBody.data); // заполняем таблицу полученными данными
	});
}

getCurrencyRates(); // Вызываем функцию для получения текущих валют

setInterval(getCurrencyRates, 60000); // Устанавливаем интервал для выполнения функции раз в минуту


// Операции с деньгами

// Создание объекта типа MoneyManager
const moneyManager = new MoneyManager();

// Реализация пополнения баланса
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			const message = `Баланс пополнен на ${data.amount} ${data.currency}`;
			moneyManager.setMessage(true, message);
		} else {
			const message = response.error || 'Ошибка пополнения баланса';
			moneyManager.setMessage(false, message);
		}
	});
};

// Реализация конвертирования валюты
moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			const message = `Вы конвертировали ${data.fromAmount} ${data.fromCurrency} в ${response.data.toAmount} ${response.data.toCurrency}`;
			moneyManager.setMessage(true, message);
		} else {
			const message = response.error || 'Ошибка конвертации валюты';
			moneyManager.setMessage(false, message);
		}
	});
};

// Реализация перевода валюты
moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			const message = `Вы перевели ${data.amount} ${data.currency} пользователю с id ${data.to}`;
			moneyManager.setMessage(true, message);
		} else {
			const message = response.error || 'Ошибка перевода валюты';
			moneyManager.setMessage(false, message);
		}
	});
};


// Работа с избранным

// Создание объекта типа FavoritesWidget
const favoritesWidget = new FavoritesWidget();

// Запрос начального списка избранного
ApiConnector.getFavorites(response => {
	if (response.success) {
		favoritesWidget.clearTable(); // очищаем таблицу
		favoritesWidget.fillTable(response.data); // заполняем таблицу полученными данными
		favoritesWidget.updateUsersList(response.data); // заполняем выпадающий список для перевода денег
	}
});

// Реализация добавления пользователя в список избранных
favoritesWidget.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			favoritesWidget.clearTable(); // очищаем таблицу
			favoritesWidget.fillTable(response.data); // заполняем таблицу полученными данными
			favoritesWidget.updateUsersList(response.data); // заполняем выпадающий список для перевода денег
			const message = `Пользователь с id ${data.id} добавлен в список избранных`;
			favoritesWidget.setMessage(true, message);
		} else {
			const message = response.error || 'Ошибка добавления пользователя в список избранных';
			favoritesWidget.setMessage(false, message);
		}
	});
};

// Реализация удаления пользователя из списка избранных
favoritesWidget.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			favoritesWidget.clearTable(); // очищаем таблицу
			favoritesWidget.fillTable(response.data); // заполняем таблицу полученными данными
			favoritesWidget.updateUsersList(response.data); // заполняем выпадающий список для перевода денег
			const message = `Пользователь с id ${data} удален из списка избранных`;
			favoritesWidget.setMessage(true, message);
		} else {
			const message = response.error || 'Ошибка удаления пользователя из списка избранных';
			favoritesWidget.setMessage(false, message);
		}
	});
};
