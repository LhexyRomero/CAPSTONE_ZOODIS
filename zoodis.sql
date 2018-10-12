-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2018 at 04:41 PM
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
(2, 5, 2, 1),
(3, 6, 3, 1),
(4, 2, 4, 1),
(5, 1, 2, 1),
(6, 3, 5, 1);

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
(1, 'Cordata', 'Aves', 'Anseriformes', 'Anatidae', 'Anas', 'platyrhynchos', 'approved', 1, '2018-10-11 06:32:27', 1),
(2, 'Chordata', 'Aves', 'Psottaciformes', 'Cacatuidae', 'Cacatua', 'galerita', 'approved', 2, '2018-10-11 08:31:11', 4),
(3, 'a', 'a', 'a', 'a', 'a', 'a', 'approved', 2, '2018-10-11 12:30:59', 4),
(4, 'a', 'a', 'a', 'a', 'aa', 'a', 'approved', 3, '2018-10-11 13:31:58', 1),
(5, 'j', 'j', 'j', 'j', 'jj', 'j', 'approved', 3, '2018-10-11 16:06:31', 1),
(6, 'bb', 'bb', 'bb', 'bb', 'bb', 'bb', 'approved', 1, '2018-10-11 16:48:04', 4),
(7, 'pp', 'pp', 'pp', 'pp', 'pp', 'pp', 'approved', 5, '2018-10-11 17:27:01', 1),
(8, 'j', 'j', 'j', 'j', 'jkkk', 'l', 'pending', 1, '2018-10-11 18:39:43', 46);

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
  `journalID` int(11) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `animal_t`
--

INSERT INTO `animal_t` (`animalID`, `animalName`, `animalScientificName`, `animalTaxoID`, `image`, `status`, `journalID`, `staffID`, `dateTime`) VALUES
(1, 'Duck', 'Anas platyrhynchos', 1, 'js\\public\\image_upload\\d95b07e57024a34.jpeg', 'approved', 1, 1, '2018-10-11 06:22:38'),
(2, 'Parrot', 'Cacatua galerita', 2, 'js\\public\\image_upload\\4655e8785e236fb.jpeg', 'approved', 2, 4, '2018-10-11 08:32:36'),
(3, 'Sample', 'a a', 3, 'js\\public\\image_upload\\dc3f4bd3355d45b.jpeg', 'approved', 2, 4, '2018-10-11 12:31:26'),
(4, 'Sample sample', 'jj j', 5, 'js\\public\\image_upload\\eee48d93b63fbc6.jpeg', 'approved', 3, 1, '2018-10-11 16:07:03'),
(5, 'granpa', 'bb bb', 6, 'js\\public\\image_upload\\ef4c250b3ea9443.png', 'approved', 1, 4, '2018-10-11 16:48:58'),
(6, 'oooooooooo', 'pp pp', 7, 'js\\public\\image_upload\\4890aa605b2585c.jpeg', 'approved', 5, 1, '2018-10-11 17:28:00'),
(7, 'bobo', 'aa a', 3, 'js\\public\\image_upload\\cacf71e9e953cbf.jpeg', 'approved', 3, 1, '2018-10-11 18:34:16'),
(8, 'faaag', 'jkkk l', 8, 'js\\public\\image_upload\\bb85d7cc4287d4c.jpeg', 'approved', 1, 46, '2018-10-11 18:45:26');

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
(1, 'Proteobacteria', 'Gammaproteobacteria', 'Enterobacteriales', 'Enterobacteriaceae', 'Salmonella', 'bongori', 'approved', 1, 1, '2018-10-11 06:32:32'),
(2, 'k', 'k', 'k', 'k', 'k', 'k', 'approved', 1, 1, '2018-10-11 13:46:01'),
(3, 'cc', 'cc', 'cc', 'cc', 'cc', 'cc', 'approved', 1, 4, '2018-10-11 16:48:20'),
(4, 'll', 'll', 'll', 'll', 'll', 'll', 'approved', 5, 1, '2018-10-11 17:27:10'),
(5, 'ytyty', 'ytytyt', 'ytytyt', 'ytytyt', 'ytyt', 'ytyt', 'approved', 2, 1, '2018-10-11 17:28:10'),
(6, 'ga', 'a', 'a', 'ag', 'gg', 'gga', 'pending', 3, 1, '2018-10-11 22:20:23');

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
(2, 1, 2),
(3, 2, 3),
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
  `bacteriumTaxoID` int(11) NOT NULL,
  `journalID` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bacteria_t`
--

INSERT INTO `bacteria_t` (`bacteriumID`, `bacteriumSpeciesName`, `bacteriumGenusName`, `bacteriumScientificName`, `bacteriumTissueSpecifity`, `bacteriumSampleType`, `bacteriumIsolation`, `bacteriumIdentification`, `pathogenic`, `bacteriumTaxoID`, `journalID`, `status`, `staffID`, `dateTime`) VALUES
(1, 'bongori', 'Salmonella', 'Salmonella bongori', 'Epithelial Cells', 'a', 'a', 'a', 0, 1, 1, 'approved', 4, '2018-10-11 06:33:29'),
(2, 'cc', 'cc', 'cc cc', 'bb', 'bb', 'bb', 'bb', 0, 3, 1, 'approved', 4, '2018-10-11 16:50:52'),
(3, 'll', 'll', 'll ll', 'll', 'll', 'll', 'll', 0, 4, 5, 'approved', 4, '2018-10-11 17:12:55'),
(4, 'ytyt', 'ytyt', 'ytyt ytyt', 'yt', 'yt', 'yt', 'yt', 0, 5, 2, 'approved', 4, '2018-10-11 17:28:17'),
(5, 'gga', 'gg', 'gg gga', 'a', 'a', 'a', 'a', 0, 6, 3, 'pending', 1, '2018-10-11 22:20:40');

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
  `journalID` int(11) NOT NULL,
  `status` varchar(25) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `disease_t`
--

INSERT INTO `disease_t` (`diseaseID`, `bodySite`, `diseaseName`, `diseaseDesc`, `symptoms`, `journalID`, `status`, `staffID`, `dateTime`) VALUES
(1, 'Epithelial Cells', 'Salmonellosis', 'Salmonella infection (salmonellosis) is a common bacterial disease from Salmonella bongori that affects the intestinal tract.  Salnonella produces Cytolethal distending toxin B (CdtB), Salmonella plasmid virulence A (SpvA), & Salmonella plasmid virulence B (SpvB) and typically lives in animal and human intestines and are shed through feces. Humans become infected most frequently through contaminated water or food.', 'Nausea:Vomiting:Abdominal Cramps:Diarrhea:Fever:Chills:Headache:Blood in the stool', 1, 'pending', 1, '2018-10-11 06:30:58'),
(2, 'dila', 'ococococ', 'poydbdje ejhhehjksc ekwjfjkwehf jkwhefwkjen', 'jhwjehfejwhfewfwjhfjwhfwjh', 1, 'approved', 4, '2018-10-11 16:51:58');

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
(1, 'RJ#110', 'Characterization of Gut Microbiome Dynamics in Developing Pekin Ducks and Impact of Management System', '10.3389/fmicb.2016.02125', 'Incomplete', 'js\\public\\others\\b6ddedcb7282a58.pdf', 'noticed', 0, 44),
(2, 'ZDS#58', 'Zoonotic Diseases of Common Pet Birds: Psittacine, Passerine, and Columbiform Species', '10.1016/j.cvex.2011.05.00', 'Incomplete', 'js\\public\\others\\2f0f0bc826f79ee.pdf', 'notify', 0, 4),
(3, 'RJ#186', 'Sample', '10.1371/journal.pntd.0002', 'Incomplete', 'js\\public\\others\\73b777c837a4771.pdf', 'noticed', 1, 4),
(4, 'RJ#83', 'Capnocytophaga canimorsus: an emerging cause of sepsis, meningitis, and post-splenectomy infection after dog bites', '10.1007/s10096-015-2360-7', 'Incomplete', 'js\\public\\others\\c2b0724b51035a6.pdf', 'notify', 0, 4),
(5, 'ZDS#73', 'qwerty', '0909090909', 'Incomplete', 'js\\public\\others\\5d70a323bb0a18c.pdf', 'notify', 0, 4);

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
(1, 'Cook poultry, ground beef, and eggs thoroughly :Do not eat or drink foods containing raw eggs, or raw milk', 1, 'pending', 1, '2018-10-11 06:31:37'),
(2, 'sdfnmbdsnfbsn  jhfkjwhejkfhwjekhfe', 2, 'approved', 4, '2018-10-11 16:52:16');

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
('2018-10-11 06:33:29', 'approved', 'Lhexy Romero', 'Anas platyrhynchos', 1, 1, 'Animal Taxonomy', 1, 'noticed', '', 1),
('2018-10-11 06:33:29', 'approved', 'Lhexy Romero', 'Salmonella bongori', 1, 2, 'Bacteria Taxonomy', 1, 'noticed', '', 1),
('2018-10-11 06:33:29', 'approved', 'Lhexy Romero', 'Anas platyrhynchos', 1, 3, 'Animal', 1, 'notify', '', 1),
('2018-10-11 06:33:29', 'approved', 'Lhexy Romero', 'Salmonella bongori', 1, 4, 'Bacteria', 1, 'noticed', '', 1),
('2018-10-11 06:33:29', 'approved', 'Lhexy Romero', 'Cook poultry, ground beef, and eggs thoroughly :Do not eat or drink foods containing raw eggs, or raw milk', 1, 5, 'Prevention', 1, 'noticed', '', 1),
('2018-10-11 17:28:17', 'approved', 'Lhexy Romero', 'aa a', 1, 6, 'Animal Taxonomy', 4, 'noticed', '', 3),
('2018-10-11 13:46:01', 'approved', 'Lhexy Romero', 'k k', 1, 7, 'Bacteria Taxonomy', 2, 'noticed', '', 1),
('2018-10-11 16:06:31', 'approved', 'Lhexy Romero', 'jj j', 1, 8, 'Animal Taxonomy', 5, 'noticed', '', 3),
('2018-10-11 17:28:17', 'approved', 'Lhexy Romero', 'jj j', 1, 9, 'Animal', 4, 'noticed', '', 3),
('2018-10-11 17:27:01', 'approved', 'Lhexy Romero', 'pp pp', 1, 10, 'Animal Taxonomy', 7, 'noticed', '', 5),
('2018-10-11 17:28:17', 'approved', 'Lhexy Romero', 'll ll', 1, 11, 'Bacteria Taxonomy', 4, 'noticed', '', 5),
('2018-10-11 17:28:00', 'approved', 'Lhexy Romero', 'pp pp', 1, 12, 'Animal', 6, 'noticed', '', 5),
('2018-10-11 17:12:55', 'approved', 'Lhexy Romero', 'll ll', 1, 13, 'Bacteria', 3, 'notify', '', 5),
('2018-10-11 17:28:17', 'approved', 'Lhexy Romero', 'kkkkkkkk', 1, 14, 'Toxin', 4, 'noticed', '', 5),
('2018-10-11 17:28:10', 'approved', 'Lhexy Romero', 'ytyt ytyt', 1, 15, 'Bacteria Taxonomy', 5, 'noticed', '', 2),
('2018-10-11 17:28:17', 'approved', 'Lhexy Romero', 'ytyt ytyt', 1, 16, 'Bacteria', 4, 'noticed', '', 2),
('2018-10-11 18:34:16', 'approved', 'Lhexy Romero', 'aa a', 1, 17, 'Animal', 7, 'noticed', '', 3),
('2018-10-11 18:39:43', 'pending', 'Bryan Castillo', 'jkkk l', 46, 18, 'Animal Taxonomy', 8, 'notify', '', 1),
('2018-10-11 18:45:26', 'approved', 'Bryan Castillo', 'jkkk l', 46, 19, 'Animal', 8, 'noticed', '', 1),
('2018-10-11 22:20:23', 'pending', 'Lhexy Romero', 'gg gga', 1, 20, 'Bacteria Taxonomy', 6, 'notify', '', 3),
('2018-10-11 22:20:40', 'pending', 'Lhexy Romero', 'gg gga', 1, 21, 'Bacteria', 5, 'notify', '', 3);

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
(1, 'Lhexy', 'Romero', '', 'contributor', 'lhexyromero@gmail.com', '09452177904', 'sa puso mo', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', '', 3),
(4, 'Leki', 'Lekay', '', 'admin', 'admin@site.com', '09227686712', '', 'd033e22ae348aeb5660fc2140aec35850c4da997', 0, '2', '', 0),
(44, 'Flor', 'Castillo', 'E.', 'florcastillo', 'zoodissystem@gmail.com', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 1, '3', '', 0),
(45, 'Ibrahim', 'Samson', 'A', 'ibsamson', 'zoodissystem@gmail.com', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 1, '3', '', 0),
(46, 'Bryan', 'Castillo', '', 'bry', 'bry', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', 'a35b7yte4fe', 1),
(47, 'ib', 'Samson', '', 'ibsamson', 'ibsamson', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', 'mnvbm547yko', 10);

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
(1, 'Typhoid Toxin SpvA', 'Signals for the expression of the spv locus are growth restriction, reduced nutrient supply or lowered pH.', 'Promote the survival and rapid growth of Salmonella in the host', 'approved', 4, '2018-10-11 07:00:08'),
(2, 'Typhoid Toxin CdtB ', 'Classic cytolethal distending toxins (CDTs) are three component AB toxins, composed of CdtA, CdtB and CdtC. CdtA and CdtC mediate target cell binding and membrane translocation of CdtB, which then induces DNA damage, most probably through its nuclease activity', 'Involving chromatin disruption, which leads to G2M-phase growth arrest of the target cell and ultimately cell death', 'approved', 4, '2018-10-11 07:15:04'),
(3, 'garnaaaaaaaa', 'cc cc cc cc', 'cc cc cc cc', 'approved', 4, '2018-10-11 16:51:22'),
(4, 'kkkkkkkk', 'kkkkkkkkk', 'kkkkkkkk', 'approved', 1, '2018-10-11 16:56:36');

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
('Characterization of Gut Microbiome Dynamics in Developing Pekin Ducks and Impact of Management System', '', '', '10.3389/fmicb.2016.02125', 'js\\public\\others\\b6ddedcb7282a58.pdf', 44, 1, '2018-10-11 06:12:29', '2017', 1),
('Capnocytophaga canimorsus: an emerging cause of sepsis, meningitis, and post-splenectomy infection after dog bites', '', '', '10.1007/s10096-015-2360-7', 'js\\public\\others\\c2b0724b51035a6.pdf', 45, 1, '2018-10-11 15:32:49', '2015', 2);

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
  MODIFY `animalbacteriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `animaltaxo_t`
--
ALTER TABLE `animaltaxo_t`
  MODIFY `animalTaxoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `animal_t`
--
ALTER TABLE `animal_t`
  MODIFY `animalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `bacteriataxo_t`
--
ALTER TABLE `bacteriataxo_t`
  MODIFY `bacteriumTaxoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bacteriatoxin_t`
--
ALTER TABLE `bacteriatoxin_t`
  MODIFY `bacteriaToxinID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bacteria_t`
--
ALTER TABLE `bacteria_t`
  MODIFY `bacteriumID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `disease_t`
--
ALTER TABLE `disease_t`
  MODIFY `diseaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `journal_t`
--
ALTER TABLE `journal_t`
  MODIFY `journalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `prevention_t`
--
ALTER TABLE `prevention_t`
  MODIFY `preventionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `request_t`
--
ALTER TABLE `request_t`
  MODIFY `requestID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `site_t`
--
ALTER TABLE `site_t`
  MODIFY `site` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `staff_t`
--
ALTER TABLE `staff_t`
  MODIFY `staffID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `toxin_t`
--
ALTER TABLE `toxin_t`
  MODIFY `toxinID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userjournal_t`
--
ALTER TABLE `userjournal_t`
  MODIFY `userjournalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
