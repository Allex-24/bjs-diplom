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
	} else {
		console.error("Произошла ошибка при получении данных пользователя");
	}
});

