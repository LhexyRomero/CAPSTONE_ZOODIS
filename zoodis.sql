-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2018 at 04:18 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
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
-- Table structure for table `animalbacteria_t`
--

CREATE TABLE `animalbacteria_t` (
  `animalbacteriaID` int(11) NOT NULL,
  `animalID` int(11) NOT NULL,
  `bacteriumID` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `animalbacteria_t`
--

INSERT INTO `animalbacteria_t` (`animalbacteriaID`, `animalID`, `bacteriumID`, `status`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 3, 1),
(4, 3, 4, 1);

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
  `species` varchar(255) NOT NULL,
  `status` varchar(25) NOT NULL,
  `journalID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL,
  `staffID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `animaltaxo_t`
--

INSERT INTO `animaltaxo_t` (`animalTaxoID`, `phylum`, `class`, `orderr`, `family`, `genus`, `species`, `status`, `journalID`, `dateTime`, `staffID`) VALUES
(1, 'Cordata', 'Aves', 'Anseriformes', 'Anatidae', 'Anas', 'platyrhynchos', 'approved', 11, '2018-10-13 03:52:47', 1),
(2, 'Chordata', 'Mammalia', 'Rodentia', '-', 'Rattus', 'rattus', 'approved', 12, '2018-10-13 03:56:36', 1),
(3, 'Chordata', 'Mammalia', 'Artiodactyla', 'Bovidae', 'Bos', 'taurus', 'approved', 13, '2018-10-13 04:25:25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `animal_t`
--

CREATE TABLE `animal_t` (
  `animalID` int(11) NOT NULL,
  `animalName` varchar(255) NOT NULL,
  `animalScientificName` varchar(255) NOT NULL,
  `animalTaxoID` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  `journalID` int(11) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `animal_t`
--

INSERT INTO `animal_t` (`animalID`, `animalName`, `animalScientificName`, `animalTaxoID`, `image`, `status`, `count`, `journalID`, `staffID`, `dateTime`) VALUES
(1, 'Duck', 'Anas platyrhynchos', 1, 'js\\public\\image_upload\\074414beb239b98.jpeg', 'approved', 0, 11, 1, '2018-10-13 03:54:50'),
(2, 'Rat', 'Rattus rattus', 2, 'js\\public\\image_upload\\693031fac8df3bf.jpeg', 'approved', 0, 12, 1, '2018-10-13 03:38:20'),
(3, 'Cattle', 'Bos taurus', 3, 'js\\public\\image_upload\\3c0a88ed5e08b8e.jpeg', 'approved', 0, 13, 1, '2018-10-13 04:25:39');

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
  `species` varchar(255) NOT NULL,
  `status` varchar(25) NOT NULL,
  `journalID` int(11) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bacteriataxo_t`
--

INSERT INTO `bacteriataxo_t` (`bacteriumTaxoID`, `phylum`, `class`, `orderr`, `family`, `genus`, `species`, `status`, `journalID`, `staffID`, `dateTime`) VALUES
(1, 'Proteobacteria', 'Gammaproteobacteria', 'Enterobacteriales', 'Enterobacteriaceae', 'Salmonella', 'bongori', 'approved', 11, 1, '2018-10-13 03:56:26'),
(2, 'Spirochaetes', 'Spirochaetes', 'Spirochaetales', 'Leptospiraceae', 'Leptospira', 'interrogans', 'approved', 12, 1, '2018-10-13 03:56:41'),
(3, 'Actinobacteria', 'Actinobacteria', 'Actinomycelates', 'Mycobacteriaceae', 'Mycobacterium', 'bovis', 'approved', 13, 1, '2018-10-13 04:25:29'),
(4, 'Actinobacteria', 'Actinobacteria', 'Actinomycelates', 'Mycobacteriaceae', 'Mycobacterium', 'laprae', 'approved', 13, 1, '2018-10-13 04:25:33');

-- --------------------------------------------------------

--
-- Table structure for table `bacteriatoxin_t`
--

CREATE TABLE `bacteriatoxin_t` (
  `bacteriaToxinID` int(11) NOT NULL,
  `bacteriumID` int(11) NOT NULL,
  `toxinID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bacteriatoxin_t`
--

INSERT INTO `bacteriatoxin_t` (`bacteriaToxinID`, `bacteriumID`, `toxinID`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 4, 3),
(4, 3, 4);

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
  `pathogenic` int(11) NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL DEFAULT '0',
  `bacteriumTaxoID` int(11) NOT NULL,
  `journalID` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bacteria_t`
--

INSERT INTO `bacteria_t` (`bacteriumID`, `bacteriumSpeciesName`, `bacteriumGenusName`, `bacteriumScientificName`, `bacteriumTissueSpecifity`, `bacteriumSampleType`, `bacteriumIsolation`, `bacteriumIdentification`, `pathogenic`, `count`, `bacteriumTaxoID`, `journalID`, `status`, `staffID`, `dateTime`) VALUES
(1, 'bongori', 'Salmonella', 'Salmonella bongori', 'Gut Cells, Intestinal epithelium', 'a', 'a', 'a', 0, 0, 1, 11, 'approved', 4, '2018-10-13 03:56:32'),
(2, 'interrogans', 'Leptospira', 'Leptospira interrogans', 'Endothelial Cells', 'a', 'a', 'a', 0, 0, 2, 12, 'approved', 4, '2018-10-13 03:56:51'),
(3, 'laprae', 'Mycobacterium', 'Mycobacterium laprae', 'Epithelial Cells', 'a', 'a', 'a', 0, 0, 4, 13, 'approved', 4, '2018-10-13 04:25:44'),
(4, 'bovis', 'Mycobacterium', 'Mycobacterium bovis', 'Epithelial Cells', 'a', 'a', 'a', 0, 0, 3, 13, 'approved', 4, '2018-10-13 04:25:49');

-- --------------------------------------------------------

--
-- Table structure for table `disease_t`
--

CREATE TABLE `disease_t` (
  `diseaseID` int(11) NOT NULL,
  `bodySite` varchar(50) NOT NULL,
  `diseaseName` varchar(255) NOT NULL,
  `diseaseDesc` text NOT NULL,
  `symptoms` text NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  `journalID` int(11) NOT NULL,
  `status` varchar(25) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `disease_t`
--

INSERT INTO `disease_t` (`diseaseID`, `bodySite`, `diseaseName`, `diseaseDesc`, `symptoms`, `count`, `journalID`, `status`, `staffID`, `dateTime`) VALUES
(1, 'Human Gut', 'Salmonellosis', 'Salmonella infection (salmonellosis) is a common bacterial disease from Salmonella bongori that affects the intestinal tract.  Salnonella produces Cytolethal distending toxin B (CdtB), Salmonella plasmid virulence A (SpvA), & Salmonella plasmid virulence B (SpvB) and typically lives in animal and human intestines and are shed through feces. Humans become infected most frequently through contaminated water or food.', 'Nausea:Vomiting:Abdominal Cramps:Diarrhea:Fever:Blood in the stool:', 0, 11, 'approved', 1, '2018-10-13 03:20:32'),
(2, 'Endothelial Cells', 'Leptospirosis', 'Leptospirosis is a rare bacterial infection we get from animals. It\'s spread through their urine that contain leptospira where haemolysin toxin is present, especially from dogs, rodents, and farm animals. They may not have any symptoms, but they can be carriers. In most cases, leptospirosis is unpleasant but not life-threatening, like a case of the flu.', 'High fever,Headache,Chills,Muscle aches,Vomiting:Jaundice (yellow skin and eyes),Red eyes,Abdominal pain,Diarrhea,Rash', 0, 12, 'approved', 1, '2018-10-13 03:44:14'),
(3, 'Epithelial Cells:Human Gut', 'Tubercolosis', 'Tuberculosis (TB) is a potentially serious infectious disease that mainly affects your lungs. The bacteria that cause tuberculosis is Mycobacterium bova. Mycolactone mlsA1, mlsA2, and mlsB toxins are produced by the bacteria and are spread from one person to another through tiny droplets released into the air via coughs and sneezes.', 'Loss of Appetite:Unintentional weight loss:Chest pain, or pain with breathing or coughing:Coughing up blood:Coughing that lasts three or more weeks:', 0, 13, 'approved', 1, '2018-10-13 04:21:12');

-- --------------------------------------------------------

--
-- Table structure for table `journal_t`
--

CREATE TABLE `journal_t` (
  `journalID` int(11) NOT NULL,
  `code` varchar(25) NOT NULL,
  `name` varchar(255) NOT NULL,
  `doi` varchar(25) NOT NULL,
  `status` varchar(25) NOT NULL,
  `file` varchar(255) NOT NULL,
  `state` varchar(25) NOT NULL,
  `assign` int(11) NOT NULL DEFAULT '0',
  `ownedBy` int(11) NOT NULL DEFAULT '4'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `journal_t`
--

INSERT INTO `journal_t` (`journalID`, `code`, `name`, `doi`, `status`, `file`, `state`, `assign`, `ownedBy`) VALUES
(10, 'none', 'none', 'none', 'none', 'none', 'none', 0, 4),
(11, 'RJ#206', 'Characterization of Gut Microbiome Dynamics in Developing Pekin Ducks and Impact of Management System', '10.3389/fmicb.2016.02125', 'completed', 'js\\public\\others\\cc62abba6f3fa72.pdf', 'noticed', 1, 4),
(12, 'RJ#44', 'Ecology of Leptospira interrogans in Norway Rats (Rattus norvegicus) in an Inner-City Neighborhood of Vancouver, Canada', '10.1371/journal.pntd.0002', 'completed', 'js\\public\\others\\3d620548954a455.pdf', 'read', 1, 4),
(13, 'RJ#72', 'Comparative study of the gut microbiome potentially related to milk protein in Murrah buffaloes (Bubalus bubalis) and Chinese Holstein cattle', '10.1038/srep42189', 'Incomplete', 'js\\public\\others\\81082acb5fdc9f7.pdf', 'noticed', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `prevention_t`
--

CREATE TABLE `prevention_t` (
  `preventionID` int(11) NOT NULL,
  `preventions` text NOT NULL,
  `diseaseID` int(11) NOT NULL,
  `status` varchar(25) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prevention_t`
--

INSERT INTO `prevention_t` (`preventionID`, `preventions`, `diseaseID`, `status`, `staffID`, `dateTime`) VALUES
(1, 'Do not eat or drink foods containing raw eggs, or raw milk:Cook poultry, ground beef, and eggs thoroughly', 1, 'approved', 1, '2018-10-13 03:22:30'),
(2, 'Avoid contaminated water.:Keep away from infected animals, especially wild rats.:Use disinfectant.: Be aware of your surroundings, especially when you travel.', 2, 'approved', 1, '2018-10-13 03:46:45'),
(3, 'Cough Etiquette:Drug Treatment', 3, 'approved', 1, '2018-10-13 04:23:13');

-- --------------------------------------------------------

--
-- Table structure for table `request_t`
--

CREATE TABLE `request_t` (
  `dateTime` varchar(20) NOT NULL,
  `status` varchar(25) NOT NULL,
  `staffName` varchar(255) NOT NULL,
  `addedData` varchar(255) NOT NULL,
  `staffID` int(11) NOT NULL,
  `requestID` int(11) NOT NULL,
  `category` varchar(25) NOT NULL,
  `addedID` int(11) NOT NULL,
  `state` varchar(25) NOT NULL,
  `message` text NOT NULL,
  `assignID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request_t`
--

INSERT INTO `request_t` (`dateTime`, `status`, `staffName`, `addedData`, `staffID`, `requestID`, `category`, `addedID`, `state`, `message`, `assignID`) VALUES
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Anas platyrhynchos', 1, 1, 'Animal Taxonomy', 1, 'noticed', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Salmonella bongori', 1, 2, 'Bacteria Taxonomy', 1, 'noticed', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Anas platyrhynchos', 1, 3, 'Animal', 1, 'noticed', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Salmonella bongori', 1, 4, 'Bacteria', 1, 'noticed', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Typhoid Toxin SpvA', 1, 5, 'Toxin', 1, 'noticed', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Salmonellosis', 1, 6, 'Disease', 1, 'noticed', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Do not eat or drink foods containing raw eggs, or raw milk:Cook poultry, ground beef, and eggs thoroughly', 1, 7, 'Prevention', 1, 'noticed', '', 11),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Rattus rattus', 1, 8, 'Animal Taxonomy', 2, 'noticed', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Leptospira interrogans', 1, 9, 'Bacteria Taxonomy', 2, 'noticed', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Rattus rattus', 1, 10, 'Animal', 2, 'noticed', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Leptospira interrogans', 1, 11, 'Bacteria', 2, 'noticed', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Leptospirosis', 1, 12, 'Disease', 2, 'noticed', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Avoid contaminated water.:Keep away from infected animals, especially wild rats.:Use disinfectant.: Be aware of your surroundings, especially when you travel.', 1, 13, 'Prevention', 2, 'noticed', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Haemolysins', 1, 14, 'Toxin', 2, 'noticed', '', 12),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Bos taurus', 1, 15, 'Animal Taxonomy', 3, 'noticed', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Mycobacterium bovis', 1, 16, 'Bacteria Taxonomy', 3, 'noticed', '', 13),
('2018-10-13 04:25:49', 'approved', 'Lhexy Romero', 'Mycobacterium laprae', 1, 17, 'Bacteria Taxonomy', 4, 'noticed', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Bos taurus', 1, 18, 'Animal', 3, 'noticed', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Mycobacterium laprae', 1, 19, 'Bacteria', 3, 'noticed', '', 13),
('2018-10-13 04:25:49', 'approved', 'Lhexy Romero', 'Mycobacterium bovis', 1, 20, 'Bacteria', 4, 'noticed', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Mycolactone', 1, 21, 'Toxin', 3, 'noticed', '', 13),
('2018-10-13 04:25:49', 'approved', 'Lhexy Romero', 'Mycolactone mlsB', 1, 22, 'Toxin', 4, 'noticed', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Tubercolosis', 1, 23, 'Disease', 3, 'noticed', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Cough Etiquette:Drug Treatment', 1, 24, 'Prevention', 3, 'noticed', '', 13);

-- --------------------------------------------------------

--
-- Table structure for table `site_t`
--

CREATE TABLE `site_t` (
  `site` int(11) NOT NULL,
  `cells` varchar(60) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `site_t`
--

INSERT INTO `site_t` (`site`, `cells`, `type`) VALUES
(1, 'Lymphoid Tissue', 1),
(2, 'Human Gut', 1),
(3, 'Red Blood Cells', 0),
(6, 'White Blood Cells', 2),
(7, 'Neutrophils', 2),
(8, 'Eosinophils', 2),
(9, 'Basophils', 2),
(10, 'Platelets', 0),
(11, 'Nerve Cells', 0),
(12, 'Neuroglial Cells', 0),
(13, 'Muscle Cells', 3),
(14, 'Skeletal Muscle Cells', 3),
(15, 'Cardiac Muscle Cells', 3),
(16, 'Smooth Muscle Cells', 3),
(17, 'Cartilages Cells', 0),
(18, 'Bone Cells', 4),
(19, 'Osteoclasts', 4),
(20, 'Osteoblasts', 4),
(21, 'Osteocytes', 4),
(22, 'Lining Cells', 4),
(23, 'Skin Cells', 0),
(24, 'Endothelial Cells', 0),
(25, 'Epithelial Cells', 0),
(26, 'Fat Cells', 0);

-- --------------------------------------------------------

--
-- Table structure for table `staff_t`
--

CREATE TABLE `staff_t` (
  `staffID` int(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `middleInitial` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(11) NOT NULL,
  `code` varchar(25) NOT NULL,
  `journalID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff_t`
--

INSERT INTO `staff_t` (`staffID`, `firstName`, `lastName`, `middleInitial`, `userName`, `email`, `contact`, `address`, `password`, `status`, `type`, `code`, `journalID`) VALUES
(1, 'Lhexy', 'Romero', '', 'contributor', 'lhexyromero@gmail.com', '09452177904', 'sa puso mo', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', '', 13),
(4, 'Leki', 'Lekay', '', 'admin', 'admin@site.com', '09227686712', '', 'd033e22ae348aeb5660fc2140aec35850c4da997', 0, '2', '', 0),
(44, 'Flor', 'Castillo', 'E.', 'florcastillo', 'zoodissystem@gmail.com', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 1, '3', '', 0),
(48, '', '', '', '', '', '', '', '', 0, '3', 'memetb7bei', 0);

-- --------------------------------------------------------

--
-- Table structure for table `toxin_t`
--

CREATE TABLE `toxin_t` (
  `toxinID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `structureFeature` text NOT NULL,
  `function` text NOT NULL,
  `status` varchar(25) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `toxin_t`
--

INSERT INTO `toxin_t` (`toxinID`, `name`, `structureFeature`, `function`, `status`, `staffID`, `dateTime`) VALUES
(1, 'Typhoid Toxin SpvA', 'Signals for the expression of the spv locus are growth restriction, reduced nutrient supply or lowered pH.', 'Promote the survival and rapid growth of Salmonella in the host', 'approved', 1, '2018-10-13 03:17:37'),
(2, 'Haemolysins', 'Hemolysins or Haemolysins are molecules that have the ability to lyse red blood cells (RBCs). There are primarily two types of hemolysins: alpha (?) and beta (?). Alpha hemolysins cause a partial lysis of the RBCs, resulting in a darkening of the media around a colony on sheep\'s blood agar (SBA). Beta hemolysins produce a complete lysis of the RBCs, resulting in a clearing around the colony growing on SBA. The chapter discusses the biochemistry of hemolysins. Hemolysins are produced by many of the common indoor fungi. ', 'Hemolysins or haemolysins are lipids and proteins that cause lysis of red blood cells by destroying their cell membrane.', 'approved', 1, '2018-10-13 03:47:39'),
(3, 'Mycolactone', 'A polyketide-derived macrolide designated mycolactone was isolated that causes cytopathicity and cell cycle arrest in cultured L929 murine fibroblasts.', 'Intradermal inoculation of purified toxin into guinea pigs produced a lesion similar to that of Buruli ulcer in humans. This toxin may represent one of a family of virulence factors associated with pathology in mycobacterial diseases such as leprosy and tuberculosis.', 'pending', 1, '2018-10-13 04:16:57'),
(4, 'Mycolactone mlsB', 'A polyketide-derived macrolide designated mycolactone was isolated that causes cytopathicity and cell cycle arrest in cultured L929 murine fibroblasts.', 'Intradermal inoculation of purified toxin into guinea pigs produced a lesion similar to that of Buruli ulcer in humans. This toxin may represent one of a family of virulence factors associated with pathology in mycobacterial diseases such as leprosy and tuberculosis.', 'pending', 1, '2018-10-13 04:18:13');

-- --------------------------------------------------------

--
-- Table structure for table `userjournal_t`
--

CREATE TABLE `userjournal_t` (
  `jTitle` varchar(255) NOT NULL,
  `jSubject` varchar(100) NOT NULL,
  `jMessage` text NOT NULL,
  `jDoi` varchar(50) NOT NULL,
  `jFile` varchar(100) NOT NULL,
  `staffID` int(11) NOT NULL,
  `jState` int(11) NOT NULL,
  `jDateTime` varchar(20) NOT NULL,
  `jPublished` varchar(20) NOT NULL,
  `userjournalID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userjournal_t`
--

INSERT INTO `userjournal_t` (`jTitle`, `jSubject`, `jMessage`, `jDoi`, `jFile`, `staffID`, `jState`, `jDateTime`, `jPublished`, `userjournalID`) VALUES
('Characterization of Gut Microbiome Dynamics in Developing Pekin Ducks and Impact of Management System', 'Characterization of Gut Microbiome Dynamics in Developing Pekin Ducks and Impact of Management Syste', 'This is my personal Journal, im happy to collarate. Thank you!', '10.3389/fmicb.2016.02125', 'js\\public\\others\\cc62abba6f3fa72.pdf', 44, 1, '2018-10-13 03:06:40', '2017', 1),
('Ecology of Leptospira interrogans in Norway Rats (Rattus norvegicus) in an Inner-City Neighborhood of Vancouver, Canada', 'RAT ', 'This is my personal Journal!', '10.1371/journal.pntd.0002270', 'js\\public\\others\\3d620548954a455.pdf', 44, 1, '2018-10-13 03:27:10', '2013', 2),
('Comparative study of the gut microbiome potentially related to milk protein in Murrah buffaloes (Bubalus bubalis) and Chinese Holstein cattle', 'RUMINANTS GUTS', 'ThankyouQ', '10.1038/srep42189', 'js\\public\\others\\81082acb5fdc9f7.pdf', 44, 1, '2018-10-13 04:08:01', '2017', 3);

-- --------------------------------------------------------

--
-- Table structure for table `usermessage_t`
--

CREATE TABLE `usermessage_t` (
  `usermessageID` int(11) NOT NULL,
  `mName` varchar(100) NOT NULL,
  `mEmail` varchar(100) NOT NULL,
  `mSubject` varchar(100) NOT NULL,
  `mMessage` text NOT NULL,
  `mState` int(11) NOT NULL,
  `mDateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animalbacteria_t`
--
ALTER TABLE `animalbacteria_t`
  ADD PRIMARY KEY (`animalbacteriaID`),
  ADD KEY `animalID` (`animalID`),
  ADD KEY `bacteriumID` (`bacteriumID`);

--
-- Indexes for table `animaltaxo_t`
--
ALTER TABLE `animaltaxo_t`
  ADD PRIMARY KEY (`animalTaxoID`),
  ADD KEY `journalID` (`journalID`),
  ADD KEY `staffID` (`staffID`);

--
-- Indexes for table `animal_t`
--
ALTER TABLE `animal_t`
  ADD PRIMARY KEY (`animalID`),
  ADD KEY `animal_t_ibfk_1` (`animalTaxoID`),
  ADD KEY `animal_t_ibfk_2` (`journalID`),
  ADD KEY `staffID` (`staffID`);

--
-- Indexes for table `bacteriataxo_t`
--
ALTER TABLE `bacteriataxo_t`
  ADD PRIMARY KEY (`bacteriumTaxoID`),
  ADD KEY `bacteriataxo_t_ibfk_1` (`journalID`),
  ADD KEY `staffID` (`staffID`);

--
-- Indexes for table `bacteriatoxin_t`
--
ALTER TABLE `bacteriatoxin_t`
  ADD PRIMARY KEY (`bacteriaToxinID`),
  ADD KEY `toxinID` (`toxinID`),
  ADD KEY `bacteriumID` (`bacteriumID`);

--
-- Indexes for table `bacteria_t`
--
ALTER TABLE `bacteria_t`
  ADD PRIMARY KEY (`bacteriumID`),
  ADD KEY `bacteriumTaxoID` (`bacteriumTaxoID`),
  ADD KEY `bacteria_t_ibfk_2` (`journalID`),
  ADD KEY `staffID` (`staffID`);

--
-- Indexes for table `disease_t`
--
ALTER TABLE `disease_t`
  ADD PRIMARY KEY (`diseaseID`),
  ADD KEY `disease_t_ibfk_1` (`journalID`),
  ADD KEY `staffID` (`staffID`);

--
-- Indexes for table `journal_t`
--
ALTER TABLE `journal_t`
  ADD PRIMARY KEY (`journalID`);

--
-- Indexes for table `prevention_t`
--
ALTER TABLE `prevention_t`
  ADD PRIMARY KEY (`preventionID`),
  ADD KEY `diseaseID` (`diseaseID`),
  ADD KEY `staffID` (`staffID`);

--
-- Indexes for table `request_t`
--
ALTER TABLE `request_t`
  ADD PRIMARY KEY (`requestID`),
  ADD KEY `staffID` (`staffID`);

--
-- Indexes for table `site_t`
--
ALTER TABLE `site_t`
  ADD PRIMARY KEY (`site`);

--
-- Indexes for table `staff_t`
--
ALTER TABLE `staff_t`
  ADD PRIMARY KEY (`staffID`);

--
-- Indexes for table `toxin_t`
--
ALTER TABLE `toxin_t`
  ADD PRIMARY KEY (`toxinID`),
  ADD KEY `staffID` (`staffID`);

--
-- Indexes for table `userjournal_t`
--
ALTER TABLE `userjournal_t`
  ADD PRIMARY KEY (`userjournalID`),
  ADD KEY `staffID` (`staffID`);

--
-- Indexes for table `usermessage_t`
--
ALTER TABLE `usermessage_t`
  ADD PRIMARY KEY (`usermessageID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animalbacteria_t`
--
ALTER TABLE `animalbacteria_t`
  MODIFY `animalbacteriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `animaltaxo_t`
--
ALTER TABLE `animaltaxo_t`
  MODIFY `animalTaxoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `animal_t`
--
ALTER TABLE `animal_t`
  MODIFY `animalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bacteriataxo_t`
--
ALTER TABLE `bacteriataxo_t`
  MODIFY `bacteriumTaxoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bacteriatoxin_t`
--
ALTER TABLE `bacteriatoxin_t`
  MODIFY `bacteriaToxinID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bacteria_t`
--
ALTER TABLE `bacteria_t`
  MODIFY `bacteriumID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `disease_t`
--
ALTER TABLE `disease_t`
  MODIFY `diseaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `journal_t`
--
ALTER TABLE `journal_t`
  MODIFY `journalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `prevention_t`
--
ALTER TABLE `prevention_t`
  MODIFY `preventionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `request_t`
--
ALTER TABLE `request_t`
  MODIFY `requestID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `site_t`
--
ALTER TABLE `site_t`
  MODIFY `site` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `staff_t`
--
ALTER TABLE `staff_t`
  MODIFY `staffID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `toxin_t`
--
ALTER TABLE `toxin_t`
  MODIFY `toxinID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userjournal_t`
--
ALTER TABLE `userjournal_t`
  MODIFY `userjournalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usermessage_t`
--
ALTER TABLE `usermessage_t`
  MODIFY `usermessageID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `animalbacteria_t`
--
ALTER TABLE `animalbacteria_t`
  ADD CONSTRAINT `animalbacteria_t_ibfk_1` FOREIGN KEY (`animalID`) REFERENCES `animal_t` (`animalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `animalbacteria_t_ibfk_2` FOREIGN KEY (`bacteriumID`) REFERENCES `bacteria_t` (`bacteriumID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `animaltaxo_t`
--
ALTER TABLE `animaltaxo_t`
  ADD CONSTRAINT `animaltaxo_t_ibfk_1` FOREIGN KEY (`journalID`) REFERENCES `journal_t` (`journalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `animaltaxo_t_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `animal_t`
--
ALTER TABLE `animal_t`
  ADD CONSTRAINT `animal_t_ibfk_1` FOREIGN KEY (`animalTaxoID`) REFERENCES `animaltaxo_t` (`animalTaxoID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `animal_t_ibfk_2` FOREIGN KEY (`journalID`) REFERENCES `journal_t` (`journalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `animal_t_ibfk_3` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `bacteriataxo_t`
--
ALTER TABLE `bacteriataxo_t`
  ADD CONSTRAINT `bacteriataxo_t_ibfk_1` FOREIGN KEY (`journalID`) REFERENCES `journal_t` (`journalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `bacteriataxo_t_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `bacteriatoxin_t`
--
ALTER TABLE `bacteriatoxin_t`
  ADD CONSTRAINT `bacteriatoxin_t_ibfk_1` FOREIGN KEY (`toxinID`) REFERENCES `toxin_t` (`toxinID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `bacteriatoxin_t_ibfk_2` FOREIGN KEY (`bacteriumID`) REFERENCES `bacteria_t` (`bacteriumID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `bacteria_t`
--
ALTER TABLE `bacteria_t`
  ADD CONSTRAINT `bacteria_t_ibfk_1` FOREIGN KEY (`bacteriumTaxoID`) REFERENCES `bacteriataxo_t` (`bacteriumTaxoID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `bacteria_t_ibfk_2` FOREIGN KEY (`journalID`) REFERENCES `journal_t` (`journalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `bacteria_t_ibfk_3` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `disease_t`
--
ALTER TABLE `disease_t`
  ADD CONSTRAINT `disease_t_ibfk_1` FOREIGN KEY (`journalID`) REFERENCES `journal_t` (`journalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `disease_t_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `prevention_t`
--
ALTER TABLE `prevention_t`
  ADD CONSTRAINT `prevention_t_ibfk_1` FOREIGN KEY (`diseaseID`) REFERENCES `disease_t` (`diseaseID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `prevention_t_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `request_t`
--
ALTER TABLE `request_t`
  ADD CONSTRAINT `request_t_ibfk_1` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `toxin_t`
--
ALTER TABLE `toxin_t`
  ADD CONSTRAINT `toxin_t_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `userjournal_t`
--
ALTER TABLE `userjournal_t`
  ADD CONSTRAINT `userjournal_t_ibfk_1` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
