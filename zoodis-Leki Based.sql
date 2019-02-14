-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2019 at 08:33 AM
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
-- Table structure for table `ac_animal_t`
--

CREATE TABLE `ac_animal_t` (
  `ac_aID` int(11) NOT NULL,
  `phylum` varchar(50) NOT NULL,
  `class` varchar(50) NOT NULL,
  `orderr` varchar(50) NOT NULL,
  `family` varchar(50) NOT NULL,
  `genus` varchar(50) NOT NULL,
  `species` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ac_animal_t`
--

INSERT INTO `ac_animal_t` (`ac_aID`, `phylum`, `class`, `orderr`, `family`, `genus`, `species`) VALUES
(2, 'Chordata', ' Mammalia', ' Artiodactyla', ' Suidae', 'Sus', 'domesticus'),
(3, 'Chordata', 'Aves ', ' Psittaciformes', 'Psittaculidae', 'Agapornis', 'taranta'),
(4, 'Chordata', 'Aves ', ' Psittaciformes', 'Psittaculidae', 'Melopsittacus', 'undulatus'),
(5, 'Chordata', ' Mammalia', ' Perissodactyla', 'Equidae', ' Equus', 'ferus'),
(6, 'Chordata', ' Mammalia', ' Lagomorpha', ' Leporidae', ' Oryctolagus', 'cuniculus'),
(7, 'Chordata', ' Mammalia', ' Rodentia', ' Caviidae', 'Cavia', 'porcellus'),
(8, 'Chordata', ' Mammalia', ' Rodentia', ' Chinchillidae', 'Chinchilla', 'lanigera'),
(9, 'Chordata', ' Mammalia', ' Rodentia', ' Cricetidae', ' Mesocricetus', 'auratus'),
(10, 'Chordata', ' Mammalia', ' Perissodactyla', 'Equidae', ' Equus', 'africanus'),
(11, 'Chordata', ' Mammalia', 'Primates', 'Hominidae', ' Pan', 'troglodytes'),
(12, 'Chordata', 'Aves ', ' Columbiformes', 'Columbidae', ' Columba', 'livia');

-- --------------------------------------------------------

--
-- Table structure for table `ac_bacteria_t`
--

CREATE TABLE `ac_bacteria_t` (
  `ac_bID` int(11) NOT NULL,
  `phylum` varchar(50) NOT NULL,
  `class` varchar(50) NOT NULL,
  `orderr` varchar(50) NOT NULL,
  `family` varchar(50) NOT NULL,
  `genus` varchar(50) NOT NULL,
  `species` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ac_bacteria_t`
--

INSERT INTO `ac_bacteria_t` (`ac_bID`, `phylum`, `class`, `orderr`, `family`, `genus`, `species`) VALUES
(2, ' Proteobacteria', ' Alphaproteobacteria', 'Rhizobiales', 'Brucellaceae', 'Brucella', 'ovis'),
(3, ' Proteobacteria', ' Gammaproteobacteria', 'Legionellales', 'Coxiellaceae', 'Coxiella', 'burnetii'),
(4, 'Proteobacteria', ' Betaproteobacteria', 'Nitrosomonadales', 'Spirillaceae', 'Spirillum', 'minus'),
(5, ' Fusobacteria', ' Fusobacteria', 'Fusobacteriales', ' Leptotrichiaceae ', 'Streptobacillus', 'moniliformis'),
(6, ' Proteobacteria', ' Gammaproteobacteria', 'Enterobacteriales', 'Enterobacteriaceae', 'Yersinia', 'enterocolitica'),
(7, 'Firmicutes', ' Bacilli', 'Bacillales', 'Staphylococcaceae', ' Staphylococcus', 'aureus'),
(8, ' Proteobacteria', ' Gammaproteobacteria', 'Pasteurellales', 'Pasteurellaceae', 'Pasteurella', 'multocida'),
(9, ' Proteobacteria', ' Gammaproteobacteria', 'Thiotrichales', 'Francisellaceae', 'Francisella', 'tularensis'),
(10, 'Firmicutes', ' Bacilli', ' Bacillales', ' Listeriaceae', ' Listeria', 'monocytogenes'),
(11, 'Proteobacteria', ' Betaproteobacteria', 'Burkholderiales', ' Alcaligenaceae', 'Bordetella', 'pertussis'),
(12, 'Spirochaetes', ' Spirochete ', 'Spirochaetales', 'Spirochaetaceae', ' Borrelia', 'burgdorferi');

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
(4, 3, 4, 1),
(5, 4, 5, 1),
(6, 5, 6, 1),
(7, 6, 7, 1),
(8, 7, 8, 1),
(9, 8, 9, 1),
(10, 9, 10, 1);

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
(3, 'Chordata', 'Mammalia', 'Artiodactyla', 'Bovidae', 'Bos', 'taurus', 'approved', 13, '2018-10-13 04:25:25', 1),
(4, 'Chordata', 'Mammalia', 'Artiodactyla', 'Bovidae', 'Ovis', 'aries', 'approved', 14, '2018-10-15 20:44:06', 1),
(5, 'Chordata', 'Aves', 'Galliformes', 'Phasianidae', 'Gallus', 'gallus', 'approved', 14, '2018-10-15 23:57:06', 1),
(6, 'Chordata', 'Mammalia', 'Carnivora', 'Felidae', 'Felis', 'domesticus', 'approved', 10, '2018-10-16 01:43:51', 1),
(7, 'Chordata', 'Mammalia', 'Artiodactyla', 'Bovidae', 'Capra', 'aegagrus', 'approved', 17, '2018-10-16 02:12:33', 1),
(8, 'Chordata', 'Aves', 'Psottaciformes', 'Cacatuidae', 'Cacatua', 'galerita', 'approved', 17, '2018-10-16 02:32:54', 1),
(9, 'Chordata', 'Mammalia', 'Carnivora', 'Canidae', 'Canis', 'lupus', 'approved', 19, '2018-10-16 17:14:35', 1),
(10, 'a', 'a', 'a', 'a', 'a', 'a', 'approved', 19, '2018-11-05 17:27:15', 1);

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
(3, 'Cattle', 'Bos taurus', 3, 'js\\public\\image_upload\\3c0a88ed5e08b8e.jpeg', 'approved', 0, 13, 1, '2018-10-13 04:25:39'),
(4, 'Sheep', 'Ovis aries', 4, 'js\\public\\image_upload\\fe6a1524c0a451b.jpeg', 'approved', 0, 14, 1, '2018-10-15 20:56:28'),
(5, 'Chicken', 'Gallus gallus', 5, 'js\\public\\image_upload\\672cf926709f668.jpeg', 'approved', 0, 15, 1, '2018-10-16 01:22:00'),
(6, 'Cat', 'Felis domesticus', 6, 'js\\public\\image_upload\\c9f594133c50643.jpeg', 'approved', 0, 10, 1, '2018-10-16 01:45:29'),
(7, 'Goat', 'Capra aegagrus', 7, 'js\\public\\image_upload\\9fc22aa344cc164.jpeg', 'approved', 0, 17, 1, '2018-10-16 02:13:25'),
(8, 'Parrot', 'Cacatua galerita', 8, 'js\\public\\image_upload\\c5c7e57209f07e1.jpeg', 'approved', 0, 17, 1, '2018-10-16 02:35:15'),
(9, 'Dog', 'Canis lupus', 9, 'js\\public\\others\\c6990e1c7ba1709.gif', 'approved', 0, 19, 1, '2018-10-16 17:14:48');

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
(4, 'Actinobacteria', 'Actinobacteria', 'Actinomycelates', 'Mycobacteriaceae', 'Mycobacterium', 'laprae', 'approved', 13, 1, '2018-10-13 04:25:33'),
(5, 'Proteobacteria', 'Gammaproteobacteira', 'Pseudomonadales', 'Pseudomonadaceae', 'Pseudomonas', 'aeruginosa', 'approved', 14, 1, '2018-10-15 20:52:37'),
(6, 'Firmicutes', 'Clostridia', 'Clostridiales', 'Peptostreptococcaceae', 'Clostridioides', 'difficile', 'approved', 14, 1, '2018-10-15 23:57:14'),
(7, 'Proteobacteria', 'Alphaproteobacteria', 'Rhizobiales', 'Bartonellaceael', 'Bartonella', ' quintana', 'approved', 10, 1, '2018-10-16 01:43:56'),
(8, 'Bacili', 'Bacili', 'Bacillales', 'Bacillaceae', 'Bacillus', 'anthracis', 'approved', 17, 1, '2018-10-16 02:12:41'),
(9, 'Chlamydiae', '--', 'Chlyamydiales', 'Chlamydiaceae', 'Chlamydia', 'psittaci', 'approved', 17, 1, '2018-10-16 02:32:59'),
(10, 'Capnocytophaga', 'canimorsus', 'Bacteriodetes', 'Flavobacteria', 'Flavobacteriales', 'flavobacteriaceae', 'approved', 19, 1, '2018-10-16 17:14:41');

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
(4, 3, 4),
(5, 6, 5),
(6, 7, 6),
(7, 8, 7),
(8, 9, 8),
(9, 5, 9),
(10, 5, 10),
(11, 5, 11),
(12, 10, 12);

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
(1, 'bongori', 'Salmonella', 'Salmonella bongori', 'Human Gut', 'a', 'a', 'a', 1, 0, 1, 11, 'approved', 4, '2018-10-13 03:56:32'),
(2, 'interrogans', 'Leptospira', 'Leptospira interrogans', 'Endothelial Cells', 'a', 'a', 'a', 1, 0, 2, 12, 'approved', 4, '2018-10-13 03:56:51'),
(3, 'laprae', 'Mycobacterium', 'Mycobacterium leprae', 'Epithelial Cells', 'a', 'a', 'a', 1, 0, 4, 13, 'approved', 4, '2018-10-13 04:25:44'),
(4, 'bovis', 'Mycobacterium', 'Mycobacterium bovis', 'Epithelial Cells', 'a', 'a', 'a', 1, 0, 3, 13, 'approved', 4, '2018-10-13 04:25:49'),
(5, 'aeruginosa', 'Pseudomonas', 'Pseudomonas aeruginosa', 'Skin Cells', 'Fleece', 'Culture Dependent', 'Molecular Identification', 1, 0, 5, 14, 'approved', 4, '2018-10-15 23:45:25'),
(6, 'Clostridioides', 'difficile', 'Clostridioides difficile', 'Gut Cells, Intestinal epithelium', 'Gut', 'Culture Dependent', 'Molecular Identification', 0, 0, 6, 15, 'approved', 4, '2018-10-16 01:24:12'),
(7, ' quintana', 'Bartonella', 'Bartonella  quintana', 'Skin Cells', 'Skin', 'Culture Dependent', 'Molecular Identification', 1, 0, 7, 10, 'approved', 4, '2018-10-16 01:50:43'),
(8, 'anthracis', 'Bacillus', 'Bacillus anthracis', 'Endothelial Cells', 'Rumen', 'Culture Dependent', 'Molecular Identification', 1, 0, 8, 17, 'approved', 4, '2018-10-16 02:15:48'),
(9, 'psittaci', 'Chlamydia', 'Chlamydia psittaci', 'Epithelial Cells', 'Skin', 'Culture Dependent', 'Molecular Identification', 1, 0, 9, 17, 'approved', 4, '2018-10-16 02:35:08'),
(10, 'flavobacteriaceae', 'Flavobacteriales', 'Flavobacteriales flavobacteriaceae', 'Epithelial Cells', 'Saliva', 'Culture Dependent', 'Molecular identification', 0, 0, 10, 19, 'approved', 4, '2018-10-16 17:15:15');

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
(3, 'Epithelial Cells', 'Tubercolosis', 'Tuberculosis (TB) is a potentially serious infectious disease that mainly affects your lungs. The bacteria that cause tuberculosis is Mycobacterium bova. Mycolactone toxins like Mycolactone mlsA1, Mycolactone mlsA2, and Mycolactone mlsB toxins are produced by the bacteria and are spread from one person to another through tiny droplets released into the air via coughs and sneezes.', 'Loss of Appetite:Unintentional weight loss:Coughing up blood', 0, 13, 'approved', 1, '2018-10-13 04:21:12'),
(4, 'Skin Cells', 'Cystic fibrosis', 'Cystic fibrosis is a progressive, genetic disease that causes persistent lung infections containing Exotoxin A,\r\nExoS,\r\nExoU  and limits the ability to breathe over time. In people with CF, a defective gene causes a thick, sticky buildup of mucus in the lungs, pancreas, and other organs.', 'A persistent cough that produces thick mucus (sputum):Wheezing:Breathlessness:Repeated lung infections', 0, 14, 'approved', 1, '2018-10-15 21:17:53'),
(5, 'Skin Cells', 'Bronchiectasis', 'Bronchiectasis is a condition where the bronchial tubes of your lungs are permanently damaged, widened, and thickened. These damaged air passages allow bacteria containing Exotoxin A,\r\nExoS,\r\nExoU and mucus to build up and pool in your lungs. This results in frequent infections and blockages of the airways.', 'chronic daily cough:coughing up blood:abnormal sounds or wheezing in the chest with breathing:chest pain', 0, 14, 'approved', 1, '2018-10-15 23:49:55'),
(6, 'Gut Cells: Intestinal epithelium', ' Clostridium difficile Infection', 'Clostridium difficile infection is spread by bacterial spores found within feces. Surfaces may become contaminated with the spores with further spread occurring via the hands of healthcare workers. Diagnosis is by stool culture or testing for the bacteria\'s DNA or toxins known as Clostridium difficile toxin A and Clostridium difficile toxin B.\r\n', 'Diarrhea:fever:nausea:abdominal pain', 0, 15, 'approved', 1, '2018-10-16 01:27:25'),
(7, 'Skin Cells', 'Cat-Scratch Disease', 'Cat-scratch disease (CSD) is a common and usually benign infectious disease caused by the bacterium Bartonella henselae. It is most commonly found in children following a scratch or bite from a cat. The infection caused  by Haemolysin BL toxin develops at the point of injury within about 3-14 days.', 'Cat-scratch disease commonly presents as tender, swollen lymph nodes near the site of the inoculating bite or scratch or on the neck, and is usually limited to one side. ', 0, 10, 'approved', 1, '2018-10-16 01:53:00'),
(8, 'Endothelial Cells', 'Anthrax', 'Anthrax is caused by a toxin called Anthrolysin O produced by the Bacillus genome, Bacillus anthracis. The skin form presents with a small blister with surrounding swelling that often turns into a painless ulcer with a black center. The intestinal form presents with diarrhea which may contain blood, abdominal pains, and nausea and vomiting. The injection form presents with fever and an abscess at the site of drug injection.', 'Fever:chest pain:shortness of breath', 0, 17, 'approved', 1, '2018-10-16 02:20:33'),
(9, 'Epithelial Cells', 'Psittacosis', 'Psittacosis—also known as parrot fever, and ornithosis—is a zoonotic infectious disease caused by a bacterium called Chlamydia psittaci producing a toxin called Chlamydial cytotoxin and contracted from infected parrots. The incidence of infection in canaries and finches is believed to be lower than in psittacine birds.', 'Spleen enlargement is common towards the end of the first week. It may become a serious lung infection. Diagnosis can be suspected in case of respiratory infection associated with splenomegaly and/or epistaxis. Headache can be so severe that it suggests meningitis and some nuchal rigidity is not unusual. Towards the end of the first week stupor or even coma can result in severe cases. The second week is more akin to acute bacteremic pneumococcal pneumonia with continuous high fevers, headaches, cough, and dyspnea. X-rays show patchy infiltrates or a diffuse whiteout of lung fields.:after an incubation period of 5–19 days, the symptoms of the disease range from inapparent illness to systemic illness with severe pneumonia. It presents chiefly as an atypical pneumonia. In the first week of psittacosis the symptoms mimic typhoid fever: prostrating high fevers, joint pains, diarrhea, conjunctivitis, nose bleeds and low level of white blood cells in the blood.', 0, 17, 'approved', 1, '2018-10-16 02:40:33'),
(10, 'Skin Cells', 'Leprosy', 'Leprosy is a chronic, progressive bacterial infection caused by the bacterium Mycobacterium leprae from the toxins ExotoxinA, ExoenzymeS, and ExoenzymeT. It primarily affects the nerves of the extremities, the skin, the lining of the nose, and the upper respiratory tract. Leprosy is also known as Hansen\'s disease.', ' painless ulcers: skin lesions of hypopigmented macules (flat, pale areas of skin):eye damage', 0, 12, 'approved', 4, '2018-10-16 09:34:40'),
(11, 'Epithelial Cells', 'Capnocytophaga canimorsus infection', 'Capnocytophaga canimorsus Infection may be complicated by thrombotic microangiopathy, for which plasma exchange should be considered prior to definitive diagnosis of thrombotic microangiopathy.Thrombotic microangiopathy syndrome includes ADAMTS13 deficiency?, Shiga toxin ? Shiga Toxin, and complement?mediated TMA. ADAMTS13 activity is severely decreased in patients with ADAMTS13 deficiency?mediated TMA (<5% in most patients), and Shiga toxin ?mediated TMA is mainly caused by enterohemorrhagic Escherichia coli infection.', 'Blisters around the bite wound within hours of the bite.:Redness', 0, 19, 'approved', 1, '2018-10-16 16:47:08'),
(12, 'a:bbbbb:vvv', 'vvvvv', 'avvvv', 'akkk:bb', 0, 19, 'approved', 1, '2018-10-25 16:31:11'),
(13, 'b:ka:c', 'b', 'b', 'b:bobi:c', 0, 19, 'approved', 1, '2018-10-25 19:39:57');

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
  `message` text NOT NULL,
  `state` varchar(25) NOT NULL,
  `assign` int(11) NOT NULL DEFAULT '0',
  `ownedBy` int(11) NOT NULL DEFAULT '4'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `journal_t`
--

INSERT INTO `journal_t` (`journalID`, `code`, `name`, `doi`, `status`, `file`, `message`, `state`, `assign`, `ownedBy`) VALUES
(10, 'none', 'none', 'none', 'Incomplete', 'none', '', 'notify', 0, 4),
(11, 'RJ#206', 'Characterization of Gut Microbiome Dynamics in Developing Pekin Ducks and Impact of Management System', '10.3389/fmicb.2016.02125', 'Incomplete', 'js\\public\\others\\cc62abba6f3fa72.pdf', '', 'noticed', 1, 4),
(12, 'RJ#44', 'Ecology of Leptospira interrogans in Norway Rats (Rattus norvegicus) in an Inner-City Neighborhood of Vancouver, Canada', '10.1371/journal.pntd.0002', 'completed', 'js\\public\\others\\3d620548954a455.pdf', '', 'read', 1, 4),
(13, 'RJ#72', 'Comparative study of the gut microbiome potentially related to milk protein in Murrah buffaloes (Bubalus bubalis) and Chinese Holstein cattle', '10.1038/srep42189', 'completed', 'js\\public\\others\\81082acb5fdc9f7.pdf', '', 'noticed', 1, 4),
(14, 'RJ#206', 'Pseudomonas aeruginosa genomic structure and diversity', '10.3389/fmicb.2011.00150', 'completed', 'js\\public\\others\\95469253523d39d.pdf', '', 'read', 1, 4),
(15, 'RJ#206', 'Microbial Shifts in the Intestinal Microbiota of Salmonella Infected Chickens in Response to Enrofloxacin', '10.3389/fmicb.2017.01711', 'completed', 'js\\public\\others\\2c7749fa0e6fa26.pdf', '', 'noticed', 1, 44),
(16, 'RJ#24', 'The feline skin microbiota: The bacteria inhabiting the skin of healthy and allergic cats', '.org/', 'completed', 'js\\public\\others\\b8ea5e5e42e0f8a.pdf', '', 'noticed', 1, 44),
(17, 'RJ#101', 'Exploring the Goat Rumen Microbiome from Seven Days to Two Years', '10.1371/journal.', 'completed', 'js\\public\\others\\b5654f5a89194f0.pdf', '', 'noticed', 1, 44),
(18, 'RJ#7', 'Parrot', '10.1038/srep30019', 'completed', 'js\\public\\others\\f5741d10afb337e.pdf', '', 'noticed', 1, 44),
(19, 'RJ#250', 'Capnocytophaga canimorsus: an emerging cause of sepsis, meningitis, and post-splenectomy infection after dog bites', '10.1007/s10096-015-2360-7', 'completed', 'js\\public\\others\\beb199464239c69.pdf', ' Animal Taxonomy,Bacteria,', 'read', 1, 44);

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
(3, 'Cough Etiquette:Drug Treatment', 3, 'approved', 1, '2018-10-13 04:23:13'),
(4, 'There', 4, 'approved', 1, '2018-10-15 21:20:02'),
(5, 'Some cases of bronchiectasis can’t be prevented; other cases CAN be prevented by getting treatment for lung infections right away.', 5, 'approved', 1, '2018-10-15 23:51:34'),
(6, ' Surfaces that may have come into contact with the bacteria or spores, such as toilets, the floor around toilets, bedpans and beds, should also be cleaned thoroughly with water and a cleaning product containing bleach.: People who are infected with C. difficile should have their own room and toilet facilities to avoid passing the infection onto others.', 6, 'approved', 1, '2018-10-16 01:28:44'),
(7, 'Flea control : Washing hands after handling a cat.', 7, 'approved', 1, '2018-10-16 01:53:54'),
(8, 'Vaccines : Antibiotics :Quarantine', 8, 'approved', 1, '2018-10-16 02:21:32'),
(9, 'Oral Theraphy:Antibiotics', 9, 'approved', 1, '2018-10-16 02:41:28'),
(10, 'a:b:c:d', 12, 'approved', 1, '2018-10-25 19:14:44'),
(11, 'kkk:tanga:c', 13, 'approved', 1, '2018-10-25 19:40:08');

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
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Anas platyrhynchos', 1, 1, 'Animal Taxonomy', 1, 'read', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Salmonella bongori', 1, 2, 'Bacteria Taxonomy', 1, 'read', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Anas platyrhynchos', 1, 3, 'Animal', 1, 'read', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Salmonella bongori', 1, 4, 'Bacteria', 1, 'read', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Typhoid Toxin SpvA', 1, 5, 'Toxin', 1, 'read', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Salmonellosis', 1, 6, 'Disease', 1, 'read', '', 11),
('2018-10-13 03:56:32', 'approved', 'Lhexy Romero', 'Do not eat or drink foods containing raw eggs, or raw milk:Cook poultry, ground beef, and eggs thoroughly', 1, 7, 'Prevention', 1, 'read', '', 11),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Rattus rattus', 1, 8, 'Animal Taxonomy', 2, 'read', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Leptospira interrogans', 1, 9, 'Bacteria Taxonomy', 2, 'read', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Rattus rattus', 1, 10, 'Animal', 2, 'read', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Leptospira interrogans', 1, 11, 'Bacteria', 2, 'read', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Leptospirosis', 1, 12, 'Disease', 2, 'read', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Avoid contaminated water.:Keep away from infected animals, especially wild rats.:Use disinfectant.: Be aware of your surroundings, especially when you travel.', 1, 13, 'Prevention', 2, 'read', '', 12),
('2018-10-13 03:56:51', 'approved', 'Lhexy Romero', 'Haemolysins', 1, 14, 'Toxin', 2, 'read', '', 12),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Bos taurus', 1, 15, 'Animal Taxonomy', 3, 'read', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Mycobacterium bovis', 1, 16, 'Bacteria Taxonomy', 3, 'read', '', 13),
('2018-10-13 04:25:49', 'approved', 'Lhexy Romero', 'Mycobacterium laprae', 1, 17, 'Bacteria Taxonomy', 4, 'read', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Bos taurus', 1, 18, 'Animal', 3, 'read', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Mycobacterium laprae', 1, 19, 'Bacteria', 3, 'read', '', 13),
('2018-10-13 04:25:49', 'approved', 'Lhexy Romero', 'Mycobacterium bovis', 1, 20, 'Bacteria', 4, 'read', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Mycolactone', 1, 21, 'Toxin', 3, 'read', '', 13),
('2018-10-13 04:25:49', 'approved', 'Lhexy Romero', 'Mycolactone mlsB', 1, 22, 'Toxin', 4, 'read', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Tubercolosis', 1, 23, 'Disease', 3, 'read', '', 13),
('2018-10-13 04:25:44', 'approved', 'Lhexy Romero', 'Cough Etiquette:Drug Treatment', 1, 24, 'Prevention', 3, 'read', '', 13),
('2018-10-15 20:44:06', 'approved', 'Lhexy Romero', 'Ovis aries', 1, 25, 'Animal Taxonomy', 4, 'read', 'mali', 14),
('2018-10-15 23:45:25', 'approved', 'Lhexy Romero', 'Pseudomonas aeruginosa', 1, 26, 'Bacteria Taxonomy', 5, 'read', '', 14),
('2018-10-15 20:56:28', 'approved', 'Lhexy Romero', 'Ovis aries', 1, 27, 'Animal', 4, 'read', '', 14),
('2018-10-15 23:45:25', 'approved', 'Lhexy Romero', 'Pseudomonas aeruginosa', 1, 28, 'Bacteria', 5, 'read', '', 14),
('2018-10-15 21:17:53', 'approved', 'Lhexy Romero', 'Cystic fibrosis', 1, 29, 'Disease', 4, 'read', '', 14),
('2018-10-15 21:20:02', 'approved', 'Lhexy Romero', 'There\'s no way to prevent cystic fibrosis, but the symptoms can be managed.', 1, 30, 'Prevention', 4, 'read', '', 14),
('2018-10-15 23:49:55', 'approved', 'Lhexy Romero', 'Bronchiectasis', 1, 31, 'Disease', 5, 'read', '', 14),
('2018-10-15 23:51:34', 'approved', 'Lhexy Romero', 'Some cases of bronchiectasis can’t be prevented; other cases CAN be prevented by getting treatment for lung infections right away.', 1, 32, 'Prevention', 5, 'read', '', 14),
('2018-10-15 23:57:06', 'approved', 'Lhexy Romero', 'Gallus gallus', 1, 33, 'Animal Taxonomy', 5, 'read', '', 14),
('2018-10-16 01:24:12', 'approved', 'Lhexy Romero', 'Clostridioides difficile', 1, 34, 'Bacteria Taxonomy', 6, 'read', '', 14),
('2018-10-16 01:22:00', 'approved', 'Lhexy Romero', 'Gallus gallus', 1, 35, 'Animal', 5, 'read', '', 15),
('2018-10-16 01:24:12', 'approved', 'Lhexy Romero', 'Clostridioides difficile', 1, 36, 'Bacteria', 6, 'read', '', 15),
('2018-10-16 01:25:33', 'approved', 'Lhexy Romero', 'Clostridium difficile toxin A, Clostridium difficile toxin B', 1, 37, 'Toxin', 5, 'read', '', 15),
('2018-10-16 01:27:25', 'approved', 'Lhexy Romero', ' Clostridium difficile Infection', 1, 38, 'Disease', 6, 'read', '', 15),
('2018-10-16 01:28:44', 'approved', 'Lhexy Romero', ' Surfaces that may have come into contact with the bacteria or spores, such as toilets, the floor around toilets, bedpans and beds, should also be cleaned thoroughly with water and a cleaning product containing bleach.: People who are infected with C. dif', 1, 39, 'Prevention', 6, 'read', '', 15),
('2018-10-16 01:43:50', 'approved', 'Lhexy Romero', 'Felis domesticus', 1, 40, 'Animal Taxonomy', 6, 'read', '', 10),
('2018-10-16 01:50:43', 'approved', 'Lhexy Romero', 'Bartonella  quintana', 1, 41, 'Bacteria Taxonomy', 7, 'read', '', 10),
('2018-10-16 01:45:29', 'approved', 'Lhexy Romero', 'Felis domesticus', 1, 42, 'Animal', 6, 'read', '', 10),
('2018-10-16 01:50:43', 'approved', 'Lhexy Romero', 'Bartonella  quintana', 1, 43, 'Bacteria', 7, 'read', '', 10),
('2018-10-16 01:53:00', 'approved', 'Lhexy Romero', 'Cat-Scratch Disease', 1, 44, 'Disease', 7, 'read', '', 10),
('2018-10-16 01:53:54', 'approved', 'Lhexy Romero', 'Flea control : Washing hands after handling a cat.', 1, 45, 'Prevention', 7, 'read', '', 10),
('2018-10-16 02:12:33', 'approved', 'Lhexy Romero', 'Capra aegagrus', 1, 46, 'Animal Taxonomy', 7, 'read', '', 17),
('2018-10-16 02:15:48', 'approved', 'Lhexy Romero', 'Bacillus anthracis', 1, 47, 'Bacteria Taxonomy', 8, 'read', '', 17),
('2018-10-16 02:13:25', 'approved', 'Lhexy Romero', 'Capra aegagrus', 1, 48, 'Animal', 7, 'read', '', 17),
('2018-10-16 02:15:48', 'approved', 'Lhexy Romero', 'Bacillus anthracis', 1, 49, 'Bacteria', 8, 'read', '', 17),
('2018-10-16 02:17:30', 'approved', 'Lhexy Romero', 'Haemolysin BL', 1, 50, 'Toxin', 6, 'read', '', 17),
('2018-10-16 02:18:44', 'approved', 'Lhexy Romero', 'Anthrolysin O', 1, 51, 'Toxin', 7, 'read', '', 17),
('2018-10-16 02:20:33', 'approved', 'Lhexy Romero', 'Anthrax', 1, 52, 'Disease', 8, 'read', '', 17),
('2018-10-16 02:21:32', 'approved', 'Lhexy Romero', 'Vaccines : Antibiotics :Quarantine', 1, 53, 'Prevention', 8, 'read', '', 17),
('2018-10-16 02:32:54', 'approved', 'Lhexy Romero', 'Cacatua galerita', 1, 54, 'Animal Taxonomy', 8, 'read', '', 17),
('2018-10-16 02:35:08', 'approved', 'Lhexy Romero', 'Chlamydia psittaci', 1, 55, 'Bacteria Taxonomy', 9, 'read', '', 17),
('2018-10-16 02:35:15', 'approved', 'Lhexy Romero', 'Cacatua galerita', 1, 56, 'Animal', 8, 'read', '', 17),
('2018-10-16 02:35:08', 'approved', 'Lhexy Romero', 'Chlamydia psittaci', 1, 57, 'Bacteria', 9, 'read', '', 17),
('2018-10-16 02:40:33', 'approved', 'Lhexy Romero', 'Psittacosis', 1, 58, 'Disease', 9, 'read', '', 17),
('2018-10-16 02:41:28', 'approved', 'Lhexy Romero', 'Oral Theraphy:Antibiotics', 1, 59, 'Prevention', 9, 'read', '', 17),
('2018-10-16 17:14:35', 'approved', 'Lhexy Romero', 'Canis lupus', 1, 60, 'Animal Taxonomy', 9, 'read', '', 19),
('2018-10-16 17:15:15', 'approved', 'Lhexy Romero', 'Flavobacteriales flavobacteriaceae', 1, 61, 'Bacteria Taxonomy', 10, 'read', '', 19),
('2018-10-16 17:14:48', 'approved', 'Lhexy Romero', 'Canis lupus', 1, 62, 'Animal', 9, 'read', '', 19),
('2018-10-16 17:15:15', 'approved', 'Lhexy Romero', 'Flavobacteriales flavobacteriaceae', 1, 63, 'Bacteria', 10, 'read', '', 19),
('2018-10-16 16:47:08', 'approved', 'Lhexy Romero', 'Capnocytophaga canimorsus infection', 1, 64, 'Disease', 11, 'read', '', 19),
('2018-10-16 16:47:51', 'rejected', 'Lhexy Romero', 'Shiga toxin', 1, 65, 'Toxin', 12, 'read', 'Typo', 19),
('2018-10-25 16:31:11', 'approved', 'Lhexy Romero', 'a', 1, 66, 'Disease', 12, 'read', 'Pls check wisely', 19),
('2018-10-25 19:14:44', 'approved', 'Lhexy Romero', 'a', 1, 67, 'Prevention', 10, 'noticed', '', 19),
('2018-10-25 19:39:57', 'approved', 'Lhexy Romero', 'b', 1, 68, 'Disease', 13, 'read', '', 19),
('2018-10-25 19:40:08', 'approved', 'Lhexy Romero', 'kkk', 1, 69, 'Prevention', 11, 'read', '', 19),
('2018-11-05 17:27:15', 'approved', 'Lhexy Romero', 'a a', 1, 70, 'Animal Taxonomy', 10, 'read', '', 19);

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
(1, 'Lhexy', 'Romero', '', 'contributor', 'lhexyromero@gmail.com', '09452177904', 'sa puso mo', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', '', 11),
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
(2, 'Haemolysin', 'Hemolysins or Haemolysins are molecules that have the ability to lyse red blood cells (RBCs). There are primarily two types of hemolysins: alpha (?) and beta (?). Alpha hemolysins cause a partial lysis of the RBCs, resulting in a darkening of the media around a colony on sheep\'s blood agar (SBA). Beta hemolysins produce a complete lysis of the RBCs, resulting in a clearing around the colony growing on SBA. The chapter discusses the biochemistry of hemolysins. Hemolysins are produced by many of the common indoor fungi. ', 'Hemolysins or haemolysins are lipids and proteins that cause lysis of red blood cells by destroying their cell membrane.', 'approved', 1, '2018-10-13 03:47:39'),
(3, 'Mycolactone', 'A polyketide-derived macrolide designated mycolactone was isolated that causes cytopathicity and cell cycle arrest in cultured L929 murine fibroblasts.', 'Intradermal inoculation of purified toxin into guinea pigs produced a lesion similar to that of Buruli ulcer in humans. This toxin may represent one of a family of virulence factors associated with pathology in mycobacterial diseases such as leprosy and tuberculosis.', 'pending', 1, '2018-10-13 04:16:57'),
(4, 'Mycolactone mlsB', 'A polyketide-derived macrolide designated mycolactone was isolated that causes cytopathicity and cell cycle arrest in cultured L929 murine fibroblasts.', 'Intradermal inoculation of purified toxin into guinea pigs produced a lesion similar to that of Buruli ulcer in humans. This toxin may represent one of a family of virulence factors associated with pathology in mycobacterial diseases such as leprosy and tuberculosis.', 'pending', 1, '2018-10-13 04:18:13'),
(5, 'Clostridium difficile toxin A, Clostridium difficile toxin B', 'Clostridium difficile toxin A (TcdA) is a toxin generated by Clostridium difficile. It is similar to Clostridium difficile Toxin B. The toxins are the main virulence factors produced by the gram positive, anaerobic, Clostridium difficile bacteria. The toxins function by damaging the intestinal mucosa and cause the symptoms of C. difficile infection, including pseudomembranous colitis.,     Clostridium difficile toxin B is a toxin produced by the bacteria Clostridium difficile. C. difficile produces two major kinds of toxins that are very potent and lethal; an enterotoxin (Toxin A) and a cytotoxin (Toxin B, this protein).', 'The toxin acts by modifying host cell GTPase proteins by glucosylation, leading to changes in cellular activities. Risk factors for C. difficile infection include antibiotic treatment, which can disrupt normal intestinal microbiota and lead to colonization of C. difficile bacteria.,   When the catalytic threonine residue of glucosyltransferase deactivates a family of small GTPases,e.g. the Rho family; Rac, and Cdc42 inside the target cells disturb signal transduction mechanisms, which leads to dysfunctioning of actin cytoskeleton, cell-cell junction, and apoptosis. Rho induces the activity of actin stress fibers. Rac proteins controls the activities of membrane ruffling and NADPH-oxidase neutrophil. Cdc42 regulates the F-actin filament formation in filopodia.', 'approved', 1, '2018-10-16 01:25:33'),
(6, 'Haemolysin BL', 'This enterotoxin is toxic only as a ternary complex. Neither any binary combination of the components nor any individual component is toxic in its own right', ' A pore-forming toxin possesses hemolytic, cytotoxic, dermonecrotic, and vascular permeability activities', 'approved', 1, '2018-10-16 02:17:29'),
(7, 'Anthrolysin O', ' Belongs to cholesterol-dependent cytolysin (CDC). CDCs are pore-forming toxins, which require cholesterol in the membrane to form pores with a mechanism not completely clarified.', 'Lytic activity against phagocytes and decreases the barrier function of human polarized epithelial cells', 'approved', 1, '2018-10-16 02:18:43'),
(8, 'Chlamydial cytotoxin', 'Original cytotoxic reports involved lymphogranuloma venereum isolates that apparently do not possess the actual putative cytotoxin gene.', 'Chlamydial cytotoxin does share amino acid sequence similarities to the clostridial toxin B protein and there is one report demonstrating that the ectopically expressed chlamydial protein glycosylates the small GTPase, Rac1, in HeLa cells and causes actin reorganization in a manner similar to ectopically expressed authentic clostridial toxin B.', 'approved', 4, '2018-10-16 02:36:02'),
(9, 'ExotoxinA', 'Secreted by type II secretion pathway\r\nTransported to the endoplasmic reticulum (ER) via a coat protein COPI-dependent retrograde pathway dependent on a KDEL motif', 'Inhibiting host cell protein synthesis', 'approved', 4, '2018-10-16 09:29:39'),
(10, 'ExoenzymeS', 'The ADP-ribosyltransferase activitiy is dependent on host cell factor: the 14-3-3 protein FAS\r\nType III secreted\r\nGolgi-targeting domain required for cytotoxicity\r\nGolgi localization upon expression in CHO cells', 'Inhibits Rho GTPase family signalling, paralysing macrophages, Inhibition of phagocytosis', 'approved', 4, '2018-10-16 09:30:37'),
(11, 'ExoenzymeT', 'ExoS and ExoT are highly related and have dual functions', 'Contributes to actin cytoskeleton disruption and inhibition of internalization of the bacteria', 'approved', 4, '2018-10-16 09:31:30'),
(12, 'Shiga toxin', 'Shiga toxin (Stx) is one of the most potent bacterial toxins known. Stx is found in Shigella dysenteriae 1 and in some serogroups of Escherichia coli (called Stx1 in E. coli).	Shiga Toxin acts as an N-glycosidase, removing an adenine from the 28S ribosomal rRNA of a target cell which leads to inhibition of protein elongation and ultimately cellular apoptosis. The B subunit is necessary for binding to globo series glycolipid globotriaosylceramide (Gb3), a eukaryotic membrane receptor, where it is then endocytosed and proteolytically cleaved into an active A subunit and a B subunit. The B subunit is not active in the depurination of of 28S rRNA, but is essential for GB3 binding and therefore essential for toxicity. Once in the cytosol the A subunit is free to interact with and inactivate 28S rRNA. On the A subunit Tyr77, Tyr114, Glu167, Arg170, and Trp203 are all essential in glycosidic activity. This mechanism (B subunit binding to globotriaosylceramide and A subunit depurinating 28S rRNA) is conserved amongst the Stx family as well as the ricin toxin.	', 'Shiga toxin (Stx) is one of the most potent bacterial toxins known. Stx is found in Shigella dysenteriae 1 and in some serogroups of Escherichia coli (called Stx1 in E. coli).	Shiga Toxin acts as an N-glycosidase, removing an adenine from the 28S ribosomal rRNA of a target cell which leads to inhibition of protein elongation and ultimately cellular apoptosis. The B subunit is necessary for binding to globo series glycolipid globotriaosylceramide (Gb3), a eukaryotic membrane receptor, where it is then endocytosed and proteolytically cleaved into an active A subunit and a B subunit. The B subunit is not active in the depurination of of 28S rRNA, but is essential for GB3 binding and therefore essential for toxicity. Once in the cytosol the A subunit is free to interact with and inactivate 28S rRNA. On the A subunit Tyr77, Tyr114, Glu167, Arg170, and Trp203 are all essential in glycosidic activity. This mechanism (B subunit binding to globotriaosylceramide and A subunit depurinating 28S rRNA) is conserved amongst the Stx family as well as the ricin toxin.	', 'rejected', 1, '2018-10-16 16:47:51');

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
('Comparative study of the gut microbiome potentially related to milk protein in Murrah buffaloes (Bubalus bubalis) and Chinese Holstein cattle', 'RUMINANTS GUTS', 'ThankyouQ', '10.1038/srep42189', 'js\\public\\others\\81082acb5fdc9f7.pdf', 44, 1, '2018-10-13 04:08:01', '2017', 3),
('Pseudomonas aeruginosa genomic structure and diversity', 'Pseudomonas aeruginosa', 'Pseudomonas aeruginosa journal', '10.3389/fmicb.2011.00150', 'js\\public\\others\\95469253523d39d.pdf', 44, 1, '2018-10-15 20:29:57', '2011', 4),
('Microbial Shifts in the Intestinal Microbiota of Salmonella Infected Chickens in Response to Enrofloxacin', 'Chicken', 'Bacteria from chicken Journal', '10.3389/fmicb.2017.01711', 'js\\public\\others\\2c7749fa0e6fa26.pdf', 44, 1, '2018-10-16 00:25:43', '2017', 5),
('The feline skin microbiota: The bacteria inhabiting the skin of healthy and allergic cats', 'Cats microbiota', 'The feline skin microbiota: The bacteria\r\ninhabiting the skin of healthy and allergic cats Journal', '.org/', 'js\\public\\others\\b8ea5e5e42e0f8a.pdf', 44, 1, '2018-10-16 01:38:38', '2017', 6),
('Exploring the Goat Rumen Microbiome from Seven Days to Two Years', 'Goat', 'ZOODIS 16: Exploring the Goat Rumen Microbiome from Seven Days to Two Years journal', '10.1371/journal.', 'js\\public\\others\\b5654f5a89194f0.pdf', 44, 1, '2018-10-16 02:05:38', '2016', 7),
('Parrot', 'Parrot Microbiota', 'Parrot microbiota and diseases', '10.1038/srep30019', 'js\\public\\others\\f5741d10afb337e.pdf', 44, 1, '2018-10-16 02:29:00', '2016', 8),
('Capnocytophaga canimorsus: an emerging cause of sepsis, meningitis, and post-splenectomy infection after dog bites', 'Dog Microbiota', 'Dog Journal', '10.1007/s10096-015-2360-7', 'js\\public\\others\\beb199464239c69.pdf', 44, 1, '2018-10-16 16:37:09', '2015', 9);

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
-- Indexes for table `ac_animal_t`
--
ALTER TABLE `ac_animal_t`
  ADD PRIMARY KEY (`ac_aID`);

--
-- Indexes for table `ac_bacteria_t`
--
ALTER TABLE `ac_bacteria_t`
  ADD PRIMARY KEY (`ac_bID`);

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
-- AUTO_INCREMENT for table `ac_animal_t`
--
ALTER TABLE `ac_animal_t`
  MODIFY `ac_aID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ac_bacteria_t`
--
ALTER TABLE `ac_bacteria_t`
  MODIFY `ac_bID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `animalbacteria_t`
--
ALTER TABLE `animalbacteria_t`
  MODIFY `animalbacteriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `animaltaxo_t`
--
ALTER TABLE `animaltaxo_t`
  MODIFY `animalTaxoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `animal_t`
--
ALTER TABLE `animal_t`
  MODIFY `animalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `bacteriataxo_t`
--
ALTER TABLE `bacteriataxo_t`
  MODIFY `bacteriumTaxoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `bacteriatoxin_t`
--
ALTER TABLE `bacteriatoxin_t`
  MODIFY `bacteriaToxinID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `bacteria_t`
--
ALTER TABLE `bacteria_t`
  MODIFY `bacteriumID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `disease_t`
--
ALTER TABLE `disease_t`
  MODIFY `diseaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `journal_t`
--
ALTER TABLE `journal_t`
  MODIFY `journalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `prevention_t`
--
ALTER TABLE `prevention_t`
  MODIFY `preventionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `request_t`
--
ALTER TABLE `request_t`
  MODIFY `requestID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

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
  MODIFY `toxinID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `userjournal_t`
--
ALTER TABLE `userjournal_t`
  MODIFY `userjournalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
