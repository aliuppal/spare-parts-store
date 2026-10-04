/* TeckAuto catalog — real listings from the PakWheels Auto Store (pakwheels.com/accessories-spare-parts),
   prices in PKR as listed on 2026-10-04. `src` links each product to its source listing; `img` is that listing's main photo (hotlinked, credited).
   `fits` holds vehicle ids, optionally with the listing's model years ("honda-civic-15t@2016-2022"), or "universal".
   Stock is not tracked: every listing is shown as available to order. */

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
    id: "pw-8991502", sku: "PW-8991502", oem: null, brand: "MK Japan", grade: "performance", title: "Toyota Corolla 2014-2023 Front Disc Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 5499, unit: "Front axle set", stock: 99, fits: ["toyota-corolla-16@2015-2023","toyota-corolla-18@2015-2023"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-corolla-2014-2023-mk-japan-front-disc-brake-pads-8991502", img: "https://cache1.pakwheels.com/ad_pictures/9375/toyota-corolla-2014-2023-mk-japan-front-disc-brake-pads-93758800.webp", checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2023); Toyota Corolla 1.8L 2ZR-FE (2015–2023)"],["Pack","Front axle set"],["Source listing","PakWheels #8991502"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2023); Toyota Corolla 1.8L 2ZR-FE (2015–2023). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-2981294", sku: "PW-2981294", oem: null, brand: "Toyota Genuine", grade: "oem", title: "Toyota Corolla Genuine Front Brake Pads 2014-2024", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 20500, unit: "Front axle set", stock: 99, fits: ["toyota-corolla-16@2015-2024","toyota-corolla-18@2015-2024"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-corolla-2014-2018-genuine-front-brake-pads-2981294", img: "https://cache1.pakwheels.com/ad_pictures/2240/toyota-corolla-2014-2018-genuine-front-brake-pads-v-3-22409309.webp", checked: "2026-10-04",
    specs: [["Brand","Toyota Genuine"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2024); Toyota Corolla 1.8L 2ZR-FE (2015–2024)"],["Pack","Front axle set"],["Source listing","PakWheels #2981294"]],
    desc: "Genuine / OEM brake pad from Toyota Genuine, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2024); Toyota Corolla 1.8L 2ZR-FE (2015–2024). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-2760502", sku: "A-73 AD", oem: null, brand: "Asuki", grade: "performance", title: "Asuki Advanced Front Brake Pad A-73 AD — Corolla 2009-2019", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 5999, was: 6499, unit: "Front axle set", stock: 99, fits: ["toyota-corolla-16@2015-2019","toyota-corolla-18@2015-2019"], src: "https://www.pakwheels.com/accessories-spare-parts/asuki-advanced-front-brake-pad-for-toyota-corolla-2009-2019-a-73-ad-2760502", img: "https://cache3.pakwheels.com/ad_pictures/3742/asuki-advanced-front-brake-pad-for-toyota-corolla-2009-2019-a-73-ad-37422411.jpg", checked: "2026-10-04",
    specs: [["Brand","Asuki"],["Part no.","A-73 AD"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2019); Toyota Corolla 1.8L 2ZR-FE (2015–2019)"],["Pack","Front axle set"],["Source listing","PakWheels #2760502"]],
    desc: "Aftermarket brake pad from Asuki, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2019); Toyota Corolla 1.8L 2ZR-FE (2015–2019). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13195070", sku: "PW-13195070", oem: null, brand: "iBrake Indonesia", grade: "performance", title: "Toyota Corolla Grande 2014-2018 Rear Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "rear", price: 6480, was: 7200, unit: "Rear axle set", stock: 99, fits: ["toyota-corolla-18@2015-2018"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-corolla-grande-2014-2018-rear-brake-pads-ibrake-indonesia-13195070", img: "https://cache4.pakwheels.com/ad_pictures/1471/toyota-corolla-grande-2014-2018-rear-brake-pads-ibrake-indonesia-147167010.webp", checked: "2026-10-04",
    specs: [["Brand","iBrake Indonesia"],["Listed fitment","Toyota Corolla 1.8L 2ZR-FE (2015–2018)"],["Pack","Rear axle set"],["Source listing","PakWheels #13195070"]],
    desc: "Aftermarket brake pad from iBrake Indonesia, listed for Toyota Corolla 1.8L 2ZR-FE (2015–2018). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10039025", sku: "45022-TEA-T00", oem: "45022-TEA-T00", brand: "Honda Genuine", grade: "oem", title: "Honda Civic 2016-22 Front Brake Pads Genuine", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 20010, was: 23000, unit: "Front axle set", stock: 99, fits: ["honda-civic-18@2016-2021","honda-civic-15t@2016-2022"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-civic-2016-22-front-disc-pad-brake-pad-genuine-10039025", img: "https://cache3.pakwheels.com/ad_pictures/1070/honda-civic-2016-22-front-disc-pad-brake-pad-genuine-107051535.webp", checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Part no.","45022-TEA-T00"],["Listed fitment","Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022)"],["Pack","Front axle set"],["Source listing","PakWheels #10039025"]],
    desc: "Genuine / OEM brake pad from Honda Genuine, listed for Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-12696024", sku: "PW-12696024", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Civic 2022-24 Front Brake Pads Genuine", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 22566, unit: "Front axle set", stock: 99, fits: ["honda-civic-15t@2022-2024"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-civic-2022-24-front-disc-pad-brake-pad-genuine-12696024", img: "https://cache3.pakwheels.com/ad_pictures/1408/honda-civic-2022-24-front-disc-pad-brake-pad-genuine-140890106.webp", checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda Civic 1.5L L15B7 VTEC Turbo (2022–2024)"],["Pack","Front axle set"],["Source listing","PakWheels #12696024"]],
    desc: "Genuine / OEM brake pad from Honda Genuine, listed for Honda Civic 1.5L L15B7 VTEC Turbo (2022–2024). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-11249745", sku: "PW-11249745", oem: null, brand: "MK Japan", grade: "performance", title: "Honda Civic 2016-2022 Front Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 7399, was: 8500, unit: "Front axle set", stock: 99, fits: ["honda-civic-18@2016-2021","honda-civic-15t@2016-2022"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-civic-2016-2022-front-brake-pads-mk-japan-11249745", img: "https://cache2.pakwheels.com/ad_pictures/1224/honda-civic-2016-2022-front-brake-pads-mk-japan-122422580.webp", checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022)"],["Pack","Front axle set"],["Source listing","PakWheels #11249745"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13036495", sku: "PW-13036495", oem: null, brand: "AutomanPK", grade: "performance", title: "Honda Civic 2016-2021 (Civic X) Rear Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "rear", price: 6999, was: 7500, unit: "Rear axle set", stock: 99, fits: ["honda-civic-18@2016-2021","honda-civic-15t@2016-2021"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-civic-2016-2021-civic-x-rear-brake-pads-automanpk-13036495", img: "https://cache1.pakwheels.com/ad_pictures/1452/honda-civic-2016-2021-civic-x-rear-brake-pads-automanpk-145210356.webp", checked: "2026-10-04",
    specs: [["Brand","AutomanPK"],["Listed fitment","Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2021)"],["Pack","Rear axle set"],["Source listing","PakWheels #13036495"]],
    desc: "Aftermarket brake pad from AutomanPK, listed for Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2021). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-11249842", sku: "PW-11249842", oem: null, brand: "MK Japan", grade: "performance", title: "Honda City 2021-2025 Front Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 7499, was: 8500, unit: "Front axle set", stock: 99, fits: ["honda-city-12@2021-2025","honda-city-15@2021-2025"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-city-2021-2025-front-brake-pads-mk-japan-11249842", img: "https://cache3.pakwheels.com/ad_pictures/1224/honda-city-2021-2025-front-brake-pads-mk-japan-122423707.webp", checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Honda City 1.2L L12B i-VTEC (2021–2025); Honda City 1.5L L15Z (2021–2025)"],["Pack","Front axle set"],["Source listing","PakWheels #11249842"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Honda City 1.2L L12B i-VTEC (2021–2025); Honda City 1.5L L15Z (2021–2025). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-12998763", sku: "PW-12998763", oem: null, brand: "Akebono", grade: "performance", title: "Akebono Front Brake Pads — Honda City 2022-2025", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 11899, was: 13998, unit: "Front axle set", stock: 99, fits: ["honda-city-12@2022-2025","honda-city-15@2022-2025"], src: "https://www.pakwheels.com/accessories-spare-parts/akebono-front-brake-pads-for-honda-city-2022-2025-genuine-quality-smooth-and-reliable-braking-12998763", img: "https://cache2.pakwheels.com/ad_pictures/1447/akebono-front-brake-pads-for-honda-city-2022-2025-genuine-quality-smooth-and-reliable-braking-144749868.webp", checked: "2026-10-04",
    specs: [["Brand","Akebono"],["Listed fitment","Honda City 1.2L L12B i-VTEC (2022–2025); Honda City 1.5L L15Z (2022–2025)"],["Pack","Front axle set"],["Source listing","PakWheels #12998763"]],
    desc: "Aftermarket brake pad from Akebono, listed for Honda City 1.2L L12B i-VTEC (2022–2025); Honda City 1.5L L15Z (2022–2025). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-2082036", sku: "A-208 AD", oem: null, brand: "Asuki", grade: "performance", title: "Asuki Advanced Front Brake Pad A-208 AD — Cultus 2017-2024", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 5999, was: 6734, unit: "Front axle set", stock: 99, fits: ["suzuki-cultus@2017-2024"], src: "https://www.pakwheels.com/accessories-spare-parts/suzuki-cultus-asuki-advanced-front-brake-pad-a-208-ad-2082036", img: "https://cache2.pakwheels.com/ad_pictures/1320/suzuki-cultus-asuki-advanced-front-brake-pad-a-208-ad-v-1-13203701.webp", checked: "2026-10-04",
    specs: [["Brand","Asuki"],["Part no.","A-208 AD"],["Listed fitment","Suzuki Cultus 1.0L K10B (2017–2024)"],["Pack","Front axle set"],["Source listing","PakWheels #2082036"]],
    desc: "Aftermarket brake pad from Asuki, listed for Suzuki Cultus 1.0L K10B (2017–2024). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-8991371", sku: "PW-8991371", oem: null, brand: "MK Japan", grade: "performance", title: "Suzuki Cultus 2017-2023 Front Disc Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 4000, unit: "Front axle set", stock: 99, fits: ["suzuki-cultus@2017-2023"], src: "https://www.pakwheels.com/accessories-spare-parts/suzuki-cultus-2017-2023-mk-japan-front-disc-brake-pads-8991371", img: "https://cache2.pakwheels.com/ad_pictures/9375/suzuki-cultus-2017-2023-mk-japan-front-disc-brake-pads-93757123.webp", checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Suzuki Cultus 1.0L K10B (2017–2023)"],["Pack","Front axle set"],["Source listing","PakWheels #8991371"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Suzuki Cultus 1.0L K10B (2017–2023). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-9348485", sku: "PW-9348485", oem: null, brand: "MK Japan", grade: "performance", title: "Suzuki Mehran Front Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 3000, unit: "Front axle set", stock: 99, fits: ["suzuki-mehran"], src: "https://www.pakwheels.com/accessories-spare-parts/suzuki-mehran-mk-japan-front-brake-pads-9348485", img: "https://cache2.pakwheels.com/ad_pictures/9845/suzuki-mehran-mk-japan-front-brake-pads-98455331.webp", checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Suzuki Mehran 0.8L F8B (2012–2019)"],["Pack","Front axle set"],["Source listing","PakWheels #9348485"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Suzuki Mehran 0.8L F8B (2012–2019). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-4853401", sku: "P-183", oem: null, brand: "Guard", grade: "performance", title: "Guard Front Brake Pad P-183 — Mehran 1988-2019", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 1638, unit: "Front axle set", stock: 99, fits: ["suzuki-mehran"], src: "https://www.pakwheels.com/accessories-spare-parts/guard-front-brake-pad-for-suzuki-mehran-1988-2019-p-183-4853401", img: "https://cache4.pakwheels.com/ad_pictures/4221/guard-front-brake-pad-for-suzuki-mehran-1988-2019-p-183-42210688.jpg", checked: "2026-10-04",
    specs: [["Brand","Guard"],["Part no.","P-183"],["Listed fitment","Suzuki Mehran 0.8L F8B (2012–2019)"],["Pack","Front axle set"],["Source listing","PakWheels #4853401"]],
    desc: "Aftermarket brake pad from Guard, listed for Suzuki Mehran 0.8L F8B (2012–2019). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13213314", sku: "PW-13213314", oem: null, brand: "iBrake Indonesia", grade: "performance", title: "Suzuki Mehran 2012-2019 Rear Brake Shoe", category: "brakes", sub: "Brake shoes", art: "shoe", position: "rear", price: 7400, unit: "Rear axle set", stock: 99, fits: ["suzuki-mehran@2012-2019"], src: "https://www.pakwheels.com/accessories-spare-parts/suzuki-mehran-2012-2019-rear-brake-shoe-ibrake-indonesia-13213314", img: "https://cache1.pakwheels.com/ad_pictures/1473/suzuki-mehran-2012-2019-rear-brake-shoe-ibrake-indonesia-147390984.webp", checked: "2026-10-04",
    specs: [["Brand","iBrake Indonesia"],["Listed fitment","Suzuki Mehran 0.8L F8B (2012–2019)"],["Pack","Rear axle set"],["Source listing","PakWheels #13213314"]],
    desc: "Aftermarket brake shoe from iBrake Indonesia, listed for Suzuki Mehran 0.8L F8B (2012–2019). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-11250445", sku: "PW-11250445", oem: null, brand: "MK Japan", grade: "performance", title: "Toyota Yaris 1.3 2020-2024 Front Brake Pads", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 8900, unit: "Front axle set", stock: 99, fits: ["toyota-yaris-13@2020-2024"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-yaris-13-2020-2024-front-brake-pads-mk-japan-11250445", img: "https://cache2.pakwheels.com/ad_pictures/1455/toyota-yaris-13-2020-2024-front-brake-pads-mk-japan-145502611.webp", checked: "2026-10-04",
    specs: [["Brand","MK Japan"],["Listed fitment","Toyota Yaris 1.3L 2NR-FE (2020–2024)"],["Pack","Front axle set"],["Source listing","PakWheels #11250445"]],
    desc: "Aftermarket brake pad from MK Japan, listed for Toyota Yaris 1.3L 2NR-FE (2020–2024). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-8294150", sku: "2010", oem: null, brand: "Asuki", grade: "performance", title: "Asuki Rear Brake Shoe 2010 — Yaris 2020-2023", category: "brakes", sub: "Brake shoes", art: "shoe", position: "rear", price: 3950, unit: "Rear axle set", stock: 99, fits: ["toyota-yaris-13@2020-2023"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-yaris-2020-2023-asuki-rare-brake-shoe-2010-8294150", img: "https://cache1.pakwheels.com/ad_pictures/8540/toyota-yaris-2020-2023-asuki-rare-brake-shoe-a-2284-a-2386-85406610.webp", checked: "2026-10-04",
    specs: [["Brand","Asuki"],["Part no.","2010"],["Listed fitment","Toyota Yaris 1.3L 2NR-FE (2020–2023)"],["Pack","Rear axle set"],["Source listing","PakWheels #8294150"]],
    desc: "Aftermarket brake shoe from Asuki, listed for Toyota Yaris 1.3L 2NR-FE (2020–2023). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13521385", sku: "PW-13521385", oem: null, brand: "Unbranded", grade: "performance", title: "Front Brake Pads for Toyota Hilux Revo / Fortuner", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 4500, unit: "Front axle set", stock: 99, fits: ["toyota-fortuner-27","toyota-fortuner-28","toyota-hilux-28"], src: "https://www.pakwheels.com/accessories-spare-parts/front-brake-pads-for-toyota-hilux-revo-fortuner-13521385", img: "https://cache3.pakwheels.com/ad_pictures/1511/front-brake-pads-for-toyota-hilux-revo-fortuner-151163051.webp", checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026)"],["Pack","Front axle set"],["Source listing","PakWheels #13521385"]],
    desc: "Aftermarket brake pad from Unbranded, listed for Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10873199", sku: "PW-10873199", oem: null, brand: "Nissin Japan", grade: "performance", title: "Honda BR-V Front Disc Pad", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 9500, unit: "Front axle set", stock: 99, fits: ["honda-brv"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-brv-front-disc-pad-nissin-japan-10873199", img: "https://cache1.pakwheels.com/ad_pictures/1176/honda-brv-front-disc-pad-nissin-japan-117628842.webp", checked: "2026-10-04",
    specs: [["Brand","Nissin Japan"],["Listed fitment","Honda BR-V 1.5L L15Z i-VTEC (2017–2026)"],["Pack","Front axle set"],["Source listing","PakWheels #10873199"]],
    desc: "Aftermarket brake pad from Nissin Japan, listed for Honda BR-V 1.5L L15Z i-VTEC (2017–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10934552", sku: "PW-10934552", oem: null, brand: "MG OEM", grade: "oem", title: "MG HS Front Disc Pad OEM", category: "brakes", sub: "Brake pads", art: "pads", position: "front", price: 18000, unit: "Front axle set", stock: 99, fits: ["mg-hs"], src: "https://www.pakwheels.com/accessories-spare-parts/mg-hs-front-disc-pad-oem-10934552", img: "https://cache3.pakwheels.com/ad_pictures/1184/mg-hs-front-disc-pad-oem-118416689.webp", checked: "2026-10-04",
    specs: [["Brand","MG OEM"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Front axle set"],["Source listing","PakWheels #10934552"]],
    desc: "Genuine / OEM brake pad from MG OEM, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10934568", sku: "PW-10934568", oem: null, brand: "GM Max", grade: "performance", title: "MG HS Rear Disc Pad", category: "brakes", sub: "Brake pads", art: "pads", position: "rear", price: 5000, unit: "Rear axle set", stock: 99, fits: ["mg-hs"], src: "https://www.pakwheels.com/accessories-spare-parts/mg-hs-rear-disc-pad-gm-max-10934568", img: "https://cache1.pakwheels.com/ad_pictures/1184/mg-hs-rear-disc-pad-gm-max-118416952.webp", checked: "2026-10-04",
    specs: [["Brand","GM Max"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Rear axle set"],["Source listing","PakWheels #10934568"]],
    desc: "Aftermarket brake pad from GM Max, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-11367148", sku: "PW-11367148", oem: null, brand: "Toyota Genuine", grade: "oem", title: "Toyota Genuine Oil Filter — Corolla & Vitz", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2249, was: 2399, unit: "Each", stock: 99, fits: ["toyota-corolla-16@2015-2026","toyota-corolla-18@2015-2026","toyota-yaris-13"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-genuine-oil-filter-for-corolla-and-vitz-11367148", img: "https://cache2.pakwheels.com/ad_pictures/1238/toyota-genuine-oil-filter-for-corolla-and-vitz-123888069.webp", checked: "2026-10-04",
    specs: [["Brand","Toyota Genuine"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026); Toyota Yaris 1.3L 2NR-FE (2020–2026)"],["Pack","Each"],["Source listing","PakWheels #11367148"]],
    desc: "Genuine / OEM oil filter from Toyota Genuine, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026); Toyota Yaris 1.3L 2NR-FE (2020–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13186898", sku: "04152-YZZA6", oem: null, brand: "OEM-spec replacement", grade: "performance", title: "Toyota Engine Oil Filter Element 04152-YZZA6", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1700, was: 2000, unit: "Each", stock: 99, fits: ["toyota-corolla-16@2015-2026","toyota-corolla-18@2015-2026"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-engine-oil-filter-element-04152-yzza6-high-quality-replacement-oil-filter-for-corolla-vitz-13186898", img: "https://cache2.pakwheels.com/ad_pictures/1470/toyota-engine-oil-filter-element-04152-yzza6-high-quality-replacement-oil-filter-for-corolla-vitz-147065115.webp", checked: "2026-10-04",
    specs: [["Brand","OEM-spec replacement"],["Part no.","04152-YZZA6"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026)"],["Pack","Each"],["Source listing","PakWheels #13186898"]],
    desc: "Aftermarket oil filter from OEM-spec replacement, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-9949526", sku: "PW-9949526", oem: null, brand: "Toyota Genuine", grade: "oem", title: "Toyota Genuine Oil Filter — Revo, Fortuner, Prado", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2550, unit: "Each", stock: 99, fits: ["toyota-fortuner-27","toyota-fortuner-28","toyota-hilux-28"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-genuine-oil-filter-for-revo-fortuner-prado-9949526", img: "https://cache3.pakwheels.com/ad_pictures/1058/toyota-genuine-oil-filter-for-revo-fortuner-prado-105886685.webp", checked: "2026-10-04",
    specs: [["Brand","Toyota Genuine"],["Listed fitment","Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026)"],["Pack","Each"],["Source listing","PakWheels #9949526"]],
    desc: "Genuine / OEM oil filter from Toyota Genuine, listed for Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-11394096", sku: "PW-11394096", oem: null, brand: "VIC", grade: "performance", title: "Toyota Fortuner 2016-2025 Oil Filter — Made in Japan", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1949, unit: "Each", stock: 99, fits: ["toyota-fortuner-27@2016-2025","toyota-fortuner-28@2016-2025"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-fortuner-2016-2025-vic-oil-filter-made-in-japan-11394096", img: "https://cache1.pakwheels.com/ad_pictures/1242/toyota-fortuner-2016-2025-vic-oil-filter-made-in-japan-124223029.webp", checked: "2026-10-04",
    specs: [["Brand","VIC"],["Listed fitment","Toyota Fortuner 2.7L 2TR-FE petrol (2016–2025); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2025)"],["Pack","Each"],["Source listing","PakWheels #11394096"]],
    desc: "Aftermarket oil filter from VIC, listed for Toyota Fortuner 2.7L 2TR-FE petrol (2016–2025); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2025). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-12518942", sku: "PW-12518942", oem: null, brand: "Honda Genuine", grade: "oem", title: "Genuine Oil Filter — Honda City / Civic / BR-V", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2245, unit: "Each", stock: 99, fits: ["honda-city-12@2021-2026","honda-city-15@2021-2026","honda-civic-18","honda-civic-15t","honda-brv"], src: "https://www.pakwheels.com/accessories-spare-parts/automotive-oil-filter-genuine-element-type-honda-city-civic-brv-vezel-hrv-12518942", img: "https://cache2.pakwheels.com/ad_pictures/1385/automotive-oil-filter-genuine-element-type-honda-city-civic-brv-vezel-hrv-138588148.webp", checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda City 1.2L L12B i-VTEC (2021–2026); Honda City 1.5L L15Z (2021–2026); Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2026); Honda BR-V 1.5L L15Z i-VTEC (2017–2026)"],["Pack","Each"],["Source listing","PakWheels #12518942"]],
    desc: "Genuine / OEM oil filter from Honda Genuine, listed for Honda City 1.2L L12B i-VTEC (2021–2026); Honda City 1.5L L15Z (2021–2026); Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2026); Honda BR-V 1.5L L15Z i-VTEC (2017–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10184464", sku: "PW-10184464", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Civic 2007-2022 Oil Filter Genuine", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1500, was: 1800, unit: "Each", stock: 99, fits: ["honda-civic-18@2016-2021","honda-civic-15t@2016-2022"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-civic-all-oil-filter-genuine-10184464", img: "https://cache4.pakwheels.com/ad_pictures/1089/honda-civic-all-oil-filter-genuine-108944585.webp", checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022)"],["Pack","Each"],["Source listing","PakWheels #10184464"]],
    desc: "Genuine / OEM oil filter from Honda Genuine, listed for Honda Civic 1.8L R18Z i-VTEC (2016–2021); Honda Civic 1.5L L15B7 VTEC Turbo (2016–2022). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13048428", sku: "PW-13048428", oem: null, brand: "Unbranded", grade: "performance", title: "Honda City Oil Filter 2022-2026", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1199, unit: "Each", stock: 99, fits: ["honda-city-12@2022-2026","honda-city-15@2022-2026"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-city-oil-filter-2022-2026-13048428", img: "https://cache4.pakwheels.com/ad_pictures/1453/honda-city-oil-filter-2022-2026-145357390.webp", checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Honda City 1.2L L12B i-VTEC (2022–2026); Honda City 1.5L L15Z (2022–2026)"],["Pack","Each"],["Source listing","PakWheels #13048428"]],
    desc: "Aftermarket oil filter from Unbranded, listed for Honda City 1.2L L12B i-VTEC (2022–2026); Honda City 1.5L L15Z (2022–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-8196374", sku: "PW-8196374", oem: null, brand: "Suzuki Genuine", grade: "oem", title: "Suzuki Alto 660cc Oil Filter — Suzuki Genuine", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2450, unit: "Each", stock: 99, fits: ["suzuki-alto@2019-2023"], src: "https://www.pakwheels.com/accessories-spare-parts/suzuki-alto-660-cc-2019-2023-oil-filter-suzuki-genuine-165-8196374", img: "https://cache1.pakwheels.com/ad_pictures/8370/suzuki-alto-660-cc-2019-2023-suzuki-genuine-oil-filter-16510b67la0n000-83703887.webp", checked: "2026-10-04",
    specs: [["Brand","Suzuki Genuine"],["Listed fitment","Suzuki Alto 0.66L R06A (2019–2023)"],["Pack","Each"],["Source listing","PakWheels #8196374"]],
    desc: "Genuine / OEM oil filter from Suzuki Genuine, listed for Suzuki Alto 0.66L R06A (2019–2023). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-8196389", sku: "16510B67LA0N000", oem: "16510B67LA0N000", brand: "Suzuki Genuine", grade: "oem", title: "Suzuki Wagon R 2014-2023 Oil Filter — Suzuki Genuine", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2450, unit: "Each", stock: 99, fits: ["suzuki-wagonr@2014-2023"], src: "https://www.pakwheels.com/accessories-spare-parts/suzuki-wagon-r-2014-2023-suzuki-genuine-oil-filter-16510b-8196389", img: "https://cache1.pakwheels.com/ad_pictures/8370/suzuki-wagon-r-2014-2023-suzuki-genuine-oil-filter-16510b67la0n000-83704015.webp", checked: "2026-10-04",
    specs: [["Brand","Suzuki Genuine"],["Part no.","16510B67LA0N000"],["Listed fitment","Suzuki Wagon R 1.0L K10B (2014–2023)"],["Pack","Each"],["Source listing","PakWheels #8196389"]],
    desc: "Genuine / OEM oil filter from Suzuki Genuine, listed for Suzuki Wagon R 1.0L K10B (2014–2023). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10922301", sku: "16510-58M00", oem: null, brand: "GPT", grade: "performance", title: "GPT Oil Filter 16510-58M00 — Cultus / Wagon R", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 899, was: 1599, unit: "Each", stock: 99, fits: ["suzuki-cultus","suzuki-wagonr"], src: "https://www.pakwheels.com/accessories-spare-parts/suzuki-alto-cultuswagon-r-swiftcamber-pickup-old-oil-filter-gpt-16510-58m00-gto-932-10922301", img: "https://cache4.pakwheels.com/ad_pictures/1516/suzuki-alto-cultuswagon-r-swiftcamber-pickup-old-oil-filter-gpt-16510-58m00-gto-932-151600482.webp", checked: "2026-10-04",
    specs: [["Brand","GPT"],["Part no.","16510-58M00"],["Listed fitment","Suzuki Cultus 1.0L K10B (2017–2026); Suzuki Wagon R 1.0L K10B (2014–2026)"],["Pack","Each"],["Source listing","PakWheels #10922301"]],
    desc: "Aftermarket oil filter from GPT, listed for Suzuki Cultus 1.0L K10B (2017–2026); Suzuki Wagon R 1.0L K10B (2014–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13014860", sku: "PW-13014860", oem: null, brand: "Unbranded", grade: "performance", title: "Suzuki Swift New Oil Filter (2022-2026)", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 675, was: 750, unit: "Each", stock: 99, fits: ["suzuki-swift@2022-2026"], src: "https://www.pakwheels.com/accessories-spare-parts/suzuki-swift-new-oil-filter-2022-2026-13014860", img: "https://cache1.pakwheels.com/ad_pictures/1449/suzuki-swift-new-oil-filter-2022-2026-144947140.webp", checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Suzuki Swift 1.2L K12M (2022–2026)"],["Pack","Each"],["Source listing","PakWheels #13014860"]],
    desc: "Aftermarket oil filter from Unbranded, listed for Suzuki Swift 1.2L K12M (2022–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13048400", sku: "PW-13048400", oem: null, brand: "Unbranded", grade: "performance", title: "Kia Sportage Oil Filter", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2499, unit: "Each", stock: 99, fits: ["kia-sportage"], src: "https://www.pakwheels.com/accessories-spare-parts/kia-sportage-oil-filter-13048400", img: "https://cache4.pakwheels.com/ad_pictures/1453/kia-sportage-oil-filter-145357049.webp", checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","KIA Sportage 2.0L Nu MPi (2019–2026)"],["Pack","Each"],["Source listing","PakWheels #13048400"]],
    desc: "Aftermarket oil filter from Unbranded, listed for KIA Sportage 2.0L Nu MPi (2019–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10016915", sku: "PW-10016915", oem: null, brand: "Hyundai Genuine", grade: "oem", title: "Hyundai Tucson Genuine Oil Filter", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2400, unit: "Each", stock: 99, fits: ["hyundai-tucson"], src: "https://www.pakwheels.com/accessories-spare-parts/hyundai-tucson-genuine-oil-filter-10016915", img: "https://cache3.pakwheels.com/ad_pictures/1067/hyundai-tucson-genuine-oil-filter-106763472.webp", checked: "2026-10-04",
    specs: [["Brand","Hyundai Genuine"],["Listed fitment","Hyundai Tucson 2.0L Nu MPi (2020–2026)"],["Pack","Each"],["Source listing","PakWheels #10016915"]],
    desc: "Genuine / OEM oil filter from Hyundai Genuine, listed for Hyundai Tucson 2.0L Nu MPi (2020–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-11401806", sku: "PW-11401806", oem: null, brand: "VIC", grade: "performance", title: "KIA Picanto 2019-2025 Oil Filter — Made in Japan", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1950, unit: "Each", stock: 99, fits: ["kia-picanto@2019-2025"], src: "https://www.pakwheels.com/accessories-spare-parts/kia-picanto-2019-2025-vic-oil-filter-made-in-japan-11401806", img: "https://cache4.pakwheels.com/ad_pictures/1243/kia-picanto-2019-2025-vic-oil-filter-made-in-japan-124318360.webp", checked: "2026-10-04",
    specs: [["Brand","VIC"],["Listed fitment","KIA Picanto 1.0L Kappa (2019–2025)"],["Pack","Each"],["Source listing","PakWheels #11401806"]],
    desc: "Aftermarket oil filter from VIC, listed for KIA Picanto 1.0L Kappa (2019–2025). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-9084068", sku: "PW-9084068", oem: null, brand: "Guard Filters", grade: "performance", title: "Changan Alsvin Oil Filter", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 2150, unit: "Each", stock: 99, fits: ["changan-alsvin"], src: "https://www.pakwheels.com/accessories-spare-parts/changan-alsvin-oil-filter-guard-filters-9084068", img: "https://cache4.pakwheels.com/ad_pictures/9496/changan-alsvin-oil-filter-guard-filters-94968482.webp", checked: "2026-10-04",
    specs: [["Brand","Guard Filters"],["Listed fitment","Changan Alsvin 1.5L JL473Q (2021–2026)"],["Pack","Each"],["Source listing","PakWheels #9084068"]],
    desc: "Aftermarket oil filter from Guard Filters, listed for Changan Alsvin 1.5L JL473Q (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-9084058", sku: "PW-9084058", oem: null, brand: "Guard Filters", grade: "performance", title: "MG HS Oil Filter", category: "filters", sub: "Oil filters", art: "oilfilter", position: "na", price: 1799, unit: "Each", stock: 99, fits: ["mg-hs"], src: "https://www.pakwheels.com/accessories-spare-parts/mg-hs-oil-filter-guard-oem-filters-9084058", img: "https://cache3.pakwheels.com/ad_pictures/9496/mg-hs-oil-filter-guard-oem-filters-94968399.webp", checked: "2026-10-04",
    specs: [["Brand","Guard Filters"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Each"],["Source listing","PakWheels #9084058"]],
    desc: "Aftermarket oil filter from Guard Filters, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10016730", sku: "17801-0M020", oem: "17801-0M020", brand: "Toyota Genuine", grade: "oem", title: "Toyota Corolla 2009-2024 Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 5800, unit: "Each", stock: 99, fits: ["toyota-corolla-16@2015-2024","toyota-corolla-18@2015-2024"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-corolla-2009-2024-genuine-air-filter-17801-0m020-10016730", img: "https://cache3.pakwheels.com/ad_pictures/1516/toyota-corolla-2009-2024-genuine-air-filter-17801-0m020-151611387.webp", checked: "2026-10-04",
    specs: [["Brand","Toyota Genuine"],["Part no.","17801-0M020"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2024); Toyota Corolla 1.8L 2ZR-FE (2015–2024)"],["Pack","Each"],["Source listing","PakWheels #10016730"]],
    desc: "Genuine / OEM air filter from Toyota Genuine, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2024); Toyota Corolla 1.8L 2ZR-FE (2015–2024). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10894374", sku: "17801-0M020", oem: null, brand: "GPT", grade: "performance", title: "GPT Air Filter 17801-0M020 — Corolla 2009-2026", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 1199, was: 2000, unit: "Each", stock: 99, fits: ["toyota-corolla-16@2015-2026","toyota-corolla-18@2015-2026"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-corolla-new-2009-2024-air-filter-gpt-17801-0m020-gpta-21013-10894374", img: "https://cache2.pakwheels.com/ad_pictures/1515/toyota-corolla-new-2009-2024-air-filter-gpt-17801-0m020-gpta-21013-151598493.webp", checked: "2026-10-04",
    specs: [["Brand","GPT"],["Part no.","17801-0M020"],["Listed fitment","Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026)"],["Pack","Each"],["Source listing","PakWheels #10894374"]],
    desc: "Aftermarket air filter from GPT, listed for Toyota Corolla 1.6L 1ZR-FE (2015–2026); Toyota Corolla 1.8L 2ZR-FE (2015–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13186951", sku: "17801-0L040", oem: null, brand: "Imported (OEM-spec)", grade: "performance", title: "Fortuner / Hilux Revo Engine Air Filter 17801-0L040", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 3229, was: 3450, unit: "Each", stock: 99, fits: ["toyota-fortuner-27","toyota-fortuner-28","toyota-hilux-28"], src: "https://www.pakwheels.com/accessories-spare-parts/imported-toyota-fortuner-hilux-and-revo-engine-air-filter-oem-17801-0l040-premium-high-performanc-13186951", img: "https://cache3.pakwheels.com/ad_pictures/1470/imported-toyota-fortuner-hilux-and-revo-engine-air-filter-oem-17801-0l040-premium-high-performanc-147065703.webp", checked: "2026-10-04",
    specs: [["Brand","Imported (OEM-spec)"],["Part no.","17801-0L040"],["Listed fitment","Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026)"],["Pack","Each"],["Source listing","PakWheels #13186951"]],
    desc: "Aftermarket air filter from Imported (OEM-spec), listed for Toyota Fortuner 2.7L 2TR-FE petrol (2016–2026); Toyota Fortuner 2.8L 1GD-FTV diesel (2016–2026); Toyota Hilux Revo 2.8L 1GD-FTV diesel (2016–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10452508", sku: "PW-10452508", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Civic X 1.5 Turbo Air Filter Genuine", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 5000, unit: "Each", stock: 99, fits: ["honda-civic-15t@2016-2021"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-civic-x-15-air-filter-genuine-10452508", img: "https://cache2.pakwheels.com/ad_pictures/1123/honda-civic-x-15-air-filter-genuine-112339745.webp", checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda Civic 1.5L L15B7 VTEC Turbo (2016–2021)"],["Pack","Each"],["Source listing","PakWheels #10452508"]],
    desc: "Genuine / OEM air filter from Honda Genuine, listed for Honda Civic 1.5L L15B7 VTEC Turbo (2016–2021). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-9944505", sku: "PW-9944505", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Civic 1.8 2017-2021 Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 6500, unit: "Each", stock: 99, fits: ["honda-civic-18@2017-2021"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-civic-2017-2021-genuine-air-filter-9944505", img: "https://cache1.pakwheels.com/ad_pictures/1496/honda-civic-2017-2021-genuine-air-filter-149612771.webp", checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda Civic 1.8L R18Z i-VTEC (2017–2021)"],["Pack","Each"],["Source listing","PakWheels #9944505"]],
    desc: "Genuine / OEM air filter from Honda Genuine, listed for Honda Civic 1.8L R18Z i-VTEC (2017–2021). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-9944590", sku: "PW-9944590", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Civic 2022-2024 Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 5500, unit: "Each", stock: 99, fits: ["honda-civic-15t@2022-2024"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-civic-2022-2024-genuine-air-filter-9944590", img: "https://cache4.pakwheels.com/ad_pictures/1058/honda-civic-2022-2024-genuine-air-filter-105827014.webp", checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda Civic 1.5L L15B7 VTEC Turbo (2022–2024)"],["Pack","Each"],["Source listing","PakWheels #9944590"]],
    desc: "Genuine / OEM air filter from Honda Genuine, listed for Honda Civic 1.5L L15B7 VTEC Turbo (2022–2024). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-9944635", sku: "PW-9944635", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda BR-V 2017-2024 Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 5500, unit: "Each", stock: 99, fits: ["honda-brv@2017-2024"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-brv-2017-2024-genuine-air-filter-9944635", img: "https://cache2.pakwheels.com/ad_pictures/1496/honda-brv-2017-2024-genuine-air-filter-149610576.webp", checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Honda BR-V 1.5L L15Z i-VTEC (2017–2024)"],["Pack","Each"],["Source listing","PakWheels #9944635"]],
    desc: "Genuine / OEM air filter from Honda Genuine, listed for Honda BR-V 1.5L L15Z i-VTEC (2017–2024). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-5632599", sku: "PW-5632599", oem: null, brand: "KIA Genuine", grade: "oem", title: "Kia Picanto Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 2901, was: 3000, unit: "Each", stock: 99, fits: ["kia-picanto"], src: "https://www.pakwheels.com/accessories-spare-parts/kia-picanto-genuine-air-filter-5632599", img: "https://cache4.pakwheels.com/ad_pictures/5170/kia-picanto-genuine-air-filter-51701254.jpg", checked: "2026-10-04",
    specs: [["Brand","KIA Genuine"],["Listed fitment","KIA Picanto 1.0L Kappa (2019–2026)"],["Pack","Each"],["Source listing","PakWheels #5632599"]],
    desc: "Genuine / OEM air filter from KIA Genuine, listed for KIA Picanto 1.0L Kappa (2019–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10016858", sku: "PW-10016858", oem: null, brand: "Hyundai Genuine", grade: "oem", title: "Hyundai Tucson Genuine Air Filter", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 4950, unit: "Each", stock: 99, fits: ["hyundai-tucson"], src: "https://www.pakwheels.com/accessories-spare-parts/hyundai-tucson-genuine-air-filter-10016858", img: "https://cache4.pakwheels.com/ad_pictures/1067/hyundai-tucson-genuine-air-filter-106762582.webp", checked: "2026-10-04",
    specs: [["Brand","Hyundai Genuine"],["Listed fitment","Hyundai Tucson 2.0L Nu MPi (2020–2026)"],["Pack","Each"],["Source listing","PakWheels #10016858"]],
    desc: "Genuine / OEM air filter from Hyundai Genuine, listed for Hyundai Tucson 2.0L Nu MPi (2020–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-12877681", sku: "PW-12877681", oem: null, brand: "Changan OEM", grade: "oem", title: "Changan Alsvin Air Filter OEM", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 5399, was: 5999, unit: "Each", stock: 99, fits: ["changan-alsvin"], src: "https://www.pakwheels.com/accessories-spare-parts/changan-alsvin-air-filter-oem-new-12877681", img: "https://cache1.pakwheels.com/ad_pictures/1432/changan-alsvin-air-filter-oem-new-143223120.webp", checked: "2026-10-04",
    specs: [["Brand","Changan OEM"],["Listed fitment","Changan Alsvin 1.5L JL473Q (2021–2026)"],["Pack","Each"],["Source listing","PakWheels #12877681"]],
    desc: "Genuine / OEM air filter from Changan OEM, listed for Changan Alsvin 1.5L JL473Q (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10929023", sku: "PW-10929023", oem: null, brand: "MG OEM", grade: "oem", title: "MG HS Air Filter OEM", category: "filters", sub: "Air filters", art: "airfilter", position: "na", price: 2500, unit: "Each", stock: 99, fits: ["mg-hs"], src: "https://www.pakwheels.com/accessories-spare-parts/mg-hs-air-filter-oem-10929023", img: "https://cache4.pakwheels.com/ad_pictures/1183/mg-hs-air-filter-oem-118346660.webp", checked: "2026-10-04",
    specs: [["Brand","MG OEM"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Each"],["Source listing","PakWheels #10929023"]],
    desc: "Genuine / OEM air filter from MG OEM, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-8074614", sku: "AC-101", oem: null, brand: "Leppon", grade: "performance", title: "Leppon AC Cabin Filter AC-101 — Yaris 2020-2023", category: "filters", sub: "Cabin filters", art: "airfilter", position: "na", price: 1649, unit: "Each", stock: 99, fits: ["toyota-yaris-13@2020-2023"], src: "https://www.pakwheels.com/accessories-spare-parts/toyota-yaris-2020-2023-leppon-ac-cabin-filter-ac-101-8074614", img: "https://cache2.pakwheels.com/ad_pictures/8217/toyota-yaris-2020-2023-leppon-ac-cabin-filter-ac-101-82178574.webp", checked: "2026-10-04",
    specs: [["Brand","Leppon"],["Part no.","AC-101"],["Listed fitment","Toyota Yaris 1.3L 2NR-FE (2020–2023)"],["Pack","Each"],["Source listing","PakWheels #8074614"]],
    desc: "Aftermarket cabin filter from Leppon, listed for Toyota Yaris 1.3L 2NR-FE (2020–2023). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-11616486", sku: "PW-11616486", oem: null, brand: "Unbranded", grade: "performance", title: "Suzuki Alto 660 Cabin AC Filter", category: "filters", sub: "Cabin filters", art: "airfilter", position: "na", price: 1999, was: 2500, unit: "Each", stock: 99, fits: ["suzuki-alto"], src: "https://www.pakwheels.com/accessories-spare-parts/suzuki-alto-660-cabin-filter-ac-filter-11616486", img: "https://cache4.pakwheels.com/ad_pictures/1270/suzuki-alto-660-cabin-filter-ac-filter-127017604.webp", checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Suzuki Alto 0.66L R06A (2019–2026)"],["Pack","Each"],["Source listing","PakWheels #11616486"]],
    desc: "Aftermarket cabin filter from Unbranded, listed for Suzuki Alto 0.66L R06A (2019–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13034890", sku: "PW-13034890", oem: null, brand: "Unbranded", grade: "performance", title: "Hyundai Tucson 2020-2025 Cabin Filter — Carbon Active", category: "filters", sub: "Cabin filters", art: "airfilter", position: "na", price: 2250, unit: "Each", stock: 99, fits: ["hyundai-tucson@2020-2025"], src: "https://www.pakwheels.com/accessories-spare-parts/hyundai-tucson-2020-2025-cabin-filter-carbon-active-13034890", img: "https://cache4.pakwheels.com/ad_pictures/1451/hyundai-tucson-2020-2025-cabin-filter-carbon-active-145190771.webp", checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Hyundai Tucson 2.0L Nu MPi (2020–2025)"],["Pack","Each"],["Source listing","PakWheels #13034890"]],
    desc: "Aftermarket cabin filter from Unbranded, listed for Hyundai Tucson 2.0L Nu MPi (2020–2025). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-12876864", sku: "PW-12876864", oem: null, brand: "Changan OEM", grade: "oem", title: "Changan Alsvin AC Filter Genuine", category: "filters", sub: "Cabin filters", art: "airfilter", position: "na", price: 4199, was: 5999, unit: "Each", stock: 99, fits: ["changan-alsvin"], src: "https://www.pakwheels.com/accessories-spare-parts/changan-alsvin-ac-filter-genuine-new-12876864", img: "https://cache1.pakwheels.com/ad_pictures/1432/changan-alsvin-ac-filter-genuine-new-143212077.webp", checked: "2026-10-04",
    specs: [["Brand","Changan OEM"],["Listed fitment","Changan Alsvin 1.5L JL473Q (2021–2026)"],["Pack","Each"],["Source listing","PakWheels #12876864"]],
    desc: "Genuine / OEM cabin filter from Changan OEM, listed for Changan Alsvin 1.5L JL473Q (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10008506", sku: "PW-10008506", oem: null, brand: "Toyota Genuine", grade: "oem", title: "Toyota Taglon Supreme 0W-20 Engine Oil 4.2L", category: "oils", sub: "Engine oil", art: "fluid", position: "na", price: 10000, unit: "4.2 L", stock: 99, fits: ["universal"], src: "https://www.pakwheels.com/accessories-spare-parts/engine-oil-toyota-taglon-supreme-0w20-genuine-42ltr-10008506", img: "https://cache2.pakwheels.com/ad_pictures/1066/engine-oil-toyota-taglon-supreme-0w20-genuine-42ltr-106658073.webp", checked: "2026-10-04",
    specs: [["Brand","Toyota Genuine"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","4.2 L"],["Source listing","PakWheels #10008506"]],
    desc: "Toyota Taglon Supreme 0W-20 Engine Oil 4.2L from Toyota Genuine. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying. Price as listed on PakWheels Auto Store."
  },
  {
    id: "pw-8199297", sku: "PW-8199297", oem: null, brand: "Honda Genuine", grade: "oem", title: "Honda Genuine 0W-20 SP Engine Oil 3.7L", category: "oils", sub: "Engine oil", art: "fluid", position: "na", price: 10120, unit: "3.7 L", stock: 99, fits: ["universal"], src: "https://www.pakwheels.com/accessories-spare-parts/honda-genuine-0w20-sp-engine-oil-37-litre-8199297", img: "https://cache2.pakwheels.com/ad_pictures/8374/honda-genuine-0w20-sp-engine-oil-37-litre-83740408.webp", checked: "2026-10-04",
    specs: [["Brand","Honda Genuine"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","3.7 L"],["Source listing","PakWheels #8199297"]],
    desc: "Honda Genuine 0W-20 SP Engine Oil 3.7L from Honda Genuine. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying. Price as listed on PakWheels Auto Store."
  },
  {
    id: "pw-8901846", sku: "PW-8901846", oem: null, brand: "Suzuki Genuine", grade: "oem", title: "Suzuki Ecstar F9000 0W-20 Engine Oil 3.1L", category: "oils", sub: "Engine oil", art: "fluid", position: "na", price: 6950, unit: "3.1 L", stock: 99, fits: ["universal"], src: "https://www.pakwheels.com/accessories-spare-parts/suzuki-genuine-oil-super-efficient-0w20-sn-engine-oil-sgo-3-litre-8901846", img: "https://cache2.pakwheels.com/ad_pictures/1012/suzuki-genuine-oil-super-efficient-0w20-sn-engine-oil-sgo-3-litre-101213629.webp", checked: "2026-10-04",
    specs: [["Brand","Suzuki Genuine"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","3.1 L"],["Source listing","PakWheels #8901846"]],
    desc: "Suzuki Ecstar F9000 0W-20 Engine Oil 3.1L from Suzuki Genuine. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying. Price as listed on PakWheels Auto Store."
  },
  {
    id: "pw-10702418", sku: "PW-10702418", oem: null, brand: "Valvoline", grade: "performance", title: "Valvoline 0W-20 Engine Oil 4L", category: "oils", sub: "Engine oil", art: "fluid", position: "na", price: 10700, unit: "4 L", stock: 99, fits: ["universal"], src: "https://www.pakwheels.com/accessories-spare-parts/engine-oil-valvoline-0w20-4ltr-10702418", img: "https://cache4.pakwheels.com/ad_pictures/1154/engine-oil-valvoline-0w20-4ltr-115494492.webp", checked: "2026-10-04",
    specs: [["Brand","Valvoline"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","4 L"],["Source listing","PakWheels #10702418"]],
    desc: "Valvoline 0W-20 Engine Oil 4L from Valvoline. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying. Price as listed on PakWheels Auto Store."
  },
  {
    id: "pw-12231935", sku: "PW-12231935", oem: null, brand: "Flamingo", grade: "performance", title: "Flamingo Radiator Coolant 5L — Green", category: "oils", sub: "Coolant", art: "coolant", position: "na", price: 2499, was: 3499, unit: "5 L", stock: 99, fits: ["universal"], src: "https://www.pakwheels.com/accessories-spare-parts/flamingo-coolant-5l-green-12231935", img: "https://cache1.pakwheels.com/ad_pictures/1348/flamingo-coolant-5l-green-134895838.webp", checked: "2026-10-04",
    specs: [["Brand","Flamingo"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","5 L"],["Source listing","PakWheels #12231935"]],
    desc: "Flamingo Radiator Coolant 5L — Green from Flamingo. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying. Price as listed on PakWheels Auto Store."
  },
  {
    id: "pw-5970629", sku: "PW-5970629", oem: null, brand: "NASA", grade: "performance", title: "NASA Radiator Coolant Super Red 1L", category: "oils", sub: "Coolant", art: "coolant", position: "na", price: 699, was: 999, unit: "1 L", stock: 99, fits: ["universal"], src: "https://www.pakwheels.com/accessories-spare-parts/nasa-radiator-coolant-super-quality-red-1-litre-5970629", img: "https://cache3.pakwheels.com/ad_pictures/1132/nasa-radiator-coolant-super-quality-red-1-litre-113212584.webp", checked: "2026-10-04",
    specs: [["Brand","NASA"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","1 L"],["Source listing","PakWheels #5970629"]],
    desc: "NASA Radiator Coolant Super Red 1L from NASA. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying. Price as listed on PakWheels Auto Store."
  },
  {
    id: "pw-12999923", sku: "PW-12999923", oem: null, brand: "MG OEM", grade: "oem", title: "MG HS Spark Plug Genuine", category: "engine", sub: "Spark plugs", art: "plug", position: "na", price: 5000, unit: "Each", stock: 99, fits: ["mg-hs"], src: "https://www.pakwheels.com/accessories-spare-parts/mg-hs-spark-plug-geniune-12999923", img: "https://cache3.pakwheels.com/ad_pictures/1447/mg-hs-spark-plug-geniune-144764057.webp", checked: "2026-10-04",
    specs: [["Brand","MG OEM"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Each"],["Source listing","PakWheels #12999923"]],
    desc: "Genuine / OEM spark plug from MG OEM, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10444501", sku: "PW-10444501", oem: null, brand: "Unbranded", grade: "performance", title: "Changan Alsvin Belt Tensioner", category: "engine", sub: "Belts & tensioners", art: "belt", position: "na", price: 12000, was: 12999, unit: "Each", stock: 99, fits: ["changan-alsvin"], src: "https://www.pakwheels.com/accessories-spare-parts/changan-alsvin-tensioner-10444501", img: "https://cache3.pakwheels.com/ad_pictures/1122/changan-alsvin-tensioner-112237397.webp", checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","Changan Alsvin 1.5L JL473Q (2021–2026)"],["Pack","Each"],["Source listing","PakWheels #10444501"]],
    desc: "Aftermarket belts & tensioner from Unbranded, listed for Changan Alsvin 1.5L JL473Q (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-11755610", sku: "PW-11755610", oem: null, brand: "Koyorad", grade: "performance", title: "Koyorad Radiator for Honda BR-V", category: "cooling", sub: "Radiators", art: "radiator", position: "na", price: 36000, unit: "Each", stock: 99, fits: ["honda-brv"], src: "https://www.pakwheels.com/accessories-spare-parts/koyorad-radiator-for-honda-brv-11755610", img: "https://cache2.pakwheels.com/ad_pictures/1288/koyorad-radiator-for-honda-brv-128802195.webp", checked: "2026-10-04",
    specs: [["Brand","Koyorad"],["Listed fitment","Honda BR-V 1.5L L15Z i-VTEC (2017–2026)"],["Pack","Each"],["Source listing","PakWheels #11755610"]],
    desc: "Aftermarket radiator from Koyorad, listed for Honda BR-V 1.5L L15Z i-VTEC (2017–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-11863170", sku: "PW-11863170", oem: null, brand: "Unbranded", grade: "performance", title: "MG HS Water Pump", category: "cooling", sub: "Water pumps", art: "pump", position: "na", price: 20000, unit: "Each", stock: 99, fits: ["mg-hs"], src: "https://www.pakwheels.com/accessories-spare-parts/mg-hs-water-pump-11863170", img: "https://cache3.pakwheels.com/ad_pictures/1301/mg-hs-water-pump-130192597.webp", checked: "2026-10-04",
    specs: [["Brand","Unbranded"],["Listed fitment","MG HS 1.5L Turbo 15E4E (2021–2026)"],["Pack","Each"],["Source listing","PakWheels #11863170"]],
    desc: "Aftermarket water pump from Unbranded, listed for MG HS 1.5L Turbo 15E4E (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-10685507", sku: "PW-10685507", oem: null, brand: "Changan OEM", grade: "oem", title: "Changan Alsvin Oxygen Sensor OEM", category: "electrical", sub: "Sensors", art: "sensor", position: "na", price: 9960, was: 12000, unit: "Each", stock: 99, fits: ["changan-alsvin"], src: "https://www.pakwheels.com/accessories-spare-parts/changan-alsvin-oxygen-sensor-oem-10685507", img: "https://cache1.pakwheels.com/ad_pictures/1152/changan-alsvin-oxygen-sensor-oem-115277385.webp", checked: "2026-10-04",
    specs: [["Brand","Changan OEM"],["Listed fitment","Changan Alsvin 1.5L JL473Q (2021–2026)"],["Pack","Each"],["Source listing","PakWheels #10685507"]],
    desc: "Genuine / OEM sensor from Changan OEM, listed for Changan Alsvin 1.5L JL473Q (2021–2026). Price as listed on PakWheels Auto Store; confirm against your old part number before fitting."
  },
  {
    id: "pw-13504574", sku: "PW-13504574", oem: null, brand: "AGS", grade: "performance", title: "AGS Battery 38A — 11 Plate", category: "electrical", sub: "Batteries", art: "battery", position: "na", price: 6500, unit: "Each", stock: 99, fits: ["universal"], src: "https://www.pakwheels.com/accessories-spare-parts/ags-battery-38a-11-plate-13504574", img: "https://cache2.pakwheels.com/ad_pictures/1509/ags-battery-38a-11-plate-150959586.webp", checked: "2026-10-04",
    specs: [["Brand","AGS"],["Listed fitment","Universal — match the spec to your owner’s manual"],["Pack","Each"],["Source listing","PakWheels #13504574"]],
    desc: "AGS Battery 38A — 11 Plate from AGS. Not vehicle-specific — check the grade or spec your owner’s manual calls for before buying. Price as listed on PakWheels Auto Store."
  }
];
