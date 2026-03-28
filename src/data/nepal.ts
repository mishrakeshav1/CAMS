export interface Province {
  id: string;
  name: string;
  nameNepali: string;
}

export interface District {
  id: string;
  name: string;
  provinceId: string;
}

export interface Municipality {
  id: string;
  name: string;
  districtId: string;
  type: 'metropolitan' | 'sub-metropolitan' | 'municipality' | 'rural-municipality';
}

export const provinces: Province[] = [
  { id: '1', name: 'Koshi Province', nameNepali: 'कोशी प्रदेश' },
  { id: '2', name: 'Madhesh Province', nameNepali: 'मधेश प्रदेश' },
  { id: '3', name: 'Bagmati Province', nameNepali: 'बागमती प्रदेश' },
  { id: '4', name: 'Gandaki Province', nameNepali: 'गण्डकी प्रदेश' },
  { id: '5', name: 'Lumbini Province', nameNepali: 'लुम्बिनी प्रदेश' },
  { id: '6', name: 'Karnali Province', nameNepali: 'कर्णाली प्रदेश' },
  { id: '7', name: 'Sudurpashchim Province', nameNepali: 'सुदूरपश्चिम प्रदेश' },
];

export const districts: District[] = [
  // Koshi Province
  { id: 'bhojpur', name: 'Bhojpur', provinceId: '1' },
  { id: 'dhankuta', name: 'Dhankuta', provinceId: '1' },
  { id: 'ilam', name: 'Ilam', provinceId: '1' },
  { id: 'jhapa', name: 'Jhapa', provinceId: '1' },
  { id: 'khotang', name: 'Khotang', provinceId: '1' },
  { id: 'morang', name: 'Morang', provinceId: '1' },
  { id: 'okhaldhunga', name: 'Okhaldhunga', provinceId: '1' },
  { id: 'panchthar', name: 'Panchthar', provinceId: '1' },
  { id: 'sankhuwasabha', name: 'Sankhuwasabha', provinceId: '1' },
  { id: 'solukhumbu', name: 'Solukhumbu', provinceId: '1' },
  { id: 'sunsari', name: 'Sunsari', provinceId: '1' },
  { id: 'taplejung', name: 'Taplejung', provinceId: '1' },
  { id: 'terhathum', name: 'Terhathum', provinceId: '1' },
  { id: 'udayapur', name: 'Udayapur', provinceId: '1' },

  // Madhesh Province
  { id: 'bara', name: 'Bara', provinceId: '2' },
  { id: 'dhanusha', name: 'Dhanusha', provinceId: '2' },
  { id: 'mahottari', name: 'Mahottari', provinceId: '2' },
  { id: 'parsa', name: 'Parsa', provinceId: '2' },
  { id: 'rautahat', name: 'Rautahat', provinceId: '2' },
  { id: 'saptari', name: 'Saptari', provinceId: '2' },
  { id: 'sarlahi', name: 'Sarlahi', provinceId: '2' },
  { id: 'siraha', name: 'Siraha', provinceId: '2' },

  // Bagmati Province
  { id: 'bhaktapur', name: 'Bhaktapur', provinceId: '3' },
  { id: 'chitwan', name: 'Chitwan', provinceId: '3' },
  { id: 'dhading', name: 'Dhading', provinceId: '3' },
  { id: 'dolakha', name: 'Dolakha', provinceId: '3' },
  { id: 'kathmandu', name: 'Kathmandu', provinceId: '3' },
  { id: 'kavrepalanchok', name: 'Kavrepalanchok', provinceId: '3' },
  { id: 'lalitpur', name: 'Lalitpur', provinceId: '3' },
  { id: 'makwanpur', name: 'Makwanpur', provinceId: '3' },
  { id: 'nuwakot', name: 'Nuwakot', provinceId: '3' },
  { id: 'ramechhap', name: 'Ramechhap', provinceId: '3' },
  { id: 'rasuwa', name: 'Rasuwa', provinceId: '3' },
  { id: 'sindhuli', name: 'Sindhuli', provinceId: '3' },
  { id: 'sindhupalchok', name: 'Sindhupalchok', provinceId: '3' },

  // Gandaki Province
  { id: 'baglung', name: 'Baglung', provinceId: '4' },
  { id: 'gorkha', name: 'Gorkha', provinceId: '4' },
  { id: 'kaski', name: 'Kaski', provinceId: '4' },
  { id: 'lamjung', name: 'Lamjung', provinceId: '4' },
  { id: 'manang', name: 'Manang', provinceId: '4' },
  { id: 'mustang', name: 'Mustang', provinceId: '4' },
  { id: 'myagdi', name: 'Myagdi', provinceId: '4' },
  { id: 'nawalparasi_east', name: 'Nawalparasi (East)', provinceId: '4' },
  { id: 'parbat', name: 'Parbat', provinceId: '4' },
  { id: 'syangja', name: 'Syangja', provinceId: '4' },
  { id: 'tanahun', name: 'Tanahun', provinceId: '4' },

  // Lumbini Province
  { id: 'arghakhanchi', name: 'Arghakhanchi', provinceId: '5' },
  { id: 'banke', name: 'Banke', provinceId: '5' },
  { id: 'bardiya', name: 'Bardiya', provinceId: '5' },
  { id: 'dang', name: 'Dang', provinceId: '5' },
  { id: 'gulmi', name: 'Gulmi', provinceId: '5' },
  { id: 'kapilvastu', name: 'Kapilvastu', provinceId: '5' },
  { id: 'nawalparasi_west', name: 'Nawalparasi (West)', provinceId: '5' },
  { id: 'palpa', name: 'Palpa', provinceId: '5' },
  { id: 'pyuthan', name: 'Pyuthan', provinceId: '5' },
  { id: 'rolpa', name: 'Rolpa', provinceId: '5' },
  { id: 'rupandehi', name: 'Rupandehi', provinceId: '5' },
  { id: 'eastern_rukum', name: 'Eastern Rukum', provinceId: '5' },

  // Karnali Province
  { id: 'dailekh', name: 'Dailekh', provinceId: '6' },
  { id: 'dolpa', name: 'Dolpa', provinceId: '6' },
  { id: 'humla', name: 'Humla', provinceId: '6' },
  { id: 'jajarkot', name: 'Jajarkot', provinceId: '6' },
  { id: 'jumla', name: 'Jumla', provinceId: '6' },
  { id: 'kalikot', name: 'Kalikot', provinceId: '6' },
  { id: 'mugu', name: 'Mugu', provinceId: '6' },
  { id: 'salyan', name: 'Salyan', provinceId: '6' },
  { id: 'surkhet', name: 'Surkhet', provinceId: '6' },
  { id: 'western_rukum', name: 'Western Rukum', provinceId: '6' },

  // Sudurpashchim Province
  { id: 'achham', name: 'Achham', provinceId: '7' },
  { id: 'baitadi', name: 'Baitadi', provinceId: '7' },
  { id: 'bajhang', name: 'Bajhang', provinceId: '7' },
  { id: 'bajura', name: 'Bajura', provinceId: '7' },
  { id: 'dadeldhura', name: 'Dadeldhura', provinceId: '7' },
  { id: 'darchula', name: 'Darchula', provinceId: '7' },
  { id: 'doti', name: 'Doti', provinceId: '7' },
  { id: 'kailali', name: 'Kailali', provinceId: '7' },
  { id: 'kanchanpur', name: 'Kanchanpur', provinceId: '7' },
];

export const municipalities: Municipality[] = [
  // Kathmandu
  { id: 'ktm-metro', name: 'Kathmandu Metropolitan City', districtId: 'kathmandu', type: 'metropolitan' },
  { id: 'kirtipur', name: 'Kirtipur Municipality', districtId: 'kathmandu', type: 'municipality' },
  { id: 'budhanilkantha', name: 'Budhanilkantha Municipality', districtId: 'kathmandu', type: 'municipality' },
  { id: 'tokha', name: 'Tokha Municipality', districtId: 'kathmandu', type: 'municipality' },
  { id: 'chandragiri', name: 'Chandragiri Municipality', districtId: 'kathmandu', type: 'municipality' },
  { id: 'tarakeshwar', name: 'Tarakeshwar Municipality', districtId: 'kathmandu', type: 'municipality' },
  { id: 'nagarjun', name: 'Nagarjun Municipality', districtId: 'kathmandu', type: 'municipality' },
  { id: 'kageshwari', name: 'Kageshwari Manohara Municipality', districtId: 'kathmandu', type: 'municipality' },
  { id: 'gokarneshwar', name: 'Gokarneshwar Municipality', districtId: 'kathmandu', type: 'municipality' },
  { id: 'shankarapur', name: 'Shankarapur Municipality', districtId: 'kathmandu', type: 'municipality' },
  { id: 'dakshinkali', name: 'Dakshinkali Municipality', districtId: 'kathmandu', type: 'municipality' },

  // Lalitpur
  { id: 'lalitpur-metro', name: 'Lalitpur Metropolitan City', districtId: 'lalitpur', type: 'metropolitan' },
  { id: 'godawari', name: 'Godawari Municipality', districtId: 'lalitpur', type: 'municipality' },
  { id: 'mahalaxmi-lal', name: 'Mahalaxmi Municipality', districtId: 'lalitpur', type: 'municipality' },

  // Bhaktapur
  { id: 'bhaktapur-muni', name: 'Bhaktapur Municipality', districtId: 'bhaktapur', type: 'municipality' },
  { id: 'madhyapur-thimi', name: 'Madhyapur Thimi Municipality', districtId: 'bhaktapur', type: 'municipality' },
  { id: 'suryabinayak', name: 'Suryabinayak Municipality', districtId: 'bhaktapur', type: 'municipality' },
  { id: 'changunarayan', name: 'Changunarayan Municipality', districtId: 'bhaktapur', type: 'municipality' },

  // Kaski
  { id: 'pokhara-metro', name: 'Pokhara Metropolitan City', districtId: 'kaski', type: 'metropolitan' },
  { id: 'annapurna-rm', name: 'Annapurna Rural Municipality', districtId: 'kaski', type: 'rural-municipality' },
  { id: 'machhapuchchhre-rm', name: 'Machhapuchchhre Rural Municipality', districtId: 'kaski', type: 'rural-municipality' },
  { id: 'madi-rm-kaski', name: 'Madi Rural Municipality', districtId: 'kaski', type: 'rural-municipality' },

  // Morang
  { id: 'biratnagar-metro', name: 'Biratnagar Metropolitan City', districtId: 'morang', type: 'metropolitan' },
  { id: 'sunbarshi', name: 'Sunbarshi Municipality', districtId: 'morang', type: 'municipality' },
  { id: 'belbari', name: 'Belbari Municipality', districtId: 'morang', type: 'municipality' },
  { id: 'urlabari', name: 'Urlabari Municipality', districtId: 'morang', type: 'municipality' },
  { id: 'pathari-shanischare', name: 'Pathari Shanischare Municipality', districtId: 'morang', type: 'municipality' },

  // Jhapa
  { id: 'bhadrapur', name: 'Bhadrapur Municipality', districtId: 'jhapa', type: 'municipality' },
  { id: 'birtamod', name: 'Birtamod Municipality', districtId: 'jhapa', type: 'municipality' },
  { id: 'mechinagar', name: 'Mechinagar Municipality', districtId: 'jhapa', type: 'municipality' },
  { id: 'damak', name: 'Damak Municipality', districtId: 'jhapa', type: 'municipality' },
  { id: 'kankai', name: 'Kankai Municipality', districtId: 'jhapa', type: 'municipality' },

  // Sunsari
  { id: 'itahari-submetro', name: 'Itahari Sub-Metropolitan City', districtId: 'sunsari', type: 'sub-metropolitan' },
  { id: 'dharan-submetro', name: 'Dharan Sub-Metropolitan City', districtId: 'sunsari', type: 'sub-metropolitan' },
  { id: 'inaruwa', name: 'Inaruwa Municipality', districtId: 'sunsari', type: 'municipality' },

  // Chitwan
  { id: 'bharatpur-metro', name: 'Bharatpur Metropolitan City', districtId: 'chitwan', type: 'metropolitan' },
  { id: 'ratnanagar', name: 'Ratnanagar Municipality', districtId: 'chitwan', type: 'municipality' },
  { id: 'khairahani', name: 'Khairahani Municipality', districtId: 'chitwan', type: 'municipality' },

  // Rupandehi
  { id: 'butwal-submetro', name: 'Butwal Sub-Metropolitan City', districtId: 'rupandehi', type: 'sub-metropolitan' },
  { id: 'siddharthanagar', name: 'Siddharthanagar Municipality', districtId: 'rupandehi', type: 'municipality' },
  { id: 'tilottama', name: 'Tilottama Municipality', districtId: 'rupandehi', type: 'municipality' },
  { id: 'devdaha', name: 'Devdaha Municipality', districtId: 'rupandehi', type: 'municipality' },
  { id: 'lumbini-sanskritik', name: 'Lumbini Sanskritik Municipality', districtId: 'rupandehi', type: 'municipality' },

  // Banke
  { id: 'nepalgunj-submetro', name: 'Nepalgunj Sub-Metropolitan City', districtId: 'banke', type: 'sub-metropolitan' },
  { id: 'kohalpur', name: 'Kohalpur Municipality', districtId: 'banke', type: 'municipality' },

  // Dhanusha
  { id: 'janakpur-submetro', name: 'Janakpur Sub-Metropolitan City', districtId: 'dhanusha', type: 'sub-metropolitan' },

  // Parsa
  { id: 'birgunj-metro', name: 'Birgunj Metropolitan City', districtId: 'parsa', type: 'metropolitan' },

  // Kailali
  { id: 'dhangadhi-submetro', name: 'Dhangadhi Sub-Metropolitan City', districtId: 'kailali', type: 'sub-metropolitan' },
  { id: 'tikapur', name: 'Tikapur Municipality', districtId: 'kailali', type: 'municipality' },
  { id: 'lamkichuha', name: 'Lamkichuha Municipality', districtId: 'kailali', type: 'municipality' },

  // Surkhet
  { id: 'birendranagar', name: 'Birendranagar Municipality', districtId: 'surkhet', type: 'municipality' },

  // Kanchanpur
  { id: 'mahendranagar', name: 'Bhimdatta Municipality', districtId: 'kanchanpur', type: 'municipality' },

  // Makwanpur
  { id: 'hetauda-submetro', name: 'Hetauda Sub-Metropolitan City', districtId: 'makwanpur', type: 'sub-metropolitan' },

  // Kavrepalanchok
  { id: 'dhulikhel', name: 'Dhulikhel Municipality', districtId: 'kavrepalanchok', type: 'municipality' },
  { id: 'banepa', name: 'Banepa Municipality', districtId: 'kavrepalanchok', type: 'municipality' },
  { id: 'panauti', name: 'Panauti Municipality', districtId: 'kavrepalanchok', type: 'municipality' },

  // Dang
  { id: 'ghorahi-submetro', name: 'Ghorahi Sub-Metropolitan City', districtId: 'dang', type: 'sub-metropolitan' },
  { id: 'tulsipur-submetro', name: 'Tulsipur Sub-Metropolitan City', districtId: 'dang', type: 'sub-metropolitan' },

  // Ilam
  { id: 'ilam-muni', name: 'Ilam Municipality', districtId: 'ilam', type: 'municipality' },

  // Tanahun
  { id: 'damauli', name: 'Byas Municipality', districtId: 'tanahun', type: 'municipality' },

  // Nuwakot
  { id: 'bidur', name: 'Bidur Municipality', districtId: 'nuwakot', type: 'municipality' },

  // Dhading
  { id: 'nilkantha', name: 'Nilkantha Municipality', districtId: 'dhading', type: 'municipality' },

  // Bara
  { id: 'kalaiya-submetro', name: 'Kalaiya Sub-Metropolitan City', districtId: 'bara', type: 'sub-metropolitan' },
  { id: 'jeetpur-simara-submetro', name: 'Jeetpur Simara Sub-Metropolitan City', districtId: 'bara', type: 'sub-metropolitan' },

  // Sarlahi
  { id: 'malangawa', name: 'Malangawa Municipality', districtId: 'sarlahi', type: 'municipality' },

  // Saptari
  { id: 'rajbiraj', name: 'Rajbiraj Municipality', districtId: 'saptari', type: 'municipality' },
];

export function getDistrictsByProvince(provinceId: string): District[] {
  return districts.filter(d => d.provinceId === provinceId);
}

export function getMunicipalitiesByDistrict(districtId: string): Municipality[] {
  return municipalities.filter(m => m.districtId === districtId);
}
