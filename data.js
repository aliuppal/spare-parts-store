/* ApexAuto catalog — SAMPLE DATA for the demo storefront (Pakistan market).
   Prices (PKR), stock, ratings and part numbers are illustrative, not real listings.
   `fits` holds vehicle ids from VEHICLES, or the string "universal". */

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
  {"id":"brakes","name":"Brakes & Rotors"},
  {"id":"suspension","name":"Suspension"},
  {"id":"engine","name":"Engine & Ignition"},
  {"id":"filters","name":"Filters & Fluids"},
  {"id":"cooling","name":"Cooling"},
  {"id":"electrical","name":"Electrical"},
  {"id":"exhaust","name":"Exhaust"}
];

window.PRODUCTS = [
  {
    id: "p-001", sku: "BRM-09.C892.11", oem: "45251-TBA-A01", brand: "Brembo", grade: "performance", title: "Brembo GT-S Drilled Front 2-Piece Brake Rotor Kit", category: "brakes", sub: "Rotors", art: "rotor", position: "front", price: 120399, was: 136899, unit: "Per axle pair", rating: 4.9, reviews: 128, stock: 8, shipsToday: true, fits: ["honda-civic-15t","toyota-corolla-18"],
    specs: [["Diameter","300 mm"],["Thickness","28 mm"],["Material","High-carbon cast iron"],["Vane design","Bi-directional curved, 36 vanes"],["Hat finish","Black anodized aluminium"]],
    desc: "Two-piece floating rotors with a cross-drilled friction ring that sheds heat on repeated hard stops — think Murree or Kaghan descents. Direct bolt-on for the Civic 1.5 Turbo and Corolla Altis Grande; no caliper spacers required."
  },
  {
    id: "p-002", sku: "PS-Z26-1504", oem: "45022-TBA-A01", brand: "PowerStop", grade: "performance", title: "PowerStop Z26 Carbon-Fiber Ceramic Brake Pad Set (Front & Rear)", category: "brakes", sub: "Pads", art: "pads", position: "both", price: 46099, unit: "Front + rear set", rating: 4.8, reviews: 312, stock: 24, shipsToday: true, freeNextDay: true, fits: ["honda-civic-18","honda-civic-15t","honda-city-15","honda-brv"],
    specs: [["Compound","Carbon-fiber ceramic, low dust"],["Hardware","Stainless shims included"],["Max operating temp","1,500 °F"],["Wear sensor","Not included — reuse OE"]],
    desc: "Street-performance pad with a carbon-fiber reinforced ceramic compound. Quiet at idle, stable bite when warm, and noticeably less wheel dust than OE semi-metallic pads."
  },
  {
    id: "p-003", sku: "BOS-QC-50011", oem: "42431-02240", brand: "Bosch", grade: "oem", title: "Bosch QuietCast Premium Coated Rear Disc Brake Rotor", category: "brakes", sub: "Rotors", art: "rotor-plain", position: "rear", price: 33299, unit: "Each", rating: 4.7, reviews: 89, stock: 15, shipsToday: true, fits: ["toyota-corolla-16","toyota-corolla-18"],
    specs: [["Diameter","270 mm solid"],["Balancing","100% precision balanced"],["Coating","Al-Zn anti-corrosion"],["Min. thickness","9.0 mm"]],
    desc: "OE-equivalent rear rotor with a full anti-corrosion coating, so it stays clean through monsoon season and behind open-spoke alloys."
  },
  {
    id: "p-004", sku: "ST-950.34503", oem: null, brand: "StopTech", grade: "performance", title: "StopTech Stainless Steel Braided Brake Line Kit (4-Corner)", category: "brakes", sub: "Lines & Hoses", art: "lines", position: "both", price: 39799, unit: "Complete set", rating: 4.9, reviews: 74, stock: 3, shipsToday: true, fits: ["honda-civic-18","honda-civic-15t","toyota-corolla-18"],
    specs: [["Core hose","Extruded PTFE inner tube"],["Outer braid","304 stainless weave"],["Fittings","Zinc-plated steel banjo"],["Compliance","DOT FMVSS 106"]],
    desc: "Replaces the rubber flex hoses at all four corners. Eliminates line expansion for a firmer, more consistent pedal on track days."
  },
  {
    id: "p-005", sku: "AKE-EUR1505", oem: "04465-02220", brand: "Akebono", grade: "oem", title: "Akebono EURO Ultra-Premium Ceramic Front Brake Pads", category: "brakes", sub: "Pads", art: "pads", position: "front", price: 25199, unit: "Front axle", rating: 4.8, reviews: 204, stock: 19, fits: ["toyota-corolla-16","toyota-corolla-18","toyota-yaris-13"],
    specs: [["Compound","Ultra-premium ceramic"],["Rotor wear","Very low"],["Noise control","OE-level acoustic shims"],["Dust","Ultra-low"]],
    desc: "The daily-driver pick: quiet, clean and gentle on rotors, with pedal feel close to the factory pad."
  },
  {
    id: "p-006", sku: "BIL-24-275226", oem: null, brand: "Bilstein", grade: "performance", title: "Bilstein B8 Performance Plus Monotube Front Shock Absorber", category: "suspension", sub: "Shocks & Struts", art: "shock", position: "front", price: 80899, unit: "Per unit", rating: 5, reviews: 46, stock: 6, fits: ["honda-civic-18","honda-civic-15t"],
    specs: [["Design","46 mm inverted monotube"],["Application","Lowered Civic (up to 30 mm)"],["Valving","Vehicle-specific digressive"],["Warranty","Limited lifetime"]],
    desc: "Shortened-stroke monotube built for cars on lowering springs. Keeps full bump travel and controls rebound that OE dampers can't handle."
  },
  {
    id: "p-007", sku: "EIB-E10-20-012", oem: null, brand: "Eibach", grade: "performance", title: "Eibach Pro-Kit Performance Lowering Springs", category: "suspension", sub: "Springs", art: "spring", position: "both", price: 92099, unit: "Set of 4", rating: 4.6, reviews: 158, stock: 11, shipsToday: true, fits: ["honda-civic-18","honda-civic-15t"],
    specs: [["Drop (front)","1.0 in"],["Drop (rear)","1.4 in"],["Rate type","Progressive"],["Finish","Powder coat"]],
    desc: "A modest drop that tightens the stance without scraping on speed breakers. Pairs with stock or performance dampers."
  },
  {
    id: "p-008", sku: "MOOG-K750118", oem: "43330-09510", brand: "Moog", grade: "oem", title: "Moog Problem Solver Front Lower Ball Joint", category: "suspension", sub: "Ball Joints", art: "balljoint", position: "front", price: 15299, unit: "Each", rating: 4.5, reviews: 391, stock: 42, shipsToday: true, fits: ["toyota-fortuner-28","toyota-hilux-28","toyota-fortuner-27"],
    specs: [["Type","Press-in, greaseable"],["Bearing","Powdered-metal gusher"],["Boot","Polyurethane"],["Torque (castle nut)","85 ft-lb"]],
    desc: "Greaseable replacement for the sealed factory joint — a common wear item on Hilux and Fortuner driven on rough roads. The gusher bearing keeps fresh grease where it is needed."
  },
  {
    id: "p-009", sku: "NGK-97968", oem: "90919-01253", brand: "NGK", grade: "oem", title: "NGK Laser Iridium Spark Plug", category: "engine", sub: "Spark Plugs", art: "plug", position: "na", price: 4899, unit: "Each — engine takes 4", rating: 4.9, reviews: 512, stock: 240, shipsToday: true, fits: ["toyota-corolla-16","toyota-corolla-18","toyota-yaris-13"],
    specs: [["Gap (pre-set)","0.043 in / 1.1 mm"],["Thread","M12 × 1.25"],["Reach","26.5 mm"],["Hex","14 mm bi-hex"]],
    desc: "OE-supplier plug for Toyota ZR and NR engines. Pre-gapped — do not adjust. Replace every 60,000 km."
  },
  {
    id: "p-010", sku: "BOS-0221504470", oem: "33400-84M00", brand: "Bosch", grade: "oem", title: "Bosch Ignition Coil Pack", category: "engine", sub: "Ignition Coils", art: "coil", position: "na", price: 13699, was: 15699, unit: "Each", rating: 4.7, reviews: 233, stock: 0, fits: ["suzuki-cultus","suzuki-wagonr","suzuki-swift"],
    specs: [["Output","40 kV"],["Connector","3-pin"],["Boot length","102 mm"]],
    desc: "Genuine-spec coil for Suzuki K-series engines. A misfire that follows a coil when swapped between cylinders is the classic sign it is time."
  },
  {
    id: "p-011", sku: "GAT-K060923", oem: "90916-02706", brand: "Gates", grade: "oem", title: "Gates Micro-V Serpentine Belt", category: "engine", sub: "Belts", art: "belt", position: "na", price: 10899, unit: "Each", rating: 4.8, reviews: 177, stock: 33, shipsToday: true, fits: ["toyota-fortuner-28","toyota-hilux-28"],
    specs: [["Ribs","6"],["Effective length","92.4 in"],["Material","EPDM"]],
    desc: "EPDM belt that wears evenly and stays quiet. Check the tensioner arm travel when replacing."
  },
  {
    id: "p-012", sku: "MAN-HU6020Z", oem: "15400-RTA-003", brand: "Mann-Filter", grade: "oem", title: "Mann-Filter Spin-On Oil Filter", category: "filters", sub: "Oil Filters", art: "oilfilter", position: "na", price: 4199, unit: "Each", rating: 4.9, reviews: 846, stock: 310, shipsToday: true, fits: ["honda-civic-18","honda-civic-15t","honda-city-12","honda-city-15","honda-brv"],
    specs: [["Type","Spin-on, anti-drain-back valve"],["Includes","Sealing gasket"],["Change interval","5,000 km"]],
    desc: "Factory-spec spin-on filter for Honda engines. Change it with every oil service."
  },
  {
    id: "p-013", sku: "KN-33-2481", oem: null, brand: "K&N", grade: "performance", title: "K&N Washable High-Flow Panel Air Filter", category: "filters", sub: "Air Filters", art: "airfilter", position: "na", price: 19599, unit: "Each", rating: 4.6, reviews: 402, stock: 27, shipsToday: true, fits: ["honda-civic-18","honda-civic-15t"],
    specs: [["Media","Oiled cotton gauze"],["Service interval","Up to 50,000 mi"],["Dimensions","10.6 × 8.1 × 1.6 in"]],
    desc: "Drop-in replacement for the paper element. Clean and re-oil it instead of buying a new filter."
  },
  {
    id: "p-014", sku: "FRAM-CF10285", oem: null, brand: "FRAM", grade: "oem", title: "FRAM Fresh Breeze Cabin Air Filter with Arm & Hammer", category: "filters", sub: "Cabin Filters", art: "airfilter", position: "na", price: 5999, unit: "Each", rating: 4.5, reviews: 1290, stock: 96, shipsToday: true, fits: ["toyota-corolla-16","toyota-corolla-18","toyota-yaris-13","honda-city-12","honda-city-15","honda-civic-18","honda-civic-15t","kia-sportage","hyundai-tucson","changan-alsvin","mg-hs"],
    specs: [["Media","Baking-soda activated"],["Change interval","12,000 mi"],["Install","Behind glovebox, no tools"]],
    desc: "Traps dust and pollen and neutralises odours before they reach the cabin — worth changing more often in dusty summers."
  },
  {
    id: "p-015", sku: "MOB-124316", oem: null, brand: "Mobil 1", grade: "oem", title: "Mobil 1 Extended Performance 0W-20 Full Synthetic (4 L)", category: "filters", sub: "Fluids", art: "fluid", position: "na", price: 10399, unit: "4 L pack", rating: 4.9, reviews: 2210, stock: 500, shipsToday: true, fits: ["universal"],
    specs: [["Viscosity","0W-20"],["Approvals","API SP, ILSAC GF-6A"],["Volume","4 L"]],
    desc: "Universal fitment — confirm the viscosity in your owner's manual before ordering."
  },
  {
    id: "p-016", sku: "CSF-7090", oem: "16400-0T040", brand: "CSF", grade: "performance", title: "CSF High-Performance All-Aluminium Radiator", category: "cooling", sub: "Radiators", art: "radiator", position: "na", price: 111699, unit: "Each", rating: 4.7, reviews: 63, stock: 4, fits: ["toyota-corolla-16","toyota-corolla-18"],
    specs: [["Core","2-row, 40 mm"],["Construction","TIG-welded aluminium"],["Fitment","Direct, reuses OE fans"]],
    desc: "Higher-capacity core for hot summers and stop-start city traffic. Drops coolant temps under sustained load."
  },
  {
    id: "p-017", sku: "AIS-WPT-190", oem: "16100-39466", brand: "Aisin", grade: "oem", title: "Aisin Engine Water Pump with Gasket", category: "cooling", sub: "Water Pumps", art: "pump", position: "na", price: 31499, unit: "Each", rating: 4.8, reviews: 140, stock: 13, shipsToday: true, fits: ["toyota-corolla-16","toyota-corolla-18"],
    specs: [["Impeller","Cast iron"],["Includes","Gasket"],["Supplier","OE supplier"]],
    desc: "OE-supplier pump. Replace the thermostat at the same time while the system is drained."
  },
  {
    id: "p-018", sku: "MIS-TH-180", oem: null, brand: "Mishimoto", grade: "performance", title: "Mishimoto Racing Thermostat 160 °F", category: "cooling", sub: "Thermostats", art: "thermostat", position: "na", price: 12599, unit: "Each", rating: 4.4, reviews: 58, stock: 0, fits: ["honda-civic-15t","mg-hs"],
    specs: [["Opening temp","160 °F / 71 °C"],["Seal","Viton gasket"]],
    desc: "Lower-temperature thermostat for tuned turbo engines. Expect slower warm-up in northern winters."
  },
  {
    id: "p-019", sku: "ODY-94R-850", oem: null, brand: "Odyssey", grade: "performance", title: "Odyssey Performance AGM Battery Group 94R", category: "electrical", sub: "Batteries", art: "battery", position: "na", price: 69999, unit: "Each + Rs 6,200 core", rating: 4.8, reviews: 377, stock: 9, core: 6200, fits: ["toyota-fortuner-28","toyota-hilux-28","toyota-fortuner-27","kia-sportage","hyundai-tucson"],
    specs: [["Group","94R / H7"],["CCA","850 A"],["Reserve capacity","140 min"],["Chemistry","AGM"]],
    desc: "Heavy-duty AGM battery for pickups and SUVs with high electrical load. A refundable Rs 6,200 core charge applies until the old battery is returned."
  },
  {
    id: "p-020", sku: "DEN-210-0812", oem: "27060-0L050", brand: "Denso", grade: "oem", title: "Denso Remanufactured Alternator 130 A", category: "electrical", sub: "Alternators", art: "alternator", position: "na", price: 80099, unit: "Each + Rs 12,600 core", rating: 4.6, reviews: 92, stock: 5, core: 12600, fits: ["toyota-fortuner-28","toyota-hilux-28"],
    specs: [["Output","130 A"],["Voltage","12 V"],["Pulley","6-groove clutch"],["Condition","Remanufactured, tested"]],
    desc: "Fully remanufactured to OE spec and load-tested before shipping."
  },
  {
    id: "p-021", sku: "BOS-15734", oem: null, brand: "Bosch", grade: "oem", title: "Bosch Premium Oxygen Sensor (Upstream)", category: "electrical", sub: "Sensors", art: "sensor", position: "na", price: 22399, unit: "Each", rating: 4.7, reviews: 211, stock: 22, shipsToday: true, fits: ["toyota-corolla-16","toyota-yaris-13","honda-city-15","honda-civic-18"],
    specs: [["Type","Air/fuel ratio, wideband"],["Wires","4"],["Thread","M18 × 1.5"]],
    desc: "Sensor 1, before the catalytic converter. Pre-applied anti-seize on the threads."
  },
  {
    id: "p-022", sku: "BORLA-140735", oem: null, brand: "Borla", grade: "performance", title: "Borla S-Type Cat-Back Exhaust System", category: "exhaust", sub: "Cat-Back", art: "exhaust", position: "na", price: 416899, was: 447699, unit: "Complete system", rating: 4.9, reviews: 37, stock: 2, fits: ["honda-civic-15t"],
    specs: [["Tubing","2.5 in T-304 stainless"],["Tips","4.0 in polished"],["Sound","Moderate, no drone at cruise"]],
    desc: "Mandrel-bent cat-back with a straight-through muffler. Bolts to factory hangers."
  },
  {
    id: "p-023", sku: "WAL-50-0141", oem: null, brand: "Walker", grade: "oem", title: "Walker Exhaust Gasket & Hardware Kit", category: "exhaust", sub: "Gaskets & Hardware", art: "gasket", position: "na", price: 3599, unit: "Kit", rating: 4.3, reviews: 88, stock: 64, shipsToday: true, fits: ["universal"],
    specs: [["Includes","2 donut gaskets, 4 spring bolts"],["Flange","2.25 – 2.5 in"]],
    desc: "Universal fitment — measure your flange diameter before ordering."
  },
  {
    id: "p-024", sku: "WAG-QC1234", oem: null, brand: "Wagner", grade: "oem", title: "Wagner QuickStop Semi-Metallic Front Brake Pads", category: "brakes", sub: "Pads", art: "pads", position: "front", price: 9799, unit: "Front axle", rating: 4.4, reviews: 156, stock: 37, shipsToday: true, fits: ["suzuki-mehran","suzuki-alto","suzuki-cultus","suzuki-wagonr","suzuki-swift","kia-picanto"],
    specs: [["Compound","Semi-metallic"],["Hardware","Abutment clips included"],["Use","Daily / towing"]],
    desc: "Budget-friendly pad with strong cold bite — a sensible pick for daily city driving in small hatchbacks."
  }
];
