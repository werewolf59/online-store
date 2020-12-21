-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 22 2020 г., 23:02
-- Версия сервера: 10.3.13-MariaDB-log
-- Версия PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `obuvshop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `category`
--

CREATE TABLE `category` (
  `id` int(11) UNSIGNED NOT NULL,
  `name_cat` varchar(20) NOT NULL,
  `description` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `category`
--

INSERT INTO `category` (`id`, `name_cat`, `description`) VALUES
(1, 'Телефоны', 'Устройство для переговоров, теперь являющийся мини ПК '),
(2, 'Смарт-часы', 'Персональный ПК находящийся на руке'),
(3, 'Поуэрбанк', 'Переносное зарядное устройство для различной техники');

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE `items` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `cat` int(11) UNSIGNED NOT NULL,
  `price` int(4) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `img` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `name`, `cat`, `price`, `description`, `img`) VALUES
(1, 'Apple iPhone 11 Pro Max 512GB', 1, 4567, 'Самый мощный компактный iPhone1 с множеством передовых технологий', 'http://lowprice.hostingem.ru/addimg/1.jpg'),
(2, 'Apple iPhone SE 2020 64GB', 1, 2345, 'Портретный режим и шесть эффектов освещения для фотографий студийного качества', 'http://lowprice.hostingem.ru/addimg/2.jpg'),
(3, 'Xiaomi Mi Note 10 Lite 6/128GB', 1, 5000, 'Почувствуйте эстетическое удовольствие – стильный, инновационный дизайн следующего поколения с изогнутым 3D-покрытием и прочным стеклом.', 'http://lowprice.hostingem.ru/addimg/3.jpg'),
(4, 'Samsung Galaxy A51 4/64GB', 1, 1504, 'Безграничный экран Samsung Galaxy A51 оптимизирует визуальную симметрию.', 'http://lowprice.hostingem.ru/addimg/4.jpg'),
(5, 'Apple Watch Series 3', 2, 1234, 'Умные подсказки про физическую активность. Усовершенствованное приложение \"Пульс\". ', 'http://lowprice.hostingem.ru/addimg/5.jpg'),
(6, 'Samsung Galaxy Watch', 2, 2345, 'Знакомьтесь: ваш проводник в мир персональной эффективности.', 'http://lowprice.hostingem.ru/addimg/6.jpg'),
(7, 'Galaxy Watch Active', 2, 4567, 'Новые Galaxy Watch Active - это не только трекер для отслеживания активности', 'http://lowprice.hostingem.ru/addimg/7.jpg'),
(8, 'Galaxy Watch Active2', 2, 5678, 'Galaxy Watch Active2 — это стильный дизайн и комфорт 24/7. ', 'http://lowprice.hostingem.ru/addimg/8.jpg'),
(9, 'Redmi Power Bank', 3, 6543, 'Популярный на рынке', 'http://lowprice.hostingem.ru/addimg/9.jpg'),
(10, 'Samsung EB-U1200C', 3, 5432, 'Samsung не удивляет, качество на высшем уровне ', 'http://lowprice.hostingem.ru/addimg/10.jpg'),
(11, 'InterStep 10DQi', 3, 4321, 'Взрывная новинка на нашем сайте', 'http://lowprice.hostingem.ru/addimg/11.jpg'),
(12, 'Mi Wireless PB', 3, 3210, 'Одни из первых используют беспроводную зарядку', 'http://lowprice.hostingem.ru/addimg/12.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `fio` varchar(100) NOT NULL,
  `number` varchar(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `order_product`
--

CREATE TABLE `order_product` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `count` int(11) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_cat` (`name_cat`);

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `order_product`
--
ALTER TABLE `order_product`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
