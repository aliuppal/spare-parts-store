/* TeckAuto fallback catalog — used only if Supabase is unreachable. Prices in PKR.
   `fits` holds vehicle ids, optionally with model years ("honda-civic-15t@2016-2022"), or "universal". */

window.VEHICLES = [
  {"id":"suzuki-mehran","make":"Suzuki","model":"Mehran","engine":"0.8L F8B (VX / VXR)","years":[2012,2019]},
  {"id":"suzuki-alto","make":"Suzuki","model":"Alto","engine":"0.66L R06A (VX / VXR / VXL)","years":[2019,2026]},
  {"id":"suzuki-cultus","make":"Suzuki","model":"Cultus","engine":"1.0L K10B (VXR / VXL)","years":[2017,2026]},
  {"id":"suzuki-wagonr","make":"Suzuki","model":"Wagon R","engine":"1.0L K10B (VXR / VXL)","years":[2014,2026]},
  {"id":"suzuki-swift","make":"Suzuki","model":"Swift","engine":"1.2L K12M (GL / GLX)","years":[2022,2026]},
  {"id":"toyota-corolla-16","make":"Toyota","model":"Corolla","engine":"1.6L 1ZR-FE (GLi / Altis)","years":[2015,2026]},
  {"id":"toyota-corolla-18","make":"Toyota","model":"Corolla","engine":"1.8L 2ZR-FE (Altis Grande)","years":[2015,2026]},
  {"id":"toyota-yaris-13","make":"Toyota","model":"Yaris","engine":"1.3L 2NR-FE (GLi / ATIV)","years":[2020,2026]},
  {"id":"toyota-fortuner-27","make":"Toyota","model":"Fortuner","engine":"2.7L 2TR-FE petrol","years":[2016,2026]},
  {"id":"toyota-fortuner-28","make":"Toyota","model":"Fortuner","engine":"2.8L 1GD-FTV diesel","years":[2016,2026]},
  {"id":"toyota-hilux-28","make":"Toyota","model":"Hilux Revo","engine":"2.8L 1GD-FTV diesel","years":[2016,2026]},
  {"id":"honda-city-12","make":"Honda","model":"City","engine":"1.2L L12B i-VTEC","years":[2021,2026]},
  {"id":"honda-city-15","make":"Honda","model":"City","engine":"1.5L L15Z (Aspire)","years":[2021,2026]},
  {"id":"honda-civic-18","make":"Honda","model":"Civic","engine":"1.8L R18Z i-VTEC","years":[2016,2021]},
  {"id":"honda-civic-15t","make":"Honda","model":"Civic","engine":"1.5L L15B7 VTEC Turbo","years":[2016,2026]},
  {"id":"honda-brv","make":"Honda","model":"BR-V","engine":"1.5L L15Z i-VTEC","years":[2017,2026]},
  {"id":"kia-picanto","make":"KIA","model":"Picanto","engine":"1.0L Kappa","years":[2019,2026]},
  {"id":"kia-sportage","make":"KIA","model":"Sportage","engine":"2.0L Nu MPi","years":[2019,2026]},
  {"id":"hyundai-tucson","make":"Hyundai","model":"Tucson","engine":"2.0L Nu MPi","years":[2020,2026]},
  {"id":"changan-alsvin","make":"Changan","model":"Alsvin","engine":"1.5L JL473Q (Lumiere)","years":[2021,2026]},
  {"id":"mg-hs","make":"MG","model":"HS","engine":"1.5L Turbo 15E4E","years":[2021,2026]}
];

window.CATEGORIES = [
  {"id":"brakes","name":"Brakes"},
  {"id":"filters","name":"Filters"},
  {"id":"oils","name":"Oils & Coolants"},
  {"id":"engine","name":"Engine & Ignition"},
  {"id":"cooling","name":"Cooling"},
  {"id":"electrical","name":"Electrical"}
];

window.PRODUCTS = [
  {
    id: "pw-8991502", sku: "TK-8991502", oem: null, brand: "MK Japan", grade: "performance", title: "Toyota Corolla 2014-2023 Front Disc Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 5499, unit: "Front axle set", stock: 99, fits: ["toyota-corolla-16@2015-2023","toyota-corolla-18@2015-2023"], checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2023); Toyota Corolla 1.8L 2ZR-FE (2015–2023)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2023); Toyota Corolla 1.8L 2ZR-FE (2015–2023). Confirm against your old part number before fitting."
  },
  {
    id: "pw-2981294", sku: "TK-2981294", oem: null, brand: "Toyota Genuine", grade: "oem", title: "Toyota Corolla Genuine Front Brake Pads 2014-2024", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 20500, unit: "Front axle set", stock: 99, fits: ["toyota-corolla-16@2015-2024","toyota-corolla-18@2015-2024"], checked: "2026-10-04",
    specs: [["Brand","Toyota Genuine"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2024); Toyota Corolla 1.8L 2ZR-FE (2015–2024)"],["Pack","Front axle set"]],
    desc: "Genuine / OEM brake pad from Toyota Genuine, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2024); Toyota Corolla 1.8L 2ZR-FE (2015–2024). Confirm against your old part number before fitting."
  },
  {
    id: "pw-2760502", sku: "A-73 AD", oem: null, brand: "Asuki", grade: "performance", title: "Asuki Advanced Front Brake Pad A-73 AD — Corolla 2009-2019", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 5999, was: 6499, unit: "Front axle set", stock: 99, fits: ["toyota-corolla-16@2015-2019","toyota-corolla-18@2015-2019"], checked: "2026-10-04",
    specs: [["Brand","Asuki"],["Part no.","A-73 AD"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2019); Toyota Corolla 1.8L 2ZR-FE (2015–2019)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from Asuki, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2019); Toyota Corolla 1.8L 2ZR-FE (2015–2019). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13195070", sku: "TK-13195070", oem: null, brand: "iBrake Indonesia", grade: "performance", title: "Toyota Corolla Grande 2014-2018 Rear Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "rear", price: 6480, was: 7200, unit: "Rear axle set", stock: 99, fits: ["toyota-corolla-18@2015-2018"], checked: "2026-10-04",
    specs: [["Brand","iBrake Indonesia"],["Listed fitment","Toyota Corolla 1.8L 2ZR-FE (2015–2018)"],["Pack","Rear axle set"]],
    desc: "Aftermarket brake pad from iBrake Indonesia, listed for Toyota Corolla 1.8L 2ZR-FE (2015–2018). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10039025", sku: "45022-TEA-T00", oem: "45022-TEA-T00", brand: "Honda Genuine", grade: "oem", title: "Honda Civic 2016-22 Front Brake Pads Genuine", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 20010, was: 23000, unit: "Front axle set", stock: 99, fits: ["honda-civic-18@2016-2021","honda-civic-15t@2016-2022"], checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Part no.","45022-TEA-T00"],["Listed fitment","Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022)"],["Pack","Front axle set"]],
    desc: "Genuine / OEM brake pad from Honda Genuine, listed for Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022). Confirm against your old part number before fitting."
  },
  {
    id: "pw-12696024", sku: "TK-12696024", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Civic 2022-24 Front Brake Pads Genuine", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 22566, unit: "Front axle set", stock: 99, fits: ["honda-civic-15t@2022-2024"], checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda Civic 1.5L L15B7 VTEC Turbo (2022–2024)"],["Pack","Front axle set"]],
    desc: "Genuine / OEM brake pad from Honda Genuine, listed for Honda Civic 1.5L L15B7 VTEC Turbo (2022–2024). Confirm against your old part number before fitting."
  },
  {
    id: "pw-11249745", sku: "TK-11249745", oem: null, brand: "MK Japan", grade: "performance", title: "Honda Civic 2016-2022 Front Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 7399, was: 8500, unit: "Front axle set", stock: 99, fits: ["honda-civic-18@2016-2021","honda-civic-15t@2016-2022"], checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13036495", sku: "TK-13036495", oem: null, brand: "AutomanPK", grade: "performance", title: "Honda Civic 2016-2021 (Civic X) Rear Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "rear", price: 6999, was: 7500, unit: "Rear axle set", stock: 99, fits: ["honda-civic-18@2016-2021","honda-civic-15t@2016-2021"], checked: "2026-10-04",
    specs: [["Brand","AutomanPK"],["Listed fitment","Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2021)"],["Pack","Rear axle set"]],
    desc: "Aftermarket brake pad from AutomanPK, listed for Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2021). Confirm against your old part number before fitting."
  },
  {
    id: "pw-11249842", sku: "TK-11249842", oem: null, brand: "MK Japan", grade: "performance", title: "Honda City 2021-2025 Front Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 7499, was: 8500, unit: "Front axle set", stock: 99, fits: ["honda-city-12@2021-2025","honda-city-15@2021-2025"], checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Honda City 1.2L L12B i-VTEC (2021–2025); Honda City 1.5L L15Z (2021–2025)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Honda City 1.2L L12B i-VTEC (2021–2025); Honda City 1.5L L15Z (2021–2025). Confirm against your old part number before fitting."
  },
  {
    id: "pw-12998763", sku: "TK-12998763", oem: null, brand: "Akebono", grade: "performance", title: "Akebono Front Brake Pads — Honda City 2022-2025", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 11899, was: 13998, unit: "Front axle set", stock: 99, fits: ["honda-city-12@2022-2025","honda-city-15@2022-2025"], checked: "2026-10-04",
    specs: [["Brand","Akebono"],["Listed fitment","Honda City 1.2L L12B i-VTEC (2022–2025); Honda City 1.5L L15Z (2022–2025)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from Akebono, listed for Honda City 1.2L L12B i-VTEC (2022–2025); Honda City 1.5L L15Z (2022–2025). Confirm against your old part number before fitting."
  },
  {
    id: "pw-2082036", sku: "A-208 AD", oem: null, brand: "Asuki", grade: "performance", title: "Asuki Advanced Front Brake Pad A-208 AD — Cultus 2017-2024", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 5999, was: 6734, unit: "Front axle set", stock: 99, fits: ["suzuki-cultus@2017-2024"], checked: "2026-10-04",
    specs: [["Brand","Asuki"],["Part no.","A-208 AD"],["Listed fitment","Suzuki Cultus 1.0L K10B (2017–2024)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from Asuki, listed for Suzuki Cultus 1.0L K10B (2017–2024). Confirm against your old part number before fitting."
  },
  {
    id: "pw-8991371", sku: "TK-8991371", oem: null, brand: "MK Japan", grade: "performance", title: "Suzuki Cultus 2017-2023 Front Disc Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 4000, unit: "Front axle set", stock: 99, fits: ["suzuki-cultus@2017-2023"], checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Suzuki Cultus 1.0L K10B (2017–2023)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Suzuki Cultus 1.0L K10B (2017–2023). Confirm against your old part number before fitting."
  },
  {
    id: "pw-9348485", sku: "TK-9348485", oem: null, brand: "MK Japan", grade: "performance", title: "Suzuki Mehran Front Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 3000, unit: "Front axle set", stock: 99, fits: ["suzuki-mehran"], checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Suzuki Mehran 0.8L F8B (2012–2019)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Suzuki Mehran 0.8L F8B (2012–2019). Confirm against your old part number before fitting."
  },
  {
    id: "pw-4853401", sku: "P-183", oem: null, brand: "Guard", grade: "performance", title: "Guard Front Brake Pad P-183 — Mehran 1988-2019", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 1638, unit: "Front axle set", stock: 99, fits: ["suzuki-mehran"], checked: "2026-10-04",
    specs: [["Brand","Guard"],["Part no.","P-183"],["Listed fitment","Suzuki Mehran 0.8L F8B (2012–2019)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from Guard, listed for Suzuki Mehran 0.8L F8B (2012–2019). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13213314", sku: "TK-13213314", oem: null, brand: "iBrake Indonesia", grade: "performance", title: "Suzuki Mehran 2012-2019 Rear Brake Shoe", category: "brakes", sub: "Brake shoes", art: "shoe", position: "rear", price: 7400, unit: "Rear axle set", stock: 99, fits: ["suzuki-mehran@2012-2019"], checked: "2026-10-04",
    specs: [["Brand","iBrake Indonesia"],["Listed fitment","Suzuki Mehran 0.8L F8B (2012–2019)"],["Pack","Rear axle set"]],
    desc: "Aftermarket brake shoe from iBrake Indonesia, listed for Suzuki Mehran 0.8L F8B (2012–2019). Confirm against your old part number before fitting."
  },
  {
    id: "pw-11250445", sku: "TK-11250445", oem: null, brand: "MK Japan", grade: "performance", title: "Toyota Yaris 1.3 2020-2024 Front Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 8900, unit: "Front axle set", stock: 99, fits: ["toyota-yaris-13@2020-2024"], checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Toyota Yaris 1.3L 2NR-FE (2020–2024)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Toyota Yaris 1.3L 2NR-FE (2020–2024). Confirm against your old part number before fitting."
  },
  {
    id: "pw-8294150", sku: "2010", oem: null, brand: "Asuki", grade: "performance", title: "Asuki Rear Brake Shoe 2010 — Yaris 2020-2023", category: "brakes", sub: "Brake shoes", art: "shoe", position: "rear", price: 3950, unit: "Rear axle set", stock: 99, fits: ["toyota-yaris-13@2020-2023"], checked: "2026-10-04",
    specs: [["Brand","Asuki"],["Part no.","2010"],["Listed fitment","Toyota Yaris 1.3L 2NR-FE (2020–2023)"],["Pack","Rear axle set"]],
    desc: "Aftermarket brake shoe from Asuki, listed for Toyota Yaris 1.3L 2NR-FE (2020–2023). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13521385", sku: "TK-13521385", oem: null, brand: "Unbranded", grade: "performance", title: "Front Brake Pads for Toyota Hilux Revo / Fortuner", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 4500, unit: "Front axle set", stock: 99, fits: ["toyota-fortuner-27","toyota-fortuner-28","toyota-hilux-28"], checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from Unbranded, listed for Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10873199", sku: "TK-10873199", oem: null, brand: "Nissin Japan", grade: "performance", title: "Honda BR-V Front Disc Pad", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 9500, unit: "Front axle set", stock: 99, fits: ["honda-brv"], checked: "2026-10-04",
    specs: [["Brand","Nissin Japan"],["Listed fitment","Honda BR-V 1.5L L15Z i-VTEC (2017–2026)"],["Pack","Front axle set"]],
    desc: "Aftermarket brake pad from Nissin Japan, listed for Honda BR-V 1.5L L15Z i-VTEC (2017–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10934552", sku: "TK-10934552", oem: null, brand: "MG OEM", grade: "oem", title: "MG HS Front Disc Pad OEM", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 18000, unit: "Front axle set", stock: 99, fits: ["mg-hs"], checked: "2026-10-04",
    specs: [["Brand","MG OEM"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Front axle set"]],
    desc: "Genuine / OEM brake pad from MG OEM, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10934568", sku: "TK-10934568", oem: null, brand: "GM Max", grade: "performance", title: "MG HS Rear Disc Pad", category: "brakes", sub: "Brake pads", art: "pads", position: "rear", price: 5000, unit: "Rear axle set", stock: 99, fits: ["mg-hs"], checked: "2026-10-04",
    specs: [["Brand","GM Max"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Rear axle set"]],
    desc: "Aftermarket brake pad from GM Max, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-11367148", sku: "TK-11367148", oem: null, brand: "Toyota Genuine", grade: "oem", title: "Toyota Genuine Oil Filter — Corolla & Vitz", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2249, was: 2399, unit: "Each", stock: 99, fits: ["toyota-corolla-16@2015-2026","toyota-corolla-18@2015-2026","toyota-yaris-13"], checked: "2026-10-04",
    specs: [["Brand","Toyota Genuine"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026); Toyota Yaris 1.3L 2NR-FE (2020–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM oil filter from Toyota Genuine, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026); Toyota Yaris 1.3L 2NR-FE (2020–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13186898", sku: "04152-YZZA6", oem: null, brand: "OEM-spec replacement", grade: "performance", title: "Toyota Engine Oil Filter Element 04152-YZZA6", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1700, was: 2000, unit: "Each", stock: 99, fits: ["toyota-corolla-16@2015-2026","toyota-corolla-18@2015-2026"], checked: "2026-10-04",
    specs: [["Brand","OEM-spec replacement"],["Part no.","04152-YZZA6"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026)"],["Pack","Each"]],
    desc: "Aftermarket oil filter from OEM-spec replacement, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-9949526", sku: "TK-9949526", oem: null, brand: "Toyota Genuine", grade: "oem", title: "Toyota Genuine Oil Filter — Revo, Fortuner, Prado", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2550, unit: "Each", stock: 99, fits: ["toyota-fortuner-27","toyota-fortuner-28","toyota-hilux-28"], checked: "2026-10-04",
    specs: [["Brand","Toyota Genuine"],["Listed fitment","Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM oil filter from Toyota Genuine, listed for Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-11394096", sku: "TK-11394096", oem: null, brand: "VIC", grade: "performance", title: "Toyota Fortuner 2016-2025 Oil Filter — Made in Japan", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1949, unit: "Each", stock: 99, fits: ["toyota-fortuner-27@2016-2025","toyota-fortuner-28@2016-2025"], checked: "2026-10-04",
    specs: [["Brand","VIC"],["Listed fitment","Toyota Fortuner 2.7L 2TR-FE petrol (2016–2025); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2025)"],["Pack","Each"]],
    desc: "Aftermarket oil filter from VIC, listed for Toyota Fortuner 2.7L 2TR-FE petrol (2016–2025); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2025). Confirm against your old part number before fitting."
  },
  {
    id: "pw-12518942", sku: "TK-12518942", oem: null, brand: "Honda Genuine", grade: "oem", title: "Genuine Oil Filter — Honda City / Civic / BR-V", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2245, unit: "Each", stock: 99, fits: ["honda-city-12@2021-2026","honda-city-15@2021-2026","honda-civic-18","honda-civic-15t","honda-brv"], checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda City 1.2L L12B i-VTEC (2021–2026); Honda City 1.5L L15Z (2021–2026); Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2026); Honda BR-V 1.5L L15Z i-VTEC (2017–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM oil filter from Honda Genuine, listed for Honda City 1.2L L12B i-VTEC (2021–2026); Honda City 1.5L L15Z (2021–2026); Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2026); Honda BR-V 1.5L L15Z i-VTEC (2017–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10184464", sku: "TK-10184464", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Civic 2007-2022 Oil Filter Genuine", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1500, was: 1800, unit: "Each", stock: 99, fits: ["honda-civic-18@2016-2021","honda-civic-15t@2016-2022"], checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022)"],["Pack","Each"]],
    desc: "Genuine / OEM oil filter from Honda Genuine, listed for Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13048428", sku: "TK-13048428", oem: null, brand: "Unbranded", grade: "performance", title: "Honda City Oil Filter 2022-2026", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1199, unit: "Each", stock: 99, fits: ["honda-city-12@2022-2026","honda-city-15@2022-2026"], checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Honda City 1.2L L12B i-VTEC (2022–2026); Honda City 1.5L L15Z (2022–2026)"],["Pack","Each"]],
    desc: "Aftermarket oil filter from Unbranded, listed for Honda City 1.2L L12B i-VTEC (2022–2026); Honda City 1.5L L15Z (2022–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-8196374", sku: "TK-8196374", oem: null, brand: "Suzuki Genuine", grade: "oem", title: "Suzuki Alto 660cc Oil Filter — Suzuki Genuine", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2450, unit: "Each", stock: 99, fits: ["suzuki-alto@2019-2023"], checked: "2026-10-04",
    specs: [["Brand","Suzuki Genuine"],["Listed fitment","Suzuki Alto 0.66L R06A (2019–2023)"],["Pack","Each"]],
    desc: "Genuine / OEM oil filter from Suzuki Genuine, listed for Suzuki Alto 0.66L R06A (2019–2023). Confirm against your old part number before fitting."
  },
  {
    id: "pw-8196389", sku: "16510B67LA0N000", oem: "16510B67LA0N000", brand: "Suzuki Genuine", grade: "oem", title: "Suzuki Wagon R 2014-2023 Oil Filter — Suzuki Genuine", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2450, unit: "Each", stock: 99, fits: ["suzuki-wagonr@2014-2023"], checked: "2026-10-04",
    specs: [["Brand","Suzuki Genuine"],["Part no.","16510B67LA0N000"],["Listed fitment","Suzuki Wagon R 1.0L K10B (2014–2023)"],["Pack","Each"]],
    desc: "Genuine / OEM oil filter from Suzuki Genuine, listed for Suzuki Wagon R 1.0L K10B (2014–2023). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10922301", sku: "16510-58M00", oem: null, brand: "GPT", grade: "performance", title: "GPT Oil Filter 16510-58M00 — Cultus / Wagon R", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 899, was: 1599, unit: "Each", stock: 99, fits: ["suzuki-cultus","suzuki-wagonr"], checked: "2026-10-04",
    specs: [["Brand","GPT"],["Part no.","16510-58M00"],["Listed fitment","Suzuki Cultus 1.0L K10B (2017–2026); Suzuki Wagon R 1.0L K10B (2014–2026)"],["Pack","Each"]],
    desc: "Aftermarket oil filter from GPT, listed for Suzuki Cultus 1.0L K10B (2017–2026); Suzuki Wagon R 1.0L K10B (2014–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13014860", sku: "TK-13014860", oem: null, brand: "Unbranded", grade: "performance", title: "Suzuki Swift New Oil Filter (2022-2026)", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 675, was: 750, unit: "Each", stock: 99, fits: ["suzuki-swift@2022-2026"], checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Suzuki Swift 1.2L K12M (2022–2026)"],["Pack","Each"]],
    desc: "Aftermarket oil filter from Unbranded, listed for Suzuki Swift 1.2L K12M (2022–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13048400", sku: "TK-13048400", oem: null, brand: "Unbranded", grade: "performance", title: "Kia Sportage Oil Filter", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2499, unit: "Each", stock: 99, fits: ["kia-sportage"], checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","KIA Sportage 2.0L Nu MPi (2019–2026)"],["Pack","Each"]],
    desc: "Aftermarket oil filter from Unbranded, listed for KIA Sportage 2.0L Nu MPi (2019–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10016915", sku: "TK-10016915", oem: null, brand: "Hyundai Genuine", grade: "oem", title: "Hyundai Tucson Genuine Oil Filter", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2400, unit: "Each", stock: 99, fits: ["hyundai-tucson"], checked: "2026-10-04",
    specs: [["Brand","Hyundai Genuine"],["Listed fitment","Hyundai Tucson 2.0L Nu MPi (2020–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM oil filter from Hyundai Genuine, listed for Hyundai Tucson 2.0L Nu MPi (2020–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-11401806", sku: "TK-11401806", oem: null, brand: "VIC", grade: "performance", title: "KIA Picanto 2019-2025 Oil Filter — Made in Japan", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1950, unit: "Each", stock: 99, fits: ["kia-picanto@2019-2025"], checked: "2026-10-04",
    specs: [["Brand","VIC"],["Listed fitment","KIA Picanto 1.0L Kappa (2019–2025)"],["Pack","Each"]],
    desc: "Aftermarket oil filter from VIC, listed for KIA Picanto 1.0L Kappa (2019–2025). Confirm against your old part number before fitting."
  },
  {
    id: "pw-9084068", sku: "TK-9084068", oem: null, brand: "Guard Filters", grade: "performance", title: "Changan Alsvin Oil Filter", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2150, unit: "Each", stock: 99, fits: ["changan-alsvin"], checked: "2026-10-04",
    specs: [["Brand","Guard Filters"],["Listed fitment","Changan Alsvin 1.5L JL473Q (2021–2026)"],["Pack","Each"]],
    desc: "Aftermarket oil filter from Guard Filters, listed for Changan Alsvin 1.5L JL473Q (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-9084058", sku: "TK-9084058", oem: null, brand: "Guard Filters", grade: "performance", title: "MG HS Oil Filter", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1799, unit: "Each", stock: 99, fits: ["mg-hs"], checked: "2026-10-04",
    specs: [["Brand","Guard Filters"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Each"]],
    desc: "Aftermarket oil filter from Guard Filters, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10016730", sku: "17801-0M020", oem: "17801-0M020", brand: "Toyota Genuine", grade: "oem", title: "Toyota Corolla 2009-2024 Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 5800, unit: "Each", stock: 99, fits: ["toyota-corolla-16@2015-2024","toyota-corolla-18@2015-2024"], checked: "2026-10-04",
    specs: [["Brand","Toyota Genuine"],["Part no.","17801-0M020"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2024); Toyota Corolla 1.8L 2ZR-FE (2015–2024)"],["Pack","Each"]],
    desc: "Genuine / OEM air filter from Toyota Genuine, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2024); Toyota Corolla 1.8L 2ZR-FE (2015–2024). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10894374", sku: "17801-0M020", oem: null, brand: "GPT", grade: "performance", title: "GPT Air Filter 17801-0M020 — Corolla 2009-2026", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 1199, was: 2000, unit: "Each", stock: 99, fits: ["toyota-corolla-16@2015-2026","toyota-corolla-18@2015-2026"], checked: "2026-10-04",
    specs: [["Brand","GPT"],["Part no.","17801-0M020"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026)"],["Pack","Each"]],
    desc: "Aftermarket air filter from GPT, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13186951", sku: "17801-0L040", oem: null, brand: "Imported (OEM-spec)", grade: "performance", title: "Fortuner / Hilux Revo Engine Air Filter 17801-0L040", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 3229, was: 3450, unit: "Each", stock: 99, fits: ["toyota-fortuner-27","toyota-fortuner-28","toyota-hilux-28"], checked: "2026-10-04",
    specs: [["Brand","Imported (OEM-spec)"],["Part no.","17801-0L040"],["Listed fitment","Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026)"],["Pack","Each"]],
    desc: "Aftermarket air filter from Imported (OEM-spec), listed for Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10452508", sku: "TK-10452508", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Civic X 1.5 Turbo Air Filter Genuine", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 5000, unit: "Each", stock: 99, fits: ["honda-civic-15t@2016-2021"], checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda Civic 1.5L L15B7 VTEC Turbo (2016–2021)"],["Pack","Each"]],
    desc: "Genuine / OEM air filter from Honda Genuine, listed for Honda Civic 1.5L L15B7 VTEC Turbo (2016–2021). Confirm against your old part number before fitting."
  },
  {
    id: "pw-9944505", sku: "TK-9944505", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Civic 1.8 2017-2021 Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 6500, unit: "Each", stock: 99, fits: ["honda-civic-18@2017-2021"], checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda Civic 1.8L R18Z i-VTEC (2017–2021)"],["Pack","Each"]],
    desc: "Genuine / OEM air filter from Honda Genuine, listed for Honda Civic 1.8L R18Z i-VTEC (2017–2021). Confirm against your old part number before fitting."
  },
  {
    id: "pw-9944590", sku: "TK-9944590", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Civic 2022-2024 Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 5500, unit: "Each", stock: 99, fits: ["honda-civic-15t@2022-2024"], checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda Civic 1.5L L15B7 VTEC Turbo (2022–2024)"],["Pack","Each"]],
    desc: "Genuine / OEM air filter from Honda Genuine, listed for Honda Civic 1.5L L15B7 VTEC Turbo (2022–2024). Confirm against your old part number before fitting."
  },
  {
    id: "pw-9944635", sku: "TK-9944635", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda BR-V 2017-2024 Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 5500, unit: "Each", stock: 99, fits: ["honda-brv@2017-2024"], checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda BR-V 1.5L L15Z i-VTEC (2017–2024)"],["Pack","Each"]],
    desc: "Genuine / OEM air filter from Honda Genuine, listed for Honda BR-V 1.5L L15Z i-VTEC (2017–2024). Confirm against your old part number before fitting."
  },
  {
    id: "pw-5632599", sku: "TK-5632599", oem: null, brand: "KIA Genuine", grade: "oem", title: "Kia Picanto Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 2901, was: 3000, unit: "Each", stock: 99, fits: ["kia-picanto"], checked: "2026-10-04",
    specs: [["Brand","KIA Genuine"],["Listed fitment","KIA Picanto 1.0L Kappa (2019–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM air filter from KIA Genuine, listed for KIA Picanto 1.0L Kappa (2019–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10016858", sku: "TK-10016858", oem: null, brand: "Hyundai Genuine", grade: "oem", title: "Hyundai Tucson Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 4950, unit: "Each", stock: 99, fits: ["hyundai-tucson"], checked: "2026-10-04",
    specs: [["Brand","Hyundai Genuine"],["Listed fitment","Hyundai Tucson 2.0L Nu MPi (2020–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM air filter from Hyundai Genuine, listed for Hyundai Tucson 2.0L Nu MPi (2020–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-12877681", sku: "TK-12877681", oem: null, brand: "Changan OEM", grade: "oem", title: "Changan Alsvin Air Filter OEM", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 5399, was: 5999, unit: "Each", stock: 99, fits: ["changan-alsvin"], checked: "2026-10-04",
    specs: [["Brand","Changan OEM"],["Listed fitment","Changan Alsvin 1.5L JL473Q (2021–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM air filter from Changan OEM, listed for Changan Alsvin 1.5L JL473Q (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10929023", sku: "TK-10929023", oem: null, brand: "MG OEM", grade: "oem", title: "MG HS Air Filter OEM", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 2500, unit: "Each", stock: 99, fits: ["mg-hs"], checked: "2026-10-04",
    specs: [["Brand","MG OEM"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM air filter from MG OEM, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-8074614", sku: "AC-101", oem: null, brand: "Leppon", grade: "performance", title: "Leppon AC Cabin Filter AC-101 — Yaris 2020-2023", category: "filters", sub: "Cabin filters", art: "airfilter", position: "na", price: 1649, unit: "Each", stock: 99, fits: ["toyota-yaris-13@2020-2023"], checked: "2026-10-04",
    specs: [["Brand","Leppon"],["Part no.","AC-101"],["Listed fitment","Toyota Yaris 1.3L 2NR-FE (2020–2023)"],["Pack","Each"]],
    desc: "Aftermarket cabin filter from Leppon, listed for Toyota Yaris 1.3L 2NR-FE (2020–2023). Confirm against your old part number before fitting."
  },
  {
    id: "pw-11616486", sku: "TK-11616486", oem: null, brand: "Unbranded", grade: "performance", title: "Suzuki Alto 660 Cabin AC Filter", category: "filters", sub: "Cabin filters", art: "airfilter", position: "na", price: 1999, was: 2500, unit: "Each", stock: 99, fits: ["suzuki-alto"], checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Suzuki Alto 0.66L R06A (2019–2026)"],["Pack","Each"]],
    desc: "Aftermarket cabin filter from Unbranded, listed for Suzuki Alto 0.66L R06A (2019–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13034890", sku: "TK-13034890", oem: null, brand: "Unbranded", grade: "performance", title: "Hyundai Tucson 2020-2025 Cabin Filter — Carbon Active", category: "filters", sub: "Cabin filters", art: "airfilter", position: "na", price: 2250, unit: "Each", stock: 99, fits: ["hyundai-tucson@2020-2025"], checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Hyundai Tucson 2.0L Nu MPi (2020–2025)"],["Pack","Each"]],
    desc: "Aftermarket cabin filter from Unbranded, listed for Hyundai Tucson 2.0L Nu MPi (2020–2025). Confirm against your old part number before fitting."
  },
  {
    id: "pw-12876864", sku: "TK-12876864", oem: null, brand: "Changan OEM", grade: "oem", title: "Changan Alsvin AC Filter Genuine", category: "filters", sub: "Cabin filters", art: "airfilter", position: "na", price: 4199, was: 5999, unit: "Each", stock: 99, fits: ["changan-alsvin"], checked: "2026-10-04",
    specs: [["Brand","Changan OEM"],["Listed fitment","Changan Alsvin 1.5L JL473Q (2021–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM cabin filter from Changan OEM, listed for Changan Alsvin 1.5L JL473Q (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10008506", sku: "TK-10008506", oem: null, brand: "Toyota Genuine", grade: "oem", title: "Toyota Taglon Supreme 0W-20 Engine Oil 4.2L", category: "oils", sub: "Engine oil", art: "fluid", position: "na", price: 10000, unit: "4.2 L", stock: 99, fits: ["universal"], checked: "2026-10-04",
    specs: [["Brand","Toyota Genuine"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","4.2 L"]],
    desc: "Toyota Taglon Supreme 0W-20 Engine Oil 4.2L from Toyota Genuine. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying."
  },
  {
    id: "pw-8199297", sku: "TK-8199297", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Genuine 0W-20 SP Engine Oil 3.7L", category: "oils", sub: "Engine oil", art: "fluid", position: "na", price: 10120, unit: "3.7 L", stock: 99, fits: ["universal"], checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","3.7 L"]],
    desc: "Honda Genuine 0W-20 SP Engine Oil 3.7L from Honda Genuine. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying."
  },
  {
    id: "pw-8901846", sku: "TK-8901846", oem: null, brand: "Suzuki Genuine", grade: "oem", title: "Suzuki Ecstar F9000 0W-20 Engine Oil 3.1L", category: "oils", sub: "Engine oil", art: "fluid", position: "na", price: 6950, unit: "3.1 L", stock: 99, fits: ["universal"], checked: "2026-10-04",
    specs: [["Brand","Suzuki Genuine"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","3.1 L"]],
    desc: "Suzuki Ecstar F9000 0W-20 Engine Oil 3.1L from Suzuki Genuine. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying."
  },
  {
    id: "pw-10702418", sku: "TK-10702418", oem: null, brand: "Valvoline", grade: "performance", title: "Valvoline 0W-20 Engine Oil 4L", category: "oils", sub: "Engine oil", art: "fluid", position: "na", price: 10700, unit: "4 L", stock: 99, fits: ["universal"], checked: "2026-10-04",
    specs: [["Brand","Valvoline"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","4 L"]],
    desc: "Valvoline 0W-20 Engine Oil 4L from Valvoline. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying."
  },
  {
    id: "pw-12231935", sku: "TK-12231935", oem: null, brand: "Flamingo", grade: "performance", title: "Flamingo Radiator Coolant 5L — Green", category: "oils", sub: "Coolant", art: "coolant", position: "na", price: 2499, was: 3499, unit: "5 L", stock: 99, fits: ["universal"], checked: "2026-10-04",
    specs: [["Brand","Flamingo"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","5 L"]],
    desc: "Flamingo Radiator Coolant 5L — Green from Flamingo. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying."
  },
  {
    id: "pw-5970629", sku: "TK-5970629", oem: null, brand: "NASA", grade: "performance", title: "NASA Radiator Coolant Super Red 1L", category: "oils", sub: "Coolant", art: "coolant", position: "na", price: 699, was: 999, unit: "1 L", stock: 99, fits: ["universal"], checked: "2026-10-04",
    specs: [["Brand","NASA"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","1 L"]],
    desc: "NASA Radiator Coolant Super Red 1L from NASA. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying."
  },
  {
    id: "pw-12999923", sku: "TK-12999923", oem: null, brand: "MG OEM", grade: "oem", title: "MG HS Spark Plug Genuine", category: "engine", sub: "Spark plugs", art: "plug", position: "na", price: 5000, unit: "Each", stock: 99, fits: ["mg-hs"], checked: "2026-10-04",
    specs: [["Brand","MG OEM"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM spark plug from MG OEM, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10444501", sku: "TK-10444501", oem: null, brand: "Unbranded", grade: "performance", title: "Changan Alsvin Belt Tensioner", category: "engine", sub: "Belts & tensioners", art: "belt", position: "na", price: 12000, was: 12999, unit: "Each", stock: 99, fits: ["changan-alsvin"], checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Changan Alsvin 1.5L JL473Q (2021–2026)"],["Pack","Each"]],
    desc: "Aftermarket belts & tensioner from Unbranded, listed for Changan Alsvin 1.5L JL473Q (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-11755610", sku: "TK-11755610", oem: null, brand: "Koyorad", grade: "performance", title: "Koyorad Radiator for Honda BR-V", category: "cooling", sub: "Radiators", art: "radiator", position: "na", price: 36000, unit: "Each", stock: 99, fits: ["honda-brv"], checked: "2026-10-04",
    specs: [["Brand","Koyorad"],["Listed fitment","Honda BR-V 1.5L L15Z i-VTEC (2017–2026)"],["Pack","Each"]],
    desc: "Aftermarket radiator from Koyorad, listed for Honda BR-V 1.5L L15Z i-VTEC (2017–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-11863170", sku: "TK-11863170", oem: null, brand: "Unbranded", grade: "performance", title: "MG HS Water Pump", category: "cooling", sub: "Water pumps", art: "pump", position: "na", price: 20000, unit: "Each", stock: 99, fits: ["mg-hs"], checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Each"]],
    desc: "Aftermarket water pump from Unbranded, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-10685507", sku: "TK-10685507", oem: null, brand: "Changan OEM", grade: "oem", title: "Changan Alsvin Oxygen Sensor OEM", category: "electrical", sub: "Sensors", art: "sensor", position: "na", price: 9960, was: 12000, unit: "Each", stock: 99, fits: ["changan-alsvin"], checked: "2026-10-04",
    specs: [["Brand","Changan OEM"],["Listed fitment","Changan Alsvin 1.5L JL473Q (2021–2026)"],["Pack","Each"]],
    desc: "Genuine / OEM sensor from Changan OEM, listed for Changan Alsvin 1.5L JL473Q (2021–2026). Confirm against your old part number before fitting."
  },
  {
    id: "pw-13504574", sku: "TK-13504574", oem: null, brand: "AGS", grade: "performance", title: "AGS Battery 38A — 11 Plate", category: "electrical", sub: "Batteries", art: "battery", position: "na", price: 6500, unit: "Each", stock: 99, fits: ["universal"], checked: "2026-10-04",
    specs: [["Brand","AGS"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","Each"]],
    desc: "AGS Battery 38A — 11 Plate from AGS. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying."
  }
];
