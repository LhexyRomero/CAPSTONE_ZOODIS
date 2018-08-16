-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2018 at 07:16 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zoodis`
--

-- --------------------------------------------------------

--
-- Table structure for table `animaltaxo_t`
--

CREATE TABLE `animaltaxo_t` (
  `animalTaxoID` int(11) NOT NULL,
  `phylum` varchar(255) NOT NULL DEFAULT '',
  `class` varchar(255) NOT NULL,
  `orderr` varchar(255) NOT NULL,
  `family` varchar(255) NOT NULL,
  `genus` varchar(255) NOT NULL,
  `species` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `animaltaxo_t`
--

INSERT INTO `animaltaxo_t` (`animalTaxoID`, `phylum`, `class`, `orderr`, `family`, `genus`, `species`) VALUES
(1, 'Chordata', 'Mammalia', 'Carnivora', 'Canidae', 'Canis', 'Lupus'),
(2, 'Chordata', 'Mammalia', 'Carnivora', 'Felidae', 'Felis', 'domesticus'),
(3, 'Chordata', 'Mammalia', 'Perissodactyla', 'Equidae', 'Equus', 'caballus'),
(4, 'Chordata', 'Mammalia', 'Primates', 'Cebidae', 'Macaca', 'fascicularis'),
(5, 'Chordata', 'Mammalia', 'Artiodactyla', 'Bovidae', 'Capra', 'aegagrus'),
(6, 'Chordata', 'Aves', 'Galliformes', 'Phasianidae', 'Gallus', 'gallus'),
(7, 'Chordata', 'Mammalia', 'Artiodactyla', 'Suidae', 'Sus', 'scrofa'),
(8, 'Chordata', 'Mammalia', 'Rodentia', 'Muridae', 'Rattus', 'rattus'),
(9, 'strPhylum', 'strClass', 'strOrder', 'strFamily', 'strGenus', 'strSpecies'),
(10, 'ak', 'k', 'k', 'a', 'a', 'a'),
(11, 'q', 'q', 'q', 'q', 'q', 'q'),
(12, 'e', 'e', 'e', 'e', 'e', 'e'),
(13, 'c', 'c', 'c', 'c', 'c', 'c'),
(14, 'g', 'g', 'ggg', 'g', 'g', 'g'),
(15, 'g', 'k', 'l', 'm', 'p', 'p');

-- --------------------------------------------------------

--
-- Table structure for table `animal_t`
--

CREATE TABLE `animal_t` (
  `animalID` int(11) NOT NULL,
  `animalName` varchar(255) NOT NULL,
  `animalScientificName` varchar(255) NOT NULL,
  `animalBodySite` varchar(255) NOT NULL,
  `animalTaxoID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `animal_t`
--

INSERT INTO `animal_t` (`animalID`, `animalName`, `animalScientificName`, `animalBodySite`, `animalTaxoID`) VALUES
(1, 'Dog', 'Canis lupus', 'a', 1),
(2, 'Cat', 'Felis domesticus', 'a', 2),
(3, 'Horse', 'Equus caballus', 'a', 3),
(4, 'Monkey', 'Macaca fascicularis', 'a', 4),
(5, 'Rat', 'Rattus rattus', 'a', 8),
(6, 'Rat', 'Rattus rattus', 'a', 8),
(7, 'Dog', 'Canis lupus', 'Gut', 1),
(8, 'Goat', 'Capra aegagrus', 'a', 5),
(9, 'q', 'q q', 'q', 11),
(10, 'e', 'e e', 'e', 12),
(11, 'c', 'c c', 'c', 13);

-- --------------------------------------------------------

--
-- Table structure for table `bacteriataxo_t`
--

CREATE TABLE `bacteriataxo_t` (
  `bacteriumTaxoID` int(11) NOT NULL,
  `phylum` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `orderr` varchar(255) NOT NULL,
  `family` varchar(255) NOT NULL,
  `genus` varchar(255) NOT NULL,
  `species` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bacteriataxo_t`
--

INSERT INTO `bacteriataxo_t` (`bacteriumTaxoID`, `phylum`, `class`, `orderr`, `family`, `genus`, `species`) VALUES
(1, 'Actinobacteria', 'Actinobacteria', 'Bifidobacteriales', 'Bifididobacteriaceae', 'Bifidobacterium', 'longum'),
(2, 'Bacteroidetes', 'Bacteroidia', 'Bacteroidales', 'Bacteroidaceae', 'Bacteroides', 'ovatus'),
(3, 'Firmicutes', 'Bacili', 'Lactobacillales', 'Lactobacillaceae', 'Lactobacillus ', 'acidophilus'),
(4, 'Bacteroidetes', 'Bacteroidia', 'Bacteroidales', 'Bacteroidaceae', 'Bacteroides', 'uniformis'),
(5, 'Firmicutes', 'Clostridia', 'Clostridiales', 'Clostridiaceae', 'Clostridium', 'perfringens'),
(6, 'Firmicutes', 'Bacili', 'Lactobacillales', 'Lactobacillaceae', 'Lactobacillus ', 'casei'),
(7, 'Firmicutes', 'Bacili', 'Lactobacillales', 'Lactobacillaceae', 'Lactobacillus ', 'plantarum'),
(9, 'b', 'b', 'b', 'b', 'b', 'b'),
(10, 'cde', 'd', 'd', 'dd', 'dd', 'dd'),
(11, 'eddddddddddddddd', 'e', 'e', 'e', 'e', 'e'),
(12, 'r', 'r', 'r', 'r', 'r', 'r'),
(13, 'z', 'z', 'z', 'z', 'z', 'z'),
(14, 'faaaaaaaaaaaaa', 'f', 'fff', 'f', 'f', 'f'),
(15, 'jj', 'j', 'j', 'jj', 'jjjjj', 'jjj');

-- --------------------------------------------------------

--
-- Table structure for table `bacteria_t`
--

CREATE TABLE `bacteria_t` (
  `bacteriumID` int(11) NOT NULL,
  `bacteriumSpeciesName` varchar(255) NOT NULL,
  `bacteriumGenusName` varchar(255) NOT NULL,
  `bacteriumScientificName` varchar(255) NOT NULL,
  `bacteriumTissueSpecifity` varchar(255) NOT NULL,
  `bacteriumSampleType` varchar(255) NOT NULL,
  `bacteriumIsolation` varchar(255) NOT NULL,
  `bacteriumIdentification` varchar(255) NOT NULL,
  `bacteriumGramStain` varchar(255) NOT NULL,
  `bacteriumCellLength` varchar(255) NOT NULL,
  `bacteriumCellWidth` varchar(255) NOT NULL,
  `bacteriumCellShape` varchar(255) NOT NULL,
  `bacteriumMotility` varchar(255) NOT NULL,
  `animalID` int(11) NOT NULL,
  `bacteriumTaxoID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bacteria_t`
--

INSERT INTO `bacteria_t` (`bacteriumID`, `bacteriumSpeciesName`, `bacteriumGenusName`, `bacteriumScientificName`, `bacteriumTissueSpecifity`, `bacteriumSampleType`, `bacteriumIsolation`, `bacteriumIdentification`, `bacteriumGramStain`, `bacteriumCellLength`, `bacteriumCellWidth`, `bacteriumCellShape`, `bacteriumMotility`, `animalID`, `bacteriumTaxoID`) VALUES
(1, 'z', 'z', 'z z', 'a', 'a', 'a', 'a', 'Positive', '1', '1', 'a', 'a', 10, 13),
(2, 'b', 'z', 'z b', 'a', 'a', 'a', 'a', 'Positive', '1', '1', 'a', 'a', 10, 9),
(3, 'f', 'z', 'z f', 'a', 'a', 'a', 'a', 'Positive', '1', '1', 'a', 'a', 10, 14),
(4, 'b', 'z', 'z b', 'a', 'a', 'a', 'a', 'Positive', '1', '1', 'a', 'a', 10, 9),
(5, 'b', 'z', 'z b', 'a', 'a', 'a', 'a', 'Positive', '1', '1', 'a', 'a', 10, 9),
(6, 'b', 'z', 'z b', 'a', 'a', 'a', 'a', 'Positive', '1', '1', 'a', 'a', 10, 9),
(7, 'b', 'z', 'z b', 'a', 'a', 'a', 'a', 'Positive', '1', '1', 'a', 'a', 10, 9),
(8, 'dd', 'z', 'z dd', 'a', 'a', 'a', 'a', 'Positive', '1', '1', 'a', 'a', 10, 10),
(9, 'b', 'z', 'z b', 'a', 'a', 'a', 'a', 'Positive', '1', '1', 'a', 'a', 10, 9);

-- --------------------------------------------------------

--
-- Table structure for table `disease_t`
--

CREATE TABLE `disease_t` (
  `diseaseID` int(11) NOT NULL,
  `diseaseName` varchar(255) NOT NULL,
  `diseaseDesc` text NOT NULL,
  `symptoms` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `disease_t`
--

INSERT INTO `disease_t` (`diseaseID`, `diseaseName`, `diseaseDesc`, `symptoms`) VALUES
(1, 'a', 'a', 'fkkkkkkkkp'),
(2, 'ak', 'a', 'bdee'),
(3, 'agik', 'a', 'a,,,,,,,,,'),
(4, 'bobo', 'kalll', 'boboo:ng :buhay:koa');

-- --------------------------------------------------------

--
-- Table structure for table `toxin_t`
--

CREATE TABLE `toxin_t` (
  `toxinID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `structureFeature` text NOT NULL,
  `function` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `toxin_t`
--

INSERT INTO `toxin_t` (`toxinID`, `name`, `structureFeature`, `function`) VALUES
(1, 'aaaaaaaaaaaaaa', 'a', 'a'),
(2, 'b', 'b', 'b'),
(3, 'e', 'e', 'e');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animaltaxo_t`
--
ALTER TABLE `animaltaxo_t`
  ADD PRIMARY KEY (`animalTaxoID`);

--
-- Indexes for table `animal_t`
--
ALTER TABLE `animal_t`
  ADD PRIMARY KEY (`animalID`),
  ADD KEY `animal_t_ibfk_1` (`animalTaxoID`);

--
-- Indexes for table `bacteriataxo_t`
--
ALTER TABLE `bacteriataxo_t`
  ADD PRIMARY KEY (`bacteriumTaxoID`);

--
-- Indexes for table `bacteria_t`
--
ALTER TABLE `bacteria_t`
  ADD PRIMARY KEY (`bacteriumID`),
  ADD KEY `bateria_fk` (`animalID`),
  ADD KEY `bacteriumTaxoID` (`bacteriumTaxoID`);

--
-- Indexes for table `disease_t`
--
ALTER TABLE `disease_t`
  ADD PRIMARY KEY (`diseaseID`);

--
-- Indexes for table `toxin_t`
--
ALTER TABLE `toxin_t`
  ADD PRIMARY KEY (`toxinID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animaltaxo_t`
--
ALTER TABLE `animaltaxo_t`
  MODIFY `animalTaxoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `animal_t`
--
ALTER TABLE `animal_t`
  MODIFY `animalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `bacteriataxo_t`
--
ALTER TABLE `bacteriataxo_t`
  MODIFY `bacteriumTaxoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `bacteria_t`
--
ALTER TABLE `bacteria_t`
  MODIFY `bacteriumID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `disease_t`
--
ALTER TABLE `disease_t`
  MODIFY `diseaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `toxin_t`
--
ALTER TABLE `toxin_t`
  MODIFY `toxinID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `animal_t`
--
ALTER TABLE `animal_t`
  ADD CONSTRAINT `animal_t_ibfk_1` FOREIGN KEY (`animalTaxoID`) REFERENCES `animaltaxo_t` (`animalTaxoID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `bacteria_t`
--
ALTER TABLE `bacteria_t`
  ADD CONSTRAINT `bacteria_t_ibfk_1` FOREIGN KEY (`bacteriumTaxoID`) REFERENCES `bacteriataxo_t` (`bacteriumTaxoID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `bateria_fk` FOREIGN KEY (`animalID`) REFERENCES `animal_t` (`animalID`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
