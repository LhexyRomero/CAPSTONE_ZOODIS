SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `animalbacteria_t` (
  `animalbacteriaID` int(11) NOT NULL,
  `animalID` int(11) NOT NULL,
  `bacteriumID` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `animalbacteria_t` (`animalbacteriaID`, `animalID`, `bacteriumID`, `status`) VALUES
(1, 13, 11, 1),
(2, 27, 27, 0),
(3, 23, 27, 1),
(4, 23, 27, 1),
(5, 15, 28, 1),
(6, 24, 29, 1),
(7, 25, 30, 1),
(8, 19, 24, 1),
(9, 15, 31, 1),
(10, 14, 32, 1),
(11, 25, 15, 0),
(12, 13, 34, 0),
(13, 13, 34, 0),
(14, 13, 34, 0),
(15, 13, 34, 0),
(16, 13, 34, 0),
(17, 24, 35, 0),
(18, 14, 35, 0),
(19, 30, 35, 0),
(20, 28, 35, 0),
(21, 31, 35, 0),
(22, 25, 36, 0),
(23, 29, 36, 0),
(24, 30, 34, 0),
(25, 15, 16, 0),
(26, 24, 34, 0),
(27, 13, 14, 0),
(28, 13, 14, 1),
(29, 27, 17, 1),
(30, 28, 37, 1);

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

INSERT INTO `animaltaxo_t` (`animalTaxoID`, `phylum`, `class`, `orderr`, `family`, `genus`, `species`, `status`, `journalID`, `dateTime`, `staffID`) VALUES
(14, 'Chordata', 'Aves', 'Galliformes', 'Phasianidae', 'Gallus', 'gallus', 'approved', 7, '2018-10-01 21:34:07', 1),
(15, 'Chordata', 'Mammalia', 'Rodentia', 'unranked', 'Rattus', 'rattus', 'approved', 9, '2018-10-01 21:34:07', 6),
(16, 'Chordata', 'Mammalia', 'Carnivora', 'Canidae', 'Canis', 'lupus', 'approved', 8, '2018-10-01 21:34:07', 7),
(17, 'Cordata', 'Aves', 'Anseriformes', 'Anatidae', 'Anas', 'platyrhynchos', 'approved', 5, '2018-10-01 21:34:07', 1),
(18, 'Chordata', 'Aves', 'Psottaciformes', 'Cacatuidae', 'Cacatua', 'galerita', 'pending', 6, '2018-10-01 21:34:07', 1),
(19, 'Chordata', 'Mammalia', 'Carnivora', 'Felidae', 'Felis', 'silvestris', 'approved', 11, '2018-10-01 21:34:07', 4),
(20, 'Chordata', 'Mammalia', 'Proboscidea', 'Elephantidae', 'Elephas', 'maximus', 'approved', 12, '2018-10-01 21:34:07', 4),
(21, 'Chordata', 'Mammalia', 'Artiodactyla', 'Bovidae', 'Bos', 'taurus', 'approved', 14, '2018-10-01 21:34:07', 4),
(22, 'asdaa', 'aa', 'aaaa', 'aaaaa', 'Aso', 'canis lupus', 'approved', 11, '2018-10-01 21:34:07', 4),
(23, 'a', 'a', 'a', 'a', 'a', 'a', 'pending', 10, '2018-10-01 21:34:07', 1),
(24, 'a', 'a', 'a', 'a', 'bbb', 'a', 'pending', 10, '2018-10-01 21:34:07', 1),
(25, 'k', 'k', 'k', 'k', 'kk', 'k', 'pending', 10, '2018-10-05 10:03:07', 1),
(26, 'er', 'rerer', 'ere', 'rer', 'ere', 'rer', 'pending', 7, '2018-10-06 11:23:32', 6),
(27, 'mm', 'm', 'm', 'm', 'mmmm', 'mmm', 'pending', 18, '2018-10-08 14:53:26', 1);

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

INSERT INTO `animal_t` (`animalID`, `animalName`, `animalScientificName`, `animalTaxoID`, `image`, `status`, `journalID`, `staffID`, `dateTime`) VALUES
(13, 'Chicken', 'Gallus gallus', 14, 'public\\others\\ea048baf270523f.jpeg', 'approved', 7, 1, '2018-08-27'),
(14, 'Rat', 'Rattus rattus', 15, 'public\\others\\39af267f7cf7dc4.jpeg', 'approved', 9, 6, '2018-08-29'),
(15, 'Dog', 'Canis lupus', 16, 'public\\others\\bcf5bbb664679e7.jpeg', 'approved', 8, 7, '2018-08-29'),
(16, 'Duck', 'Anas platyrhynchos', 17, 'public\\others\\b9c5ace9e9d2646.jpeg', 'pending', 5, 1, '2018-08-27'),
(17, 'Parrot', 'Cacatua galerita', 18, 'public\\others\\28042b2f061349a.jpeg', 'approved', 6, 1, '2018-08-29'),
(18, 'Cat', 'Felis silvestris', 19, 'public\\image_upload\\ebf117e021e408a.jpeg', 'approved', 11, 4, '2018-08-29 09:35:40'),
(19, 'Asian Elephant', 'Elephas maximus', 20, 'public\\image_upload\\e60a030c6c9e107.jpeg', 'approved', 12, 4, '2018-08-29 09:49:31'),
(20, 'Chicken', 'Canis lupus', 16, 'public\\image_upload\\054fa206c054bcf.jpeg', 'approved', 13, 4, '2018-08-29 09:59:38'),
(21, 'Cattle', 'Bos taurus', 21, 'public\\image_upload\\7fdd9be23f86118.jpeg', 'approved', 14, 4, '2018-08-29 10:10:58'),
(22, 'Goat', 'Gallus gallus', 14, 'public\\image_upload\\3da2aa7e8694272.jpeg', 'approved', 6, 4, '2018-08-29 16:49:53'),
(23, 'sample name', 'Canis lupus', 16, 'public\\image_upload\\cca799b8af959f8.png', 'pending', 11, 7, '2018-09-24'),
(24, 'Aso', 'Canis lupus', 16, 'public\\image_upload\\20dc3f2a0426e95.png', 'approved', 5, 4, '2018-09-24 19:41:57'),
(25, 'aaab', 'Canis lupus', 16, 'public\\image_upload\\179a7d9956f7ed1.jpeg', 'approved', 10, 4, '2018-09-28 14:29:42'),
(26, 'a', 'Canis lupus', 16, 'public\\image_upload\\d15c1b08fc0e84a.jpeg', 'pending', 5, 1, '2018-10-03 04:17:35'),
(27, 'abbbb', 'Gallus gallus', 14, 'public\\image_upload\\0ef09a8c113951a.jpeg', 'pending', 5, 1, '2018-10-03 04:20:39'),
(28, 'ererererererer', 'ere rer', 26, 'js\\public\\image_upload\\2f9e817baf2a9a4.jpeg', 'pending', 7, 6, '2018-10-06 11:29:02'),
(29, 'rerererere', 'ere rer', 26, 'js\\public\\image_upload\\540f9bca2705add.jpeg', 'pending', 7, 6, '2018-10-06 11:30:08'),
(30, 'erererer', 'ere rer', 26, 'js\\public\\image_upload\\66c279191eea32d.jpeg', 'pending', 7, 6, '2018-10-06 11:31:09'),
(31, 'perperepre', 'ere rer', 26, 'js\\public\\image_upload\\612f1c39859e313.jpeg', 'pending', 7, 6, '2018-10-06 11:34:31');

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

INSERT INTO `bacteriataxo_t` (`bacteriumTaxoID`, `phylum`, `class`, `orderr`, `family`, `genus`, `species`, `status`, `journalID`, `staffID`, `dateTime`) VALUES
(11, 'Firmicutes', 'Clostridia', 'Clostridiales', 'Peptostreptococcaceae', 'Clostridioides', 'difficile', 'approved', 7, 1, '2018-08-27'),
(12, 'Spirochaetes', 'Spirochaetes', 'Spirochaetales', 'Leptospiraceae', 'Leptospira', 'interrogans', 'approved', 9, 6, '2018-08-29'),
(13, 'Bacteroidetes', 'Flavobacteria', 'Flavobacteriales', 'Flavobacteriaceae', 'Capnocytophaga', 'canimorsus', 'approved', 8, 7, '2018-08-29'),
(14, 'Proteobacteria', 'Gammaproteobacteria', 'Enterobacteriales', 'Enterobacteriaceae', 'Salmonella', 'bongori', 'pending', 5, 1, '2018-08-27'),
(15, 'Chlamydiae', 'unranked', 'Chlyamydiales', 'Chlamydiaceae', 'Chlamydia', 'psittaci', 'approved', 6, 1, '2018-08-29'),
(16, 'Firmicutes', 'Bacilli', 'Bacillales', ' Staphylococcaceae', 'Staphylococcus', 'aureus', 'approved', 11, 4, '2018-08-29 09:33:31'),
(17, 'Actinobacteria', 'Actinobacteria', 'Actinomycetales', 'Mycobacteriaceae', 'Mycobacterium', 'tuberculosis', 'approved', 12, 4, '2018-08-29 09:48:30'),
(18, 'Proteobacteria', 'Epsilonproteobacteria', 'Campylobacterales', 'Campylobacteraceae', 'Campylobacter', 'jejuni', 'approved', 13, 4, '2018-08-29 09:58:19'),
(19, 'Proteobacteria', 'Gammaproteobacteria', ' Enterobacteriales', 'Enterobacteriaceae', 'Escherichia', 'coli', 'approved', 14, 4, '2018-08-29 10:11:56'),
(20, 'Actinobacteria', 'Actinobacteria', 'Actinomycelates', 'Mycobacteriaceae', 'Mycobacterium', 'bovae', 'approved', 15, 4, '2018-08-29 10:30:59'),
(21, 'sample phylum', 'samp class', 'samp order', 'samp family', 'a', 'a', 'pending', 11, 7, '2018-09-24'),
(22, 'bbb', 'asdfghjkl', 'ako', 'bobo', 'pusa', 'meow', 'approved', 7, 4, '2018-09-24 19:30:22'),
(23, 'er', 'ere', 're', 're', 're', 're', 'pending', 7, 6, '2018-10-06 11:23:48'),
(24, 'nn', 'n', 'n', 'n', 'nnnn', 'nn', 'pending', 18, 1, '2018-10-08 14:53:58'),
(25, 'ee', 'eee', 'e', 'e', 'ee', 'bbbbbba', 'approved', 19, 4, '2018-10-09 16:05:34'),
(26, 'oo', 'o', 'o', 'oo', 'o', 'o', 'approved', 19, 4, '2018-10-09 16:49:17'),
(27, 'll', 'll', 'l', 'llll', 'lnmm', 'm', 'pending', 18, 1, '2018-10-09 22:19:49'),
(28, 'j', 'j', 'a', 'j', 'jjjj', 'jjjjj', 'pending', 18, 1, '2018-10-09 23:30:10');

CREATE TABLE `bacteriatoxin_t` (
  `bacteriaToxinID` int(11) NOT NULL,
  `bacteriumID` int(11) NOT NULL,
  `toxinID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `bacteriatoxin_t` (`bacteriaToxinID`, `bacteriumID`, `toxinID`) VALUES
(9, 11, 9),
(10, 11, 10),
(11, 12, 11),
(12, 13, 12),
(13, 14, 13),
(14, 14, 14),
(15, 15, 15),
(16, 11, 23),
(17, 12, 24),
(18, 23, 25),
(19, 23, 26),
(20, 23, 27);

CREATE TABLE `bacteria_t` (
  `bacteriumID` int(11) NOT NULL,
  `bacteriumSpeciesName` varchar(255) NOT NULL,
  `bacteriumGenusName` varchar(255) NOT NULL,
  `bacteriumScientificName` varchar(255) NOT NULL,
  `bacteriumTissueSpecifity` varchar(255) NOT NULL,
  `bacteriumSampleType` varchar(255) NOT NULL,
  `bacteriumIsolation` varchar(255) NOT NULL,
  `bacteriumIdentification` varchar(255) NOT NULL,
  `bacteriumTaxoID` int(11) NOT NULL,
  `journalID` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `bacteria_t` (`bacteriumID`, `bacteriumSpeciesName`, `bacteriumGenusName`, `bacteriumScientificName`, `bacteriumTissueSpecifity`, `bacteriumSampleType`, `bacteriumIsolation`, `bacteriumIdentification`, `bacteriumTaxoID`, `journalID`, `status`, `staffID`, `dateTime`) VALUES
(11, 'difficile', 'Clostridioides', 'Clostridioides difficile', 'a', 'a', 'a', 'a', 11, 7, 'approved', 4, '2018-08-27'),
(12, 'interrogans', 'Leptospira', 'Leptospira interrogans', 'a', 'a', 'a', 'a', 12, 9, 'approved', 4, '2018-08-29'),
(13, 'canimorsus', 'Capnocytophaga', 'Capnocytophaga canimorsus', 'a', 'a', 'a', 'a', 13, 8, 'approved', 4, '2018-08-29'),
(14, 'bongori', 'Salmonella', 'Salmonella bongori', 'a', 'a', 'a', 'a', 14, 5, 'approved', 4, '2018-08-29'),
(15, 'psittaci', 'Chlamydia', 'Chlamydia psittaci', 'a', 'a', 'a', 'a', 15, 6, 'approved', 4, '2018-08-29'),
(16, 'aureus', 'Staphylococcus', 'Staphylococcus aureus', 'a', 'a', 'a', 'a', 16, 11, 'approved', 4, '2018-08-29 09:36:13'),
(17, 'tuberculosis', 'Mycobacterium', 'Mycobacterium tuberculosis', 'a', 'a', 'asdfghj', 'a', 17, 12, 'approved', 4, '2018-08-29 09:50:02'),
(18, 'jejuni', 'Campylobacter', 'Campylobacter jejuni', 'a', 'a', 'a', 'a', 18, 13, 'approved', 4, '2018-08-29 10:00:55'),
(19, 'coli', 'Escherichia', 'Escherichia coli', 'a', 'a', 'a', 'a', 19, 14, 'approved', 4, '2018-08-29 10:12:30'),
(20, 'bovae', 'Mycobacterium', 'Mycobacterium bovae', 'a', 'a', 'a', 'a', 20, 15, 'approved', 4, '2018-08-29 10:31:31'),
(21, 'difficile', 'Clostridioides', 'Clostridioides difficile', 'a', 'a', 'a', 'a', 11, 16, 'approved', 4, '2018-08-29 16:51:25'),
(22, 'aureus', 'Staphylococcus', 'Staphylococcus aureus', 'asd', 'asdf', 'method mo to', 'aaaaaaah', 16, 11, 'pending', 7, '2018-09-24'),
(23, 'meow', 'pusa', 'pusa meow', 'asd', 'aaaaa', 'aaaaaaawwww', 'aadfg', 22, 5, 'approved', 4, '2018-09-24 19:45:56'),
(24, 're', 're', 're re', 'qw', 'qw', 'qw', 'qw', 23, 7, 'pending', 6, '2018-10-06 11:35:28'),
(25, 'interrogans', 'Leptospira', 'Leptospira interrogans', 'qw', 'qw', 'qw', 'qw', 12, 7, 'pending', 6, '2018-10-06 11:36:56'),
(26, 're', 're', 're re', 'uyu', 'uyuy', 'uuyuyu', 'uyuy', 23, 7, 'pending', 6, '2018-10-06 11:37:42'),
(27, 'a', 'a', 'a a', 'a', 'a', 'a', 'aa', 21, 5, 'approved', 4, '2018-10-08 00:12:09'),
(28, 'a', 'a', 'a a', 'a', 'a', 'a', 'a', 21, 5, 'approved', 4, '2018-10-08 00:17:02'),
(29, 'a', 'a', 'a a', 'a', 'a', 'a', 'a', 21, 5, 'approved', 4, '2018-10-08 00:17:32'),
(30, 'a', 'a', 'a a', 'a', 'a', 'a', 'a', 21, 5, 'approved', 4, '2018-10-08 00:18:08'),
(31, 'difficile', 'Clostridioides', 'Clostridioides difficile', 'a', 'a', 'a', 'a', 11, 7, 'approved', 4, '2018-10-08 00:21:50'),
(32, 'difficile', 'Clostridioides', 'Clostridioides difficile', 'a', 'a', 'a', 'a', 11, 5, 'approved', 4, '2018-10-08 00:22:07'),
(33, 'nn', 'nnnn', 'nnnn nn', 'a', 'a', 'a', 'a', 24, 18, 'pending', 1, '2018-10-08 14:56:28'),
(34, 'bbbbbba', 'ee', 'ee bbbbbba', 'a', 'a', 'a', 'a', 25, 5, 'approved', 4, '2018-10-09 16:06:00'),
(35, 'o', 'o', 'o o', 'o', 'o', 'o', 'o', 26, 5, 'approved', 4, '2018-10-09 16:49:41'),
(36, 'm', 'lnmm', 'lnmm m', 'm', 'm', 'mm', 'm', 27, 18, 'pending', 1, '2018-10-09 22:20:08'),
(37, 'jjjjj', 'jjjj', 'jjjj jjjjj', 'a', 'a', 'a', 'a', 28, 18, 'pending', 1, '2018-10-09 23:30:24');

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

INSERT INTO `disease_t` (`diseaseID`, `bodySite`, `diseaseName`, `diseaseDesc`, `symptoms`, `journalID`, `status`, `staffID`, `dateTime`) VALUES
(13, '', ' Clostridium difficile Infection', 'Clostridium difficile infection is spread by bacterial spores found within feces. Surfaces may become contaminated with the spores with further spread occurring via the hands of healthcare workers. Diagnosis is by stool culture or testing for the bacteria\'s DNA or toxins known as Clostridium difficile toxin A and Clostridium difficile toxin B.', 'Diarrheaa:Fever:Abdominal pain', 7, 'approved', 1, '2018-08-27'),
(14, '', 'Leptospirosis', 'Leptospirosis is a rare bacterial infection we get from animals. It\'s spread through their urine that contain leptospira where haemolysin toxin is present, especially from dogs, rodents, and farm animals. They may not have any symptoms, but they can be carriers. In most cases, leptospirosis is unpleasant but not life-threatening, like a case of the flu.', 'High Fever:Head ache and Muscles ache:Vomiting:Jaundice(yellow skin and eyes):Abdominal Pain:Rash', 9, 'pending', 6, '2018-08-27'),
(15, '', 'Capnocytophaga canimorsus Infection', '\r\n\r\n\r\nCapnocytophaga canimorsus infection may be complicated by thrombotic microangiopathy, for which plasma exchange should be considered prior to definitive diagnosis of thrombotic microangiopathy.Thrombotic microangiopathy syndrome includes ADAMTS13 deficiency?, Shiga toxin?, and complement?mediated TMA. ADAMTS13 activity is severely decreased in patients with ADAMTS13 deficiency?mediated TMA (<5% in most patients), and Shiga toxin?mediated TMA is mainly caused by enterohemorrhagic Escherichia coli infection.', 'Blisters around the bite wound within hours of the bite.:Redness, swelling, draining pus, or pain at the bite wound.:Fever,   Diarrhea and stomach pain.:Vomiting,   Headache and confusion., Muscle or joint pain.', 8, 'approved', 7, '2018-08-27'),
(16, '', 'Salmonellosis', 'Salmonella infection (salmonellosis) is a common bacterial disease from Salmonella bongori that affects the intestinal tract.  Salnonella produces Cytolethal distending toxin B (CdtB), Salmonella plasmid virulence A (SpvA), & Salmonella plasmid virulence B (SpvB) and typically lives in animal and human intestines and are shed through feces. Humans become infected most frequently through contaminated water or food.', 'Nausea:Vomiting:Abdominal Cramps:Diarrhea:Fever:Chills:Headache:Blood in the stool', 5, 'pending', 1, '2018-08-27'),
(17, '', 'Psittacosis', 'Psittacosis—also known as parrot fever, and ornithosis—is a zoonotic infectious disease caused by a bacterium called Chlamydia psittaci producing a toxin called Chlamydial cytotoxin and contracted from infected parrots. The incidence of infection in canaries and finches is believed to be lower than in psittacine birds.', ' In the first week of psittacosis the symptoms mimic typhoid fever: prostrating high fevers, joint pains, diarrhea, conjunctivitis, nose bleeds and low level of white blood cells in the blood.:Rose spots can appear and these are called Horder\'s spots.:Spleen enlargement is common towards the end of the first week.:Headache can be so severe that it suggests meningitis and some nuchal rigidity is not unusual.', 6, 'rejected', 1, '2018-08-27'),
(18, '', 'Staphylococcal infection', 'The Staphylococcus bacteria is one of the more commonly transmitted infections coming from it\'s toxin Alpha toxin, passing easily from animal to animal and in some cases from animal to human. This bacteria can live free in the environment, on the skin of a host as a parasite, and in the upper respiratory tract of animals. This infection can be found in any breed of cat, and at any age.', 'Fever, Lack of appetite, Pain:Abscesses on the skin, Infections of the eyes, skin, ears, eyes or respiratory system:Itching (pruritus), Inflammation marked by pus filled lesions (pyoderma).', 11, 'approved', 4, '2018-08-29 09:38:28'),
(19, '', 'Tuberculosis', 'Mycobacterium tuberculosis (Mtb) induces necrosis of infected cells to evade immune responses. Recently, we found that Mtb uses the protein CpnT to kill human macrophages by secreting its C-terminal domain, named tuberculosis necrotizing toxin (TNT), which induces necrosis by an unknown mechanism.Tuberculosis (TB) is a potentially serious infectious disease that mainly affects your lungs. The bacteria that cause tuberculosis is Mycobacterium. Mycolactone mlsA1, mlsA2, and mlsB toxins are produced by the bacteria and are spread from one person to another through tiny droplets released into the air via coughs and sneezes.', 'Coughing that lasts three or more weeks:Coughing up blood:Chest pain, or pain with breathing or coughing:Unintentional weight loss:Loss of Appetite', 12, 'approved', 4, '2018-08-29 09:51:40'),
(20, '', 'Campylobacteriosis ', 'Caused by the Campylobacter bacterium that produces cytolethal distending toxin, most cases of campylobacteriosis are associated with eating raw or undercooked poultry or meat, or from cross-contamination of other foods by these items. It is one of the most common causes of diarrheal illness in the United States. Pets can also become infected, and people can get sick from contact with the stool of an ill dog or cat.', 'Diarrheaa:Abdominal Pain and Cramps:Fever and Vomiting', 13, 'approved', 4, '2018-08-29 10:03:19'),
(21, '', 'e.coli Infection', 'E. coli O157 is naturally found in the intestinal tracts of many farm animals, including healthy cattle, sheep, and goats. Animals can carry E. coli O157 producing Shiga toxin  and shed the germs in their stool but still appear healthy and clean. Animals can appear healthy and clean but can spread E. coli O157 to humans or other animals.', 'Watery or Bloody Diarrhea:Fever:Abdominal Cramps', 14, 'approved', 4, '2018-08-29 10:19:29'),
(22, '', 'salmonella', 'masakit itu', 'symptom 1', 11, 'approved', 7, '2018-09-24'),
(23, '', 'Flor disease', 'mahirap itu', 'masakit sa ulo', 8, 'approved', 4, '2018-09-24 19:50:46'),
(24, '', 'a', 'a', 'a', 10, 'pending', 1, '2018-09-28'),
(25, '', 'b', 'b', 'b', 10, 'pending', 1, '2018-09-28'),
(26, '', 'abbbb', 'a', 'a', 10, 'pending', 1, '2018-09-28'),
(27, '', 'abbbbbbbbbbbbb', 'a', 'a:a', 10, 'approved', 4, '2018-09-28 12:18:18'),
(28, 'akak', 'ak', 'a', 'a', 10, 'approved', 4, '2018-09-28 12:23:24'),
(29, '', 'erererererer', 'erererere', 'rererere', 7, 'pending', 6, '2018-10-06 11:37:57'),
(30, 'jj:j:', 'a', 'a', 'kk:m:', 18, 'pending', 1, '2018-10-10 02:01:48');

CREATE TABLE `journal_t` (
  `journalID` int(11) NOT NULL,
  `code` varchar(25) NOT NULL,
  `name` varchar(255) NOT NULL,
  `doi` varchar(25) NOT NULL,
  `status` varchar(25) NOT NULL,
  `file` varchar(255) NOT NULL,
  `state` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `journal_t` (`journalID`, `code`, `name`, `doi`, `status`, `file`, `state`) VALUES
(5, 'ZOODIS#83', 'Characterization of Gut Microbiome Dynamics in Developing Pekin Ducks and Impact of Management System', ' 10.3389/fmicb.2016.02125', 'completed', 'public\\others\\ae3c0cc7dfcfbb2.pdf', 'noticed'),
(6, 'BASILIO#173', 'Zoonotic Diseases of Common Pet Birds: Psittacine, Passerine, and Columbiform Species', '10.1016/j.cvex.2011.05.00', 'completed', 'public\\others\\579d0a1530eecdf.pdf', 'noticed'),
(7, 'BASILIO#24', 'Microbial Shifts in the Intestinal Microbiota of Salmonella Infected Chickens in Response to Enrofloxacin', '10.3389/fmicb.2017.01711', 'Incomplete', 'public\\others\\95f25a4515dfd82.pdf', 'noticed'),
(8, 'ZOODIS#101', 'Capnocytophaga canimorsus: an emerging cause of sepsis, meningitis, and post-splenectomy infection after dog bites', '10.1007/s10096-015-2360-7', 'Incomplete', 'public\\others\\c3e3f5c8ef3a078.pdf', 'notify'),
(9, 'ZOODIS#102', 'Ecology of Leptospira interrogans in Norway Rats (Rattus norvegicus) in an Inner-City Neighborhood of Vancouver, Canada', '10.1371/journal.pntd.0002', 'Incomplete', 'public\\others\\c156f82ef274e01.pdf', 'notify'),
(10, 'none', 'none', 'none', 'Incomplete', 'none', 'notify'),
(11, 'ZOODIS#90', 'The feline skin microbiota: The bacteria inhabiting the skin of healthy and allergic cats', '10.1371/journal.pone.0178', 'Incomplete', 'public\\others\\decd410503b4e2a.pdf', 'noticed'),
(12, 'ZOODIS#105', 'Mycobacterium tuberculosis in Wild Asian Elephants, Southern India', '10.3201/eid2303.161741', 'completed', 'public\\others\\17d2e15be729eaf.pdf', 'notify'),
(13, 'ZOODIS#104', 'Global Epidemiology of Campylobacter Infection', '10.1128/CMR.00006-15', 'completed', 'public\\others\\6a04a5a39a4100d.pdf', 'notify'),
(14, 'ZOODIS#103', 'Cattle Water Troughs as Reservoirs of Escherichia coli O157', '10.1128/AEM.67.7.3053-305', 'completed', 'public\\others\\919176a3930ba28.pdf', 'notify'),
(15, 'ZOODIS#136', ' Comparative study of the gut microbiome potentially related to milk protein in Murrah buffaloes (Bubalus bubalis) and Chinese Holstein cattle', '0.1038/srep42189', 'Incomplete', 'public\\others\\a2db2db4a4f2bcd.pdf', 'notify'),
(16, 'ZOODIS #6', 'jOURNAL sss', '10:12345', 'Incomplete', 'public\\others\\d349f7e1fb2bb64.pdf', 'notify'),
(17, 'RJ104', 'Lhexy Romero', '10.1128/CMR.00006-15.', 'Incomplete', 'js\\public\\others\\5d52966687186fd.pdf', 'notify'),
(18, 'RJ180', 'RUMINANT', '10.1371/journal.pntd.0002', 'Incomplete', 'js\\public\\others\\d54ccd115a18532.pdf', 'noticed'),
(19, 'ZOODIS#244444444', 'a', '56888/33', 'Incomplete', 'js\\public\\others\\2c94c409433a5ad.pdf', 'notify');

CREATE TABLE `prevention_t` (
  `preventionID` int(11) NOT NULL,
  `preventions` text NOT NULL,
  `diseaseID` int(11) NOT NULL,
  `status` varchar(25) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `prevention_t` (`preventionID`, `preventions`, `diseaseID`, `status`, `staffID`, `dateTime`) VALUES
(9, 'Wash hands regularly and thoroughly.: Surfaces that may have come into contact with the bacteria or spores, such as toilets, the floor around toilets, bedpans and beds, should also be cleaned thoroughly with water and a cleaning product containing bleach.:People who are infected with C. difficile should have their own room and toilet facilities to avoid passing the infection onto others.', 13, 'approved', 1, '2018-08-27'),
(10, 'Avoid contaminated water.: Keep away from infected animals, especially wild rats.:Be aware of your surroundings, especially when you travel. ', 14, 'approved', 6, '2018-08-27'),
(11, 'If you have been bitten by a dog or cat, call your doctor right away, even if you don’t feel sick.', 15, 'approved', 7, '2018-08-27'),
(12, 'Antibiotics:Oral Therapy', 17, 'pending', 1, '2018-08-27'),
(13, 'Facilitate a strong immune system.:Bathe your cat when needed.:Have your cat\'s fur checked for fleas every month.', 18, 'approved', 4, '2018-08-29 09:39:16'),
(14, 'Wearing a mask, covering the mouth:Drug Treatment:Cough Etiquette', 19, 'approved', 4, '2018-08-29 09:52:00'),
(15, 'Wash hands, cutting boards, countertops, cutlery, and utensils after handling uncooked poultry.:Keep raw meat and poultry separate from produce and other foods when shopping for and storing groceries.:added prevention', 20, 'approved', 4, '2018-08-29 10:03:55'),
(16, 'Wash utensils.:Use hot soapy water on knives, countertops and cutting boards before and after they come into contact with fresh produce or raw meat.:Wash your hands.', 21, 'approved', 4, '2018-08-29 10:20:26'),
(17, 'hahahahaha', 22, 'rejected', 7, '2018-09-24'),
(18, 'dddddd', 23, 'approved', 4, '2018-09-24 19:51:09'),
(19, 'a:a', 16, 'approved', 4, '2018-09-26 23:07:03'),
(20, 'a:a', 27, 'approved', 4, '2018-10-03 04:10:01'),
(21, 'yyytyytyt:yuytytytyty', 29, 'pending', 6, '2018-10-06 11:38:14');

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

INSERT INTO `request_t` (`dateTime`, `status`, `staffName`, `addedData`, `staffID`, `requestID`, `category`, `addedID`, `state`, `message`, `assignID`) VALUES
('2018-08-29', 'approved', 'lhexy romero', 'Gallus gallus', 1, 73, 'Animal Taxonomy', 14, 'read', '', 0),
('2018-08-27', 'approved', 'lhexy romero', 'Clostridioides difficile', 1, 74, 'Bacteria Taxonomy', 11, 'read', '', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Gallus gallus', 1, 75, 'Animal', 13, 'read', '', 0),
('2018-08-27', 'approved', 'lhexy romero', 'Clostridioides difficile', 1, 76, 'Bacteria', 11, 'read', '', 0),
('2018-08-27', 'rejected', 'lhexy romero', 'Clostridium difficile toxin A', 1, 77, 'Toxin', 9, 'read', '', 0),
('2018-08-27', 'approved', 'lhexy romero', 'Clostridium difficile toxin B', 1, 78, 'Toxin', 10, 'read', '', 0),
('2018-08-29', 'approved', 'lhexy romero', ' Clostridium difficile Infection', 1, 79, 'Disease', 13, 'read', '', 0),
('2018-08-27', 'rejected', 'lhexy romero', 'Wash hands regularly and thoroughly.: Surfaces that may have come into contact with the bacteria or spores, such as toilets, the floor around toilets, bedpans and beds, should also be cleaned thoroughly with water and a cleaning product containing bleach.', 1, 80, 'Prevention', 9, 'read', '', 0),
('2018-08-29', 'approved', 'Ibrahim Samson', 'Rattus rattus', 6, 81, 'Animal Taxonomy', 15, 'noticed', '', 0),
('2018-08-29', 'approved', 'Ibrahim Samson', 'Leptospira interrogans', 6, 82, 'Bacteria Taxonomy', 12, 'noticed', '', 0),
('2018-08-29', 'approved', 'Ibrahim Samson', 'Rattus rattus', 6, 83, 'Animal', 14, 'noticed', '', 0),
('2018-08-29', 'approved', 'Ibrahim Samson', 'Leptospira interrogans', 6, 84, 'Bacteria', 12, 'noticed', '', 0),
('2018-08-27', 'approved', 'Ibrahim Samson', 'Haemolysins', 6, 85, 'Toxin', 11, 'noticed', '', 0),
('2018-08-29', 'approved', 'Ibrahim Samson', 'Leptospirosis', 6, 86, 'Disease', 14, 'noticed', '', 0),
('2018-08-27', 'approved', 'Ibrahim Samson', 'Avoid contaminated water.: Keep away from infected animals, especially wild rats.:Be aware of your surroundings, especially when you travel. ', 6, 87, 'Prevention', 10, 'noticed', '', 0),
('2018-08-29', 'approved', 'Flor Castillo', 'Canis lupus', 7, 88, 'Animal Taxonomy', 16, 'read', '', 0),
('2018-08-29', 'approved', 'Flor Castillo', 'Capnocytophaga canimorsus', 7, 89, 'Bacteria Taxonomy', 13, 'noticed', '', 0),
('2018-08-29', 'approved', 'Flor Castillo', 'Canis lupus', 7, 90, 'Animal', 15, 'noticed', '', 0),
('2018-08-29', 'approved', 'Flor Castillo', 'Capnocytophaga canimorsus', 7, 91, 'Bacteria', 13, 'noticed', '', 0),
('2018-08-29', 'approved', 'Flor Castillo', 'Shiga Toxin', 7, 92, 'Toxin', 12, 'noticed', '', 0),
('2018-08-29', 'approved', 'Flor Castillo', 'Capnocytophaga canimorsus Infection', 7, 93, 'Disease', 15, 'noticed', '', 0),
('2018-08-27', 'approved', 'Flor Castillo', 'If you have been bitten by a dog or cat, call your doctor right away, even if you don’t feel sick.', 7, 94, 'Prevention', 11, 'noticed', '', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Anas platyrhynchos', 1, 95, 'Animal Taxonomy', 17, 'read', '', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Salmonella bongori', 1, 96, 'Bacteria Taxonomy', 14, 'read', '', 0),
('2018-08-27', 'approved', 'lhexy romero', 'Anas platyrhynchos', 1, 97, 'Animal', 16, 'read', '', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Salmonella bongori', 1, 98, 'Bacteria', 14, 'read', '', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Typhoid Toxin SpvA', 1, 99, 'Toxin', 13, 'read', '', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Typhoid Toxin CdtB ', 1, 100, 'Toxin', 14, 'read', '', 0),
('2018-08-27', 'pending', 'lhexy romero', 'Salmonellosis', 1, 101, 'Disease', 16, 'notify', '', 0),
('2018-08-27', 'pending', 'lhexy romero', 'Cacatua galerita', 1, 102, 'Animal Taxonomy', 18, 'notify', '', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Chlamydia psittaci', 1, 103, 'Bacteria Taxonomy', 15, 'read', '', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Cacatua galerita', 1, 104, 'Animal', 17, 'read', '', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Chlamydia psittaci', 1, 105, 'Bacteria', 15, 'noticed', '', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Chlamydial cytotoxin', 1, 106, 'Toxin', 15, 'noticed', '', 0),
('2018-08-27', 'rejected', 'lhexy romero', 'Psittacosis', 1, 107, 'Disease', 17, 'read', 'Error', 0),
('2018-08-29', 'approved', 'lhexy romero', 'Antibiotics:Oral Therapy', 1, 108, 'Prevention', 12, 'read', '', 0),
('2018-09-24', 'pending', 'Flor Castillo', 'a a', 7, 109, 'Bacteria Taxonomy', 21, 'notify', '', 0),
('2018-09-24', 'pending', 'Flor Castillo', 'Canis lupus', 7, 110, 'Animal', 23, 'notify', '', 0),
('2018-09-24', 'pending', 'Flor Castillo', 'Staphylococcus aureus', 7, 111, 'Bacteria', 22, 'notify', '', 0),
('2018-09-24', 'approved', 'Flor Castillo', 'salmonella', 7, 112, 'Disease', 22, 'noticed', '', 0),
('2018-09-24', 'rejected', 'Flor Castillo', 'hahahahaha', 7, 113, 'Prevention', 17, 'noticed', 'Panget', 0),
('2018-09-26', 'pending', 'Lhexy Romero', 'a a', 1, 114, 'Animal Taxonomy', 23, 'notify', '', 0),
('2018-09-26', 'pending', 'Lhexy Romero', 'bbb a', 1, 115, 'Animal Taxonomy', 24, 'notify', '', 0),
('2018-09-28', 'pending', 'Lhexy Romero', 'b', 1, 116, 'Toxin', 24, 'notify', '', 0),
('2018-09-28', 'pending', 'Lhexy Romero', 'a', 1, 117, 'Disease', 24, 'notify', '', 0),
('2018-09-28', 'pending', 'Lhexy Romero', 'b', 1, 118, 'Disease', 25, 'notify', '', 0),
('2018-09-28', 'pending', 'Lhexy Romero', 'abbbb', 1, 119, 'Disease', 26, 'notify', '', 0),
('2018-10-03 04:17:35', 'pending', 'Lhexy Romero', 'Canis lupus', 1, 120, 'Animal', 26, 'notify', '', 0),
('2018-10-03 04:20:39', 'pending', 'Lhexy Romero', 'Gallus gallus', 1, 121, 'Animal', 27, 'notify', '', 0),
('2018-10-05 10:03:07', 'pending', 'Lhexy Romero', 'kk k', 1, 122, 'Animal Taxonomy', 25, 'notify', '', 0),
('2018-10-06 11:23:32', 'pending', 'Ibrahim Samson', 'ere rer', 6, 123, 'Animal Taxonomy', 26, 'notify', '', 7),
('2018-10-06 11:23:48', 'pending', 'Ibrahim Samson', 're re', 6, 124, 'Bacteria Taxonomy', 23, 'notify', '', 7),
('2018-10-06 11:25:29', 'pending', 'Ibrahim Samson', 're', 6, 125, 'Toxin', 27, 'notify', '', 0),
('2018-10-06 11:34:31', 'pending', 'Ibrahim Samson', 'ere rer', 6, 126, 'Animal', 31, 'notify', '', 7),
('2018-10-06 11:37:42', 'pending', 'Ibrahim Samson', 're re', 6, 127, 'Bacteria', 26, 'notify', '', 7),
('2018-10-06 11:37:57', 'pending', 'Ibrahim Samson', 'erererererer', 6, 128, 'Disease', 29, 'notify', '', 7),
('2018-10-06 11:38:14', 'pending', 'Ibrahim Samson', 'yyytyytyt:yuytytytyty', 6, 129, 'Prevention', 21, 'notify', '', 7),
('2018-10-08 14:53:26', 'pending', 'Lhexy Romero', 'mmmm mmm', 1, 130, 'Animal Taxonomy', 27, 'notify', '', 18),
('2018-10-08 14:53:58', 'pending', 'Lhexy Romero', 'nnnn nn', 1, 131, 'Bacteria Taxonomy', 24, 'notify', '', 18),
('2018-10-08 14:56:28', 'pending', 'Lhexy Romero', 'nnnn nn', 1, 132, 'Bacteria', 33, 'notify', '', 18),
('2018-10-09 22:19:50', 'pending', 'Lhexy Romero', 'lnmm m', 1, 133, 'Bacteria Taxonomy', 27, 'notify', '', 18),
('2018-10-09 22:20:08', 'pending', 'Lhexy Romero', 'lnmm m', 1, 134, 'Bacteria', 36, 'notify', '', 18),
('2018-10-09 23:30:10', 'pending', 'Lhexy Romero', 'jjjj jjjjj', 1, 135, 'Bacteria Taxonomy', 28, 'notify', '', 18),
('2018-10-09 23:30:24', 'pending', 'Lhexy Romero', 'jjjj jjjjj', 1, 136, 'Bacteria', 37, 'notify', '', 18),
('2018-10-10 02:01:48', 'pending', 'Lhexy Romero', 'a', 1, 137, 'Disease', 30, 'notify', '', 18);

CREATE TABLE `site_t` (
  `site` int(11) NOT NULL,
  `cells` varchar(60) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

INSERT INTO `staff_t` (`staffID`, `firstName`, `lastName`, `middleInitial`, `userName`, `email`, `contact`, `address`, `password`, `status`, `type`, `code`, `journalID`) VALUES
(1, 'Lhexy', 'Romero', '', 'contributor', 'lhexyromero@gmail.com', '09452177904', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', '', 18),
(4, 'Leki', 'Lekay', '', 'admin', 'admin@site.com', '09227686712', '', 'd033e22ae348aeb5660fc2140aec35850c4da997', 0, '2', '', 0),
(5, 'LhexyKhrystelle', 'Romero', '', 'lhexyromero', 'lhexyromero', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', 'q4n1pkildqe', 0),
(6, 'Ibrahim', 'Samson', '', 'ibsamson', 'ibsamson', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', 'kcp8wkzo6a', 7),
(7, 'Flor', 'Castillo', '', 'florcastillo', 'florcastillo@gmail.com', '09452177904', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '2', '88ok05jcmi8', 11),
(9, 'Pyke', 'Bio', '', 'pykebio', 'pykebio', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', 'ddyhi58e4e', 10),
(10, 'Bryan', 'Castillo', '', 'bryan', 'bryan', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', 'fo3uzesk6yd', 5),
(12, 'Lhexy', 'Romero', 'B', 'zoodis', 'zoodissystem@gmail.com', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 1, '3', '', 0),
(14, 'No', 'Account', '', '', '', '', '', '', 2, '3', '', 10),
(15, 'Flor', 'Castillo', 'E', 'flor', 'zoodissystem@gmail.com', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 1, '3', '', 0),
(16, 'Ganda', 'Talaga', 'K', 'Ganda', 'zoodissystem@gmail.com', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 2, '3', '', 0),
(20, 'bobo', 'k', '', 'bobo', 'bobo', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 0, '1', 'zziabnat6yf', 10),
(21, '', '', '', '', '', '', '', '', 0, '3', 'hy5fl6bis', 0),
(22, '', '', '', '', '', '', '', '', 0, '3', 'ddqtwrdb9i5', 0),
(23, '', '', '', '', '', '', '', '', 0, '3', 'kzxgspeobw9', 0),
(24, '', '', '', '', '', '', '', '', 0, '3', '0oqoakue6uke', 0),
(25, '', '', '', '', '', '', '', '', 0, '3', 'ue3kyc4p46', 0),
(26, '', '', '', '', '', '', '', '', 0, '3', 'm5veqngw7gl', 0),
(27, '', '', '', '', '', '', '', '', 0, '3', '7x2tqjha4j7', 0),
(28, '', '', '', '', '', '', '', '', 0, '3', 'zm5l4wai4so', 0),
(29, '', '', '', '', '', '', '', '', 0, '3', 'es6dgvr8npv', 0),
(30, '', '', '', '', '', '', '', '', 0, '3', 'g74syconkng', 0),
(31, '', '', '', '', '', '', '', '', 0, '3', 'uzns5xdtses', 0),
(32, '', '', '', '', '', '', '', '', 0, '3', '00ntefcc6xtdh', 0),
(33, '', '', '', '', '', '', '', '', 0, '3', '13v7odw8mojp', 0),
(34, '', '', '', '', '', '', '', '', 0, '3', 'w2jssxl2jgk', 0),
(35, '', '', '', '', '', '', '', '', 0, '3', 'n86oeausrq', 0),
(36, '', '', '', '', '', '', '', '', 0, '3', 'zycvipjm2xg', 0),
(37, '', '', '', '', '', '', '', '', 0, '3', 'cuc1kcg7tv', 0),
(38, 'Flor', 'a', 'e', 'a', 'zoodissystem@gmail.com', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 2, '3', '', 0),
(39, 'a', 'a', 'a', 'a', 'zoodissystem@gmail.com', '', '', '5bae372e69f5293eda5b478a2663f5330fe41631', 2, '3', '', 0),
(40, 'a', 'a', 'a', 'a', 'zoodissystem@gmail.com', '', '', '5bae372e69f5293eda5b478a2663f5330fe41631', 2, '3', '', 0),
(41, 'a', 'a', 'a', 'a', 'zoodissystem@gmail.com', '', '', '5bae372e69f5293eda5b478a2663f5330fe41631', 2, '3', '', 0),
(42, 'a', 'a', 'a', 'a', 'lhexyromero@gmail.com', '', '', '25988ea5c9cca2176e54593a1a793dca9dc262be', 2, '3', '', 0),
(43, '', '', '', '', '', '', '', '', 0, '3', '3izc1lhzgx4', 0);

CREATE TABLE `toxin_t` (
  `toxinID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `structureFeature` text NOT NULL,
  `function` text NOT NULL,
  `status` varchar(25) NOT NULL,
  `staffID` int(11) NOT NULL,
  `dateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `toxin_t` (`toxinID`, `name`, `structureFeature`, `function`, `status`, `staffID`, `dateTime`) VALUES
(9, 'Clostridium difficile toxin A', 'Clostridium difficile toxin A (TcdA) is a toxin generated by Clostridium difficile. It is similar to Clostridium difficile Toxin B. The toxins are the main virulence factors produced by the gram positive, anaerobic, Clostridium difficile bacteria. The toxins function by damaging the intestinal mucosa and cause the symptoms of C. difficile infection, including pseudomembranous colitis.', 'The toxin acts by modifying host cell GTPase proteins by glucosylation, leading to changes in cellular activities. Risk factors for C. difficile infection include antibiotic treatment, which can disrupt normal intestinal microbiota and lead to colonization of C. difficile bacteria.', 'approved', 1, '2018-08-27'),
(10, 'Clostridium difficile toxin B', 'Clostridium difficile toxin B is a toxin produced by the bacteria Clostridium difficile. C. difficile produces two major kinds of toxins that are very potent and lethal; an enterotoxin (Toxin A) and a cytotoxin (Toxin B, this protein).', 'When the catalytic threonine residue of glucosyltransferase deactivates a family of small GTPases,e.g. the Rho family; Rac, and Cdc42 inside the target cells disturb signal transduction mechanisms, which leads to dysfunctioning of actin cytoskeleton, cell-cell junction, and apoptosis. Rho induces the activity of actin stress fibers. Rac proteins controls the activities of membrane ruffling and NADPH-oxidase neutrophil. Cdc42 regulates the F-actin filament formation in filopodia.', 'approved', 1, '2018-08-27'),
(11, 'Haemolysins', 'Hemolysins or Haemolysins are molecules that have the ability to lyse red blood cells (RBCs). There are primarily two types of hemolysins: alpha (?) and beta (?). Alpha hemolysins cause a partial lysis of the RBCs, resulting in a darkening of the media around a colony on sheep\'s blood agar (SBA). Beta hemolysins produce a complete lysis of the RBCs, resulting in a clearing around the colony growing on SBA. The chapter discusses the biochemistry of hemolysins. Hemolysins are produced by many of the common indoor fungi. ', 'Hemolysins or haemolysins are lipids and proteins that cause lysis of red blood cells by destroying their cell membrane.', 'approved', 6, '2018-08-27'),
(12, 'Shiga Toxin', 'Shiga toxin (Stx) is one of the most potent bacterial toxins known. Stx is found in Shigella dysenteriae 1 and in some serogroups of Escherichia coli (called Stx1 in E. coli).', 'Shiga Toxin acts as an N-glycosidase, removing an adenine from the 28S ribosomal rRNA of a target cell which leads to inhibition of protein elongation and ultimately cellular apoptosis. The B subunit is necessary for binding to globo series glycolipid globotriaosylceramide (Gb3), a eukaryotic membrane receptor, where it is then endocytosed and proteolytically cleaved into an active A subunit and a B subunit. The B subunit is not active in the depurination of of 28S rRNA, but is essential for GB3 binding and therefore essential for toxicity. Once in the cytosol the A subunit is free to interact with and inactivate 28S rRNA. On the A subunit Tyr77, Tyr114, Glu167, Arg170, and Trp203 are all essential in glycosidic activity. This mechanism (B subunit binding to globotriaosylceramide and A subunit depurinating 28S rRNA) is conserved amongst the Stx family as well as the ricin toxin.', 'pending', 7, '2018-08-27'),
(13, 'Typhoid Toxin SpvA', 'Signals for the expression of the spv locus are growth restriction, reduced nutrient supply or lowered pH.', 'Promote the survival and rapid growth of Salmonella in the host', 'pending', 1, '2018-08-27'),
(14, 'Typhoid Toxin CdtB ', 'Classic cytolethal distending toxins (CDTs) are three component AB toxins, composed of CdtA, CdtB and CdtC. CdtA and CdtC mediate target cell binding and membrane translocation of CdtB, which then induces DNA damage, most probably through its nuclease activity', 'Involving chromatin disruption, which leads to G2M-phase growth arrest of the target cell and ultimately cell death', 'pending', 1, '2018-08-27'),
(15, 'Chlamydial cytotoxin', 'Original cytotoxic reports involved lymphogranuloma venereum isolates that apparently do not possess the actual putative cytotoxin gene.', 'Chlamydial cytotoxin does share amino acid sequence similarities to the clostridial toxin B protein and there is one report demonstrating that the ectopically expressed chlamydial protein glycosylates the small GTPase, Rac1, in HeLa cells and causes actin reorganization in a manner similar to ectopically expressed authentic clostridial toxin B.', 'approved', 1, '2018-08-27'),
(16, 'Alpha toxin', 'Alpha-toxin, also known as alpha-hemolysin (Hla), is the major cytotoxic agent released by bacterium Staphylococcus aureus and the first identified member of the pore forming beta-barrel toxin family. This toxin consists mostly of beta-sheets (68%) with only about 10% alpha-helices.', 'Alpha toxin may be: Staphylococcus aureus alpha toxin, a membrane-disrupting toxin that creates pores causing hemolysis and tissue damage.', 'approved', 4, '2018-08-29 09:37:01'),
(17, 'Necrotizing toxin (TNT)', 'This is the C-terminal domain of CpnT secreted by Mycobacterium tuberculosis (Mtb). ', 'It induces necrosis of infected cells to evade immune responses. Mtb utilizes the protein CpnT to kill human macrophages by secreting its C-terminal domain (CTD), named tuberculosis necrotizing toxin (TNT), that induces necrosis. It acts as a NAD+ glycohydrolase which hydrolyzes the essential cellular coenzyme NAD+ in the cytosol of infected macrophages resulting in necrotic cell death.', 'approved', 4, '2018-08-29 09:50:41'),
(18, 'cytolethal distending toxin', 'Cytolethal distending toxins (abbreviated CDTs) are a class of heterotrimeric toxins produced by certain gram-negative bacteria that display DNase activity', 'Cytolethal distending toxin trigger G2M cell cycle arrest in specific mammalian cell lines, leading to the enlarged or distended cells for which these toxins are named.Affected cells die by apoptosis.', 'approved', 4, '2018-08-29 10:02:08'),
(19, 'Shiga Toxin', 'Shiga toxin (Stx) is one of the most potent bacterial toxins known. Stx is found in Shigella dysenteriae 1 and in some serogroups of Escherichia coli (called Stx1 in E. coli).', 'Shiga Toxin acts as an N-glycosidase, removing an adenine from the 28S ribosomal rRNA of a target cell which leads to inhibition of protein elongation and ultimately cellular apoptosis. The B subunit is necessary for binding to globo series glycolipid globotriaosylceramide (Gb3), a eukaryotic membrane receptor, where it is then endocytosed and proteolytically cleaved into an active A subunit and a B subunit. The B subunit is not active in the depurination of of 28S rRNA, but is essential for GB3 binding and therefore essential for toxicity. Once in the cytosol the A subunit is free to interact with and inactivate 28S rRNA. On the A subunit Tyr77, Tyr114, Glu167, Arg170, and Trp203 are all essential in glycosidic activity. This mechanism (B subunit binding to globotriaosylceramide and A subunit depurinating 28S rRNA) is conserved amongst the Stx family as well as the ricin toxin.', 'approved', 4, '2018-08-29 10:16:50'),
(20, 'Mycolactone', 'A polyketide-derived macrolide designated mycolactone was isolated that causes cytopathicity and cell cycle arrest in cultured L929 murine fibroblasts.', 'Intradermal inoculation of purified toxin into guinea pigs produced a lesion similar to that of Buruli ulcer in humans. This toxin may represent one of a family of virulence factors associated with pathology in mycobacterial diseases such as leprosy and tuberculosis.', 'approved', 4, '2018-08-29 10:32:11'),
(21, 'bbb', 'a', 'a', 'approved', 4, '2018-09-12 12:06:18'),
(22, 'Leki Toxin', 'mataba to', 'kain', 'approved', 4, '2018-09-24 19:31:32'),
(23, 'a', 'a', 'a', 'approved', 4, '2018-09-28 11:11:43'),
(24, 'b', 'b', 'b', 'pending', 1, '2018-09-28'),
(25, 'erer', 'rerere', 'rerere', 'pending', 6, '2018-10-06 11:24:14'),
(26, 'erer', 'rerere', 'rerere', 'pending', 6, '2018-10-06 11:24:26'),
(27, 're', 'rerer', 'ererer', 'pending', 6, '2018-10-06 11:25:29');

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

INSERT INTO `userjournal_t` (`jTitle`, `jSubject`, `jMessage`, `jDoi`, `jFile`, `staffID`, `jState`, `jDateTime`, `jPublished`, `userjournalID`) VALUES
('RUMINANT', 'k', '', '3333', 'public\\others\\5cb7d805be8b98c.pdf', 12, 1, '2018-10-02 17:37:37', '0000-00-00', 1),
('nnn', 'l', '', '23', 'public\\others\\2b45ddb64233f6e.pdf', 15, 1, '2018-10-02 17:37:37', '0000-00-00', 2),
('a', '', '', '9', 'public\\others\\3eab7e52115b45c.pdf', 15, 1, '2018-10-02 17:37:37', '0000-00-00', 3),
('Lhexy Romero', '', '', '10.1128/CMR.00006-15.', 'js\\public\\others\\5d52966687186fd.pdf', 12, 1, '2018-10-05 13:20:41', '0000-00-00', 4),
('RUMINANT', '', '', '10.1371/journal.pntd.0002270', 'js\\public\\others\\d54ccd115a18532.pdf', 12, 1, '2018-10-05 13:34:51', '2013', 5);

CREATE TABLE `usermessage_t` (
  `usermessageID` int(11) NOT NULL,
  `mName` varchar(100) NOT NULL,
  `mEmail` varchar(100) NOT NULL,
  `mSubject` varchar(100) NOT NULL,
  `mMessage` text NOT NULL,
  `mState` int(11) NOT NULL,
  `mDateTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `usermessage_t` (`usermessageID`, `mName`, `mEmail`, `mSubject`, `mMessage`, `mState`, `mDateTime`) VALUES
(1, '', '', 'Ganda ni Leki', 'a', 2, '2018-10-02 17:38:13'),
(4, 'a', 'a@gmail.com', 'Leki is Pretty', 'a', 1, '2018-10-02 17:38:13'),
(5, 'Lhexy Romero', 'zoodissystem@gmail.com', 'a', 'Hi', 1, '2018-10-02 17:38:13');


ALTER TABLE `animalbacteria_t`
  ADD PRIMARY KEY (`animalbacteriaID`),
  ADD KEY `animalID` (`animalID`),
  ADD KEY `bacteriumID` (`bacteriumID`);

ALTER TABLE `animaltaxo_t`
  ADD PRIMARY KEY (`animalTaxoID`),
  ADD KEY `journalID` (`journalID`),
  ADD KEY `staffID` (`staffID`);

ALTER TABLE `animal_t`
  ADD PRIMARY KEY (`animalID`),
  ADD KEY `animal_t_ibfk_1` (`animalTaxoID`),
  ADD KEY `animal_t_ibfk_2` (`journalID`),
  ADD KEY `staffID` (`staffID`);

ALTER TABLE `bacteriataxo_t`
  ADD PRIMARY KEY (`bacteriumTaxoID`),
  ADD KEY `bacteriataxo_t_ibfk_1` (`journalID`),
  ADD KEY `staffID` (`staffID`);

ALTER TABLE `bacteriatoxin_t`
  ADD PRIMARY KEY (`bacteriaToxinID`),
  ADD KEY `toxinID` (`toxinID`),
  ADD KEY `bacteriumID` (`bacteriumID`);

ALTER TABLE `bacteria_t`
  ADD PRIMARY KEY (`bacteriumID`),
  ADD KEY `bacteriumTaxoID` (`bacteriumTaxoID`),
  ADD KEY `bacteria_t_ibfk_2` (`journalID`),
  ADD KEY `staffID` (`staffID`);

ALTER TABLE `disease_t`
  ADD PRIMARY KEY (`diseaseID`),
  ADD KEY `disease_t_ibfk_1` (`journalID`),
  ADD KEY `staffID` (`staffID`);

ALTER TABLE `journal_t`
  ADD PRIMARY KEY (`journalID`);

ALTER TABLE `prevention_t`
  ADD PRIMARY KEY (`preventionID`),
  ADD KEY `diseaseID` (`diseaseID`),
  ADD KEY `staffID` (`staffID`);

ALTER TABLE `request_t`
  ADD PRIMARY KEY (`requestID`),
  ADD KEY `staffID` (`staffID`);

ALTER TABLE `site_t`
  ADD PRIMARY KEY (`site`);

ALTER TABLE `staff_t`
  ADD PRIMARY KEY (`staffID`);

ALTER TABLE `toxin_t`
  ADD PRIMARY KEY (`toxinID`),
  ADD KEY `staffID` (`staffID`);

ALTER TABLE `userjournal_t`
  ADD PRIMARY KEY (`userjournalID`),
  ADD KEY `staffID` (`staffID`);

ALTER TABLE `usermessage_t`
  ADD PRIMARY KEY (`usermessageID`);


ALTER TABLE `animalbacteria_t`
  MODIFY `animalbacteriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

ALTER TABLE `animaltaxo_t`
  MODIFY `animalTaxoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

ALTER TABLE `animal_t`
  MODIFY `animalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

ALTER TABLE `bacteriataxo_t`
  MODIFY `bacteriumTaxoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

ALTER TABLE `bacteriatoxin_t`
  MODIFY `bacteriaToxinID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

ALTER TABLE `bacteria_t`
  MODIFY `bacteriumID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

ALTER TABLE `disease_t`
  MODIFY `diseaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

ALTER TABLE `journal_t`
  MODIFY `journalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

ALTER TABLE `prevention_t`
  MODIFY `preventionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

ALTER TABLE `request_t`
  MODIFY `requestID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

ALTER TABLE `site_t`
  MODIFY `site` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

ALTER TABLE `staff_t`
  MODIFY `staffID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

ALTER TABLE `toxin_t`
  MODIFY `toxinID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

ALTER TABLE `userjournal_t`
  MODIFY `userjournalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `usermessage_t`
  MODIFY `usermessageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;


ALTER TABLE `animalbacteria_t`
  ADD CONSTRAINT `animalbacteria_t_ibfk_1` FOREIGN KEY (`animalID`) REFERENCES `animal_t` (`animalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `animalbacteria_t_ibfk_2` FOREIGN KEY (`bacteriumID`) REFERENCES `bacteria_t` (`bacteriumID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `animaltaxo_t`
  ADD CONSTRAINT `animaltaxo_t_ibfk_1` FOREIGN KEY (`journalID`) REFERENCES `journal_t` (`journalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `animaltaxo_t_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `animal_t`
  ADD CONSTRAINT `animal_t_ibfk_1` FOREIGN KEY (`animalTaxoID`) REFERENCES `animaltaxo_t` (`animalTaxoID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `animal_t_ibfk_2` FOREIGN KEY (`journalID`) REFERENCES `journal_t` (`journalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `animal_t_ibfk_3` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `bacteriataxo_t`
  ADD CONSTRAINT `bacteriataxo_t_ibfk_1` FOREIGN KEY (`journalID`) REFERENCES `journal_t` (`journalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `bacteriataxo_t_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `bacteriatoxin_t`
  ADD CONSTRAINT `bacteriatoxin_t_ibfk_1` FOREIGN KEY (`toxinID`) REFERENCES `toxin_t` (`toxinID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `bacteriatoxin_t_ibfk_2` FOREIGN KEY (`bacteriumID`) REFERENCES `bacteria_t` (`bacteriumID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `bacteria_t`
  ADD CONSTRAINT `bacteria_t_ibfk_1` FOREIGN KEY (`bacteriumTaxoID`) REFERENCES `bacteriataxo_t` (`bacteriumTaxoID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `bacteria_t_ibfk_2` FOREIGN KEY (`journalID`) REFERENCES `journal_t` (`journalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `bacteria_t_ibfk_3` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `disease_t`
  ADD CONSTRAINT `disease_t_ibfk_1` FOREIGN KEY (`journalID`) REFERENCES `journal_t` (`journalID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `disease_t_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `prevention_t`
  ADD CONSTRAINT `prevention_t_ibfk_1` FOREIGN KEY (`diseaseID`) REFERENCES `disease_t` (`diseaseID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `prevention_t_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `request_t`
  ADD CONSTRAINT `request_t_ibfk_1` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `toxin_t`
  ADD CONSTRAINT `toxin_t_ibfk_2` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `userjournal_t`
  ADD CONSTRAINT `userjournal_t_ibfk_1` FOREIGN KEY (`staffID`) REFERENCES `staff_t` (`staffID`) ON DELETE NO ACTION ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;