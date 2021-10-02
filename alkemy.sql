-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-10-2021 a las 23:30:50
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alkemy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `age` int(11) NOT NULL,
  `weight` double NOT NULL,
  `story` varchar(255) DEFAULT 'Sin historia determinada'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `characters`
--

INSERT INTO `characters` (`id`, `name`, `image`, `age`, `weight`, `story`) VALUES
(2, 'Mickey', 'mickey', 20, 42.5, 'La historia de Mickey'),
(4, 'Goofy', 'goofy', 17, 14.6, 'La historia de Goofy'),
(6, 'Donald', 'example', 5, 10.5, 'example story'),
(7, 'Daisy', 'example', 5, 10.5, 'example story'),
(8, 'Raton perez', 'example2', 5, 10.5, 'example story');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `characters_movies`
--

CREATE TABLE `characters_movies` (
  `id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `characters_movies`
--

INSERT INTO `characters_movies` (`id`, `character_id`, `movie_id`, `createdAt`, `updatedAt`) VALUES
(29, 2, 17, '2021-10-01', '2021-10-01'),
(30, 4, 17, '2021-10-01', '2021-10-01'),
(33, 6, 17, '2021-10-01', '2021-10-01'),
(34, 7, 17, '2021-10-01', '2021-10-01'),
(35, 6, 14, '2021-10-01', '2021-10-01'),
(41, 2, 20, '2021-10-02', '2021-10-02'),
(42, 7, 20, '2021-10-02', '2021-10-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genres`
--

INSERT INTO `genres` (`id`, `name`, `image`) VALUES
(2, 'Drama', 'www.drama.com'),
(3, 'Horror', 'horror.com'),
(4, 'Comedy', 'comedy.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `calification` int(10) NOT NULL,
  `genre_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies`
--

INSERT INTO `movies` (`id`, `name`, `image`, `created_at`, `calification`, `genre_id`) VALUES
(14, 'La historia sin fin', 'www.historiadedisney.com', '2021-09-21', 5, 4),
(17, 'Aventuras mickey', 'example', '2021-09-21', 5, 3),
(19, 'Disney', 'example', '2021-09-21', 5, 4),
(20, 'La historia de Disney 9', 'example', '2021-01-01', 1, 4),
(21, 'La historia de Disney 15', 'example', '2021-09-21', 1, 4),
(22, 'La historia de Disney 16', 'example', '2021-09-21', 1, 4),
(23, 'La historia de Disney 20', 'example', '2021-09-21', 1, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `characters_movies`
--
ALTER TABLE `characters_movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `characters_movies_ibfk_1` (`character_id`),
  ADD KEY `characters_movies_ibfk_2` (`movie_id`);

--
-- Indices de la tabla `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `characters_movies`
--
ALTER TABLE `characters_movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT de la tabla `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `characters_movies`
--
ALTER TABLE `characters_movies`
  ADD CONSTRAINT `characters_movies_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `characters_movies_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
