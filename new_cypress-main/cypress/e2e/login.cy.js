import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

	beforeEach('Начало теста', function () {
		cy.visit('/'); //зашли на сайт
		cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяю цвет кнопки забыли пароль
	});

	afterEach('Конец теста', function () {
		cy.get(result_page.close).should('be.visible'); //есть крестик и он виден для пользователя
	});

	it('Верный логин и верный пароль', function () {
		cy.get(main_page.email).type(data.login); //ввели верный логин
		cy.get(main_page.password).type(data.password); //ввели верный пароль
		cy.get(main_page.login_button).click(); //нажал войти

		cy.get(result_page.title).contains('Авторизация прошла успешно'); //проверяю, что после авторизации вижу текст
		cy.get(result_page.title).should('be.visible'); //текст виден пользователю
	})

	it('Проверка восстановления пароля', function () {
		cy.get(main_page.fogot_pass_btn).click(); //нажимаю забыли пароль
		cy.get(recovery_page.email).type('german@dolnikov.ru'); //ввели почту для восстановления
		cy.get(recovery_page.send_button).click(); //нажимаю на кнопку отправить код

		cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); //проверяю, что после нажатия вижу текст
		cy.get(result_page.title).should('be.visible'); //текст виден пользователю
	})

	it('Верный логин и неверный пароль', function () {
		cy.get(main_page.email).type(data.login); //ввели верный логин
		cy.get(main_page.password).type('iLoveqastudio10'); //ввели неверный пароль
		cy.get(main_page.login_button).click(); //нажал войти

		cy.get(result_page.title).contains('Такого логина или пароля нет'); //проверяю, что после авторизации вижу текст
		cy.get(result_page.title).should('be.visible'); //текст виден пользователю
	})

	it('Неверный логин и верный пароль', function () {
		cy.get(main_page.email).type('german@kotik.ru'); //ввели неверный логин
		cy.get(main_page.password).type(data.password); //ввели верный пароль
		cy.get(main_page.login_button).click(); //нажал войти

		cy.get(result_page.title).contains('Такого логина или пароля нет'); //проверяю, что после авторизации вижу текст
		cy.get(result_page.title).should('be.visible'); //текст виден пользователю
	})

	it('Проверка валидации - в логине есть @', function () {
		cy.get(main_page.email).type('germandolnikov.ru'); //ввели логин без @
		cy.get(main_page.password).type(data.password); //ввели верный пароль
		cy.get(main_page.login_button).click(); //нажал войти

		cy.get(result_page.title).contains('Нужно исправить проблему валидации'); //проверяю, что после авторизации вижу текст
		cy.get(result_page.title).should('be.visible'); //текст виден пользователю
	})

	it('Проверка на приведение к строчным буквам в логине', function () {
		cy.get(main_page.email).type('GerMan@Dolnikov.ru'); //ввели верный логин с разным регистром
		cy.get(main_page.password).type(data.password); //ввели верный пароль
		cy.get(main_page.login_button).click(); //нажал войти

		cy.get(result_page.title).contains('Авторизация прошла успешно'); //проверяю, что после авторизации вижу текст
		cy.get(result_page.title).should('be.visible'); //текст виден пользователю
	})
})