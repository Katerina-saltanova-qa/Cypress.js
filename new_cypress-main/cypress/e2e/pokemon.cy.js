describe('Проверка покупки нового аватара', function () {
	it('Покупка нового аватара для тренера', function () {
		cy.visit('https://pokemonbattle.ru/');
		cy.get('input[id="k_email"]').type('USER_LOGIN'); // вводим логин
		cy.get('input[id="k_password"]').type('USER_PASSWORD'); // вводим пароль
		cy.get('button[type="submit"]').click(); // нажимаем кнопку подтвердить
		cy.wait(2000); //подождать
		cy.get('.header_card_trainer').click(); // нажимаем в шапке на аватарку тренера
		cy.wait(2000); //подождать
		cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); //нажимаем кнопку смена аватара
		cy.get('.available > button').first().click(); //нажимаем кнопку купить у первого аватара
		cy.get('.card_number').type('4465054128356885'); // вводим номер карты
		cy.get('.card_csv').type('125'); //вводим CVV карты
		cy.get('.card_date').type('0833'); //вводим срок действия карты
		cy.get('.card_name').type('NAME'); // вводим имя владельца действия карты
		cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); //нажимаем кнопку оплатить
		cy.get('.threeds_number').type('56456'); //вводим код подтверждения СМС
		cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); //нажимаем кнопку оплатить
		cy.contains('Покупка прошла успешно').should('be.visible'); // проверяем видимость сообщения об успешной покупке
	});
});
