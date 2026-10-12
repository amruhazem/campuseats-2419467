const vendors = [
 {
 id: 'nasi-kukus',
 name: 'nasi kukus',
 location: 'Jalan Rabung, Bukit Jelutong, Shah Alam, Selangor',
 openHours: '10:00 am - 10:00 pm',
 isOpen: true,
 menu: [
 { id: 'nk-1', name: 'Nasi Kukus Ayam', description: 'steamed rice, spiced fried chicken, curry gravy, and sambal belacan', price: 6.5, category: 'Rice',
available: true },
 { id: 'nk-2', name: 'Nasi Kukus Daging Kerutuk', description: 'steamed rice served with rich beef kerutuk gravy and sambal belacan ', price: 7.5, category:
'Rice', available: false },
 { id: 'nk-3', name: 'Teh o Ais', description: 'ice tea', price: 1.5, category:
'Drinks', available: true },
 ],
 },
 {
 id: 'kafe-aminah',
 name: 'Kafe Mahallah Aminah',
 location: 'Mahallah Aminah, Ground Floor',
 openHours: '8:00 am - 9:00 pm',
 isOpen: true,
 menu: [
 { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
 { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price: 3, category: 'Drinks', available: true },
 ],
 },
]
export default vendors
