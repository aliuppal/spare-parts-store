/* ApexAuto catalog — SAMPLE DATA for the demo storefront.
   Prices (PKR), stock, ratings and part numbers are illustrative, not real listings.
   `fits` holds vehicle ids from VEHICLES, or the string "universal". */

window.VEHICLES = [
  { id: "bmw-g20-m340i",  make: "BMW",        model: "3 Series M340i",   engine: "3.0L B58 Turbo I6",   years: [2019, 2024] },
  { id: "bmw-g20-330i",   make: "BMW",        model: "3 Series 330i",    engine: "2.0L B48 Turbo I4",   years: [2019, 2024] },
  { id: "ford-f150-35",   make: "Ford",       model: "F-150",            engine: "3.5L EcoBoost V6",    years: [2018, 2023] },
  { id: "ford-f150-50",   make: "Ford",       model: "F-150",            engine: "5.0L Coyote V8",      years: [2018, 2023] },
  { id: "toyota-camry-25",make: "Toyota",     model: "Camry",            engine: "2.5L Dynamic Force I4", years: [2018, 2024] },
  { id: "toyota-camry-35",make: "Toyota",     model: "Camry",            engine: "3.5L V6",             years: [2018, 2024] },
  { id: "honda-civic-15t",make: "Honda",      model: "Civic",            engine: "1.5L Turbo I4",       years: [2016, 2021] },
  { id: "honda-civic-20", make: "Honda",      model: "Civic",            engine: "2.0L I4",             years: [2016, 2021] },
  { id: "vw-golf-gti",    make: "Volkswagen", model: "Golf GTI",         engine: "2.0L TSI EA888",      years: [2015, 2021] }
];

window.CATEGORIES = [
  { id: "brakes",     name: "Brakes & Rotors" },
  { id: "suspension", name: "Suspension" },
  { id: "engine",     name: "Engine & Ignition" },
  { id: "filters",    name: "Filters & Fluids" },
  { id: "cooling",    name: "Cooling" },
  { id: "electrical", name: "Electrical" },
  { id: "exhaust",    name: "Exhaust" }
];

window.PRODUCTS = [
  {
    id: "p-001", sku: "BRM-09.C892.11", oem: "34-11-6-860-911", brand: "Brembo", grade: "performance",
    title: "Brembo GT-S Drilled Front 2-Piece Brake Rotor Kit", category: "brakes", sub: "Rotors",
    art: "rotor", position: "front", price: 120399, was: 136899, unit: "Per axle pair",
    rating: 4.9, reviews: 128, stock: 8, shipsToday: true,
    fits: ["bmw-g20-m340i"],
    specs: [["Diameter", "374 mm"], ["Thickness", "36 mm"], ["Material", "High-carbon cast iron"], ["Vane design", "Bi-directional curved, 48 vanes"], ["Hat finish", "Black anodized aluminium"]],
    desc: "Two-piece floating rotors with a cross-drilled friction ring that sheds heat and gas under repeated hard stops. Direct bolt-on for the M Sport brake package; no caliper spacers required."
  },
  {
    id: "p-002", sku: "PS-Z26-1504", oem: "34-21-6-885-442", brand: "PowerStop", grade: "performance",
    title: "PowerStop Z26 Carbon-Fiber Ceramic Brake Pad Set (Front & Rear)", category: "brakes", sub: "Pads",
    art: "pads", position: "both", price: 46099, unit: "Front + rear set",
    rating: 4.8, reviews: 312, stock: 24, shipsToday: true, freeNextDay: true,
    fits: ["bmw-g20-m340i", "bmw-g20-330i"],
    specs: [["Compound", "Carbon-fiber ceramic, low dust"], ["Hardware", "Stainless shims included"], ["Max operating temp", "1,500 °F"], ["Wear sensor", "Not included — reuse OE"]],
    desc: "Street-performance pad with a carbon-fiber reinforced ceramic compound. Quiet at idle, stable bite when warm, and noticeably less wheel dust than OE semi-metallic pads."
  },
  {
    id: "p-003", sku: "BOS-QC-50011", oem: "34-21-6-860-912", brand: "Bosch", grade: "oem",
    title: "Bosch QuietCast Premium Coated Rear Disc Brake Rotor", category: "brakes", sub: "Rotors",
    art: "rotor-plain", position: "rear", price: 33299, unit: "Each",
    rating: 4.7, reviews: 89, stock: 15, shipsToday: true,
    fits: ["bmw-g20-m340i", "bmw-g20-330i"],
    specs: [["Diameter", "345 mm vented"], ["Balancing", "100% precision balanced"], ["Coating", "Al-Zn anti-corrosion"], ["Min. thickness", "22.4 mm"]],
    desc: "OE-equivalent rear rotor with a full anti-corrosion coating on the hat and vanes so it stays clean behind open-spoke wheels."
  },
  {
    id: "p-004", sku: "ST-950.34503", oem: null, brand: "StopTech", grade: "performance",
    title: "StopTech Stainless Steel Braided Brake Line Kit (4-Corner)", category: "brakes", sub: "Lines & Hoses",
    art: "lines", position: "both", price: 39799, unit: "Complete set",
    rating: 4.9, reviews: 74, stock: 3, shipsToday: true,
    fits: ["bmw-g20-m340i", "bmw-g20-330i", "vw-golf-gti"],
    specs: [["Core hose", "Extruded PTFE inner tube"], ["Outer braid", "304 stainless weave"], ["Fittings", "Zinc-plated steel banjo"], ["Compliance", "DOT FMVSS 106"]],
    desc: "Replaces the rubber flex hoses at all four corners. Eliminates line expansion for a firmer, more consistent pedal on track days."
  },
  {
    id: "p-005", sku: "AKE-EUR1505", oem: null, brand: "Akebono", grade: "oem",
    title: "Akebono EURO Ultra-Premium Ceramic Front Brake Pads", category: "brakes", sub: "Pads",
    art: "pads", position: "front", price: 25199, unit: "Front axle",
    rating: 4.8, reviews: 204, stock: 19,
    fits: ["bmw-g20-330i", "vw-golf-gti", "toyota-camry-25", "toyota-camry-35"],
    specs: [["Compound", "Ultra-premium ceramic"], ["Rotor wear", "Very low"], ["Noise control", "OE-level acoustic shims"], ["Dust", "Ultra-low"]],
    desc: "The daily-driver pick: quiet, clean and gentle on rotors, with pedal feel close to the factory pad."
  },
  {
    id: "p-006", sku: "BIL-24-275226", oem: null, brand: "Bilstein", grade: "performance",
    title: "Bilstein B8 Performance Plus Monotube Front Shock Absorber", category: "suspension", sub: "Shocks & Struts",
    art: "shock", position: "front", price: 80899, unit: "Per unit",
    rating: 5.0, reviews: 46, stock: 6,
    fits: ["bmw-g20-m340i", "bmw-g20-330i"],
    specs: [["Design", "46 mm inverted monotube"], ["Application", "Lowered M Sport (up to 30 mm)"], ["Valving", "Vehicle-specific digressive"], ["Warranty", "Limited lifetime"]],
    desc: "Shortened-stroke monotube built for cars on lowering springs. Keeps full bump travel and controls rebound that OE dampers can't handle."
  },
  {
    id: "p-007", sku: "EIB-E10-20-012", oem: null, brand: "Eibach", grade: "performance",
    title: "Eibach Pro-Kit Performance Lowering Springs", category: "suspension", sub: "Springs",
    art: "spring", position: "both", price: 92099, unit: "Set of 4",
    rating: 4.6, reviews: 158, stock: 11, shipsToday: true,
    fits: ["ford-f150-35", "ford-f150-50"],
    specs: [["Drop (front)", "1.0 in"], ["Drop (rear)", "1.4 in"], ["Rate type", "Progressive"], ["Finish", "Powder coat"]],
    desc: "A modest drop that tightens the stance without upsetting load capacity. Pairs with stock or performance dampers."
  },
  {
    id: "p-008", sku: "MOOG-K750118", oem: "4L3Z-3050-A", brand: "Moog", grade: "oem",
    title: "Moog Problem Solver Front Lower Ball Joint", category: "suspension", sub: "Ball Joints",
    art: "balljoint", position: "front", price: 15299, unit: "Each",
    rating: 4.5, reviews: 391, stock: 42, shipsToday: true,
    fits: ["ford-f150-35", "ford-f150-50"],
    specs: [["Type", "Press-in, greaseable"], ["Bearing", "Powdered-metal gusher"], ["Boot", "Polyurethane"], ["Torque (castle nut)", "85 ft-lb"]],
    desc: "Greaseable replacement for the sealed factory joint, with a gusher bearing that keeps fresh grease where it's needed."
  },
  {
    id: "p-009", sku: "NGK-97968", oem: "12-12-0-039-664", brand: "NGK", grade: "oem",
    title: "NGK Laser Iridium Spark Plug", category: "engine", sub: "Spark Plugs",
    art: "plug", position: "na", price: 4899, unit: "Each — engine takes 6",
    rating: 4.9, reviews: 512, stock: 240, shipsToday: true,
    fits: ["bmw-g20-m340i"],
    specs: [["Gap (pre-set)", "0.028 in / 0.7 mm"], ["Thread", "M12 × 1.25"], ["Reach", "26.5 mm"], ["Hex", "14 mm bi-hex"]],
    desc: "OE supplier plug for the B58. Pre-gapped — do not adjust. Replace every 45,000 mi, or sooner when tuned."
  },
  {
    id: "p-010", sku: "BOS-0221504470", oem: "12-13-8-616-153", brand: "Bosch", grade: "oem",
    title: "Bosch Ignition Coil Pack", category: "engine", sub: "Ignition Coils",
    art: "coil", position: "na", price: 13699, was: 15699, unit: "Each",
    rating: 4.7, reviews: 233, stock: 0,
    fits: ["bmw-g20-m340i", "bmw-g20-330i"],
    specs: [["Output", "40 kV"], ["Connector", "3-pin"], ["Boot length", "102 mm"]],
    desc: "Genuine-spec pencil coil. A misfire that follows a coil when swapped between cylinders is the classic sign it's time."
  },
  {
    id: "p-011", sku: "GAT-K060923", oem: "AT4Z-8620-A", brand: "Gates", grade: "oem",
    title: "Gates Micro-V Serpentine Belt", category: "engine", sub: "Belts",
    art: "belt", position: "na", price: 10899, unit: "Each",
    rating: 4.8, reviews: 177, stock: 33, shipsToday: true,
    fits: ["ford-f150-35", "ford-f150-50"],
    specs: [["Ribs", "6"], ["Effective length", "92.4 in"], ["Material", "EPDM"]],
    desc: "EPDM belt that wears evenly and stays quiet. Check the tensioner arm travel when replacing."
  },
  {
    id: "p-012", sku: "MAN-HU6020Z", oem: "11-42-8-575-211", brand: "Mann-Filter", grade: "oem",
    title: "Mann-Filter Oil Filter Cartridge Kit", category: "filters", sub: "Oil Filters",
    art: "oilfilter", position: "na", price: 4199, unit: "Each",
    rating: 4.9, reviews: 846, stock: 310, shipsToday: true,
    fits: ["bmw-g20-m340i", "bmw-g20-330i"],
    specs: [["Type", "Cartridge, metal-free"], ["Includes", "O-rings, drain plug washer"], ["Change interval", "10,000 mi / 1 yr"]],
    desc: "Factory-supplier cartridge filter with every seal you need for a clean oil service."
  },
  {
    id: "p-013", sku: "KN-33-2481", oem: null, brand: "K&N", grade: "performance",
    title: "K&N Washable High-Flow Panel Air Filter", category: "filters", sub: "Air Filters",
    art: "airfilter", position: "na", price: 19599, unit: "Each",
    rating: 4.6, reviews: 402, stock: 27, shipsToday: true,
    fits: ["honda-civic-15t", "honda-civic-20"],
    specs: [["Media", "Oiled cotton gauze"], ["Service interval", "Up to 50,000 mi"], ["Dimensions", "10.6 × 8.1 × 1.6 in"]],
    desc: "Drop-in replacement for the paper element. Clean and re-oil it instead of buying a new filter."
  },
  {
    id: "p-014", sku: "FRAM-CF10285", oem: null, brand: "FRAM", grade: "oem",
    title: "FRAM Fresh Breeze Cabin Air Filter with Arm & Hammer", category: "filters", sub: "Cabin Filters",
    art: "airfilter", position: "na", price: 5999, unit: "Each",
    rating: 4.5, reviews: 1290, stock: 96, shipsToday: true,
    fits: ["toyota-camry-25", "toyota-camry-35", "honda-civic-15t", "honda-civic-20"],
    specs: [["Media", "Baking-soda activated"], ["Change interval", "12,000 mi"], ["Install", "Behind glovebox, no tools"]],
    desc: "Traps dust and pollen and neutralises odours before they reach the cabin."
  },
  {
    id: "p-015", sku: "MOB-124316", oem: null, brand: "Mobil 1", grade: "oem",
    title: "Mobil 1 Extended Performance 0W-20 Full Synthetic (5 qt)", category: "filters", sub: "Fluids",
    art: "fluid", position: "na", price: 10399, unit: "5 qt jug",
    rating: 4.9, reviews: 2210, stock: 500, shipsToday: true,
    fits: ["universal"],
    specs: [["Viscosity", "0W-20"], ["Approvals", "API SP, ILSAC GF-6A"], ["Volume", "4.73 L"]],
    desc: "Universal fitment — confirm the viscosity in your owner's manual before ordering."
  },
  {
    id: "p-016", sku: "CSF-7090", oem: "16400-F0010", brand: "CSF", grade: "performance",
    title: "CSF High-Performance All-Aluminium Radiator", category: "cooling", sub: "Radiators",
    art: "radiator", position: "na", price: 111699, unit: "Each",
    rating: 4.7, reviews: 63, stock: 4,
    fits: ["toyota-camry-25", "toyota-camry-35"],
    specs: [["Core", "2-row, 40 mm"], ["Construction", "TIG-welded aluminium"], ["Fitment", "Direct, reuses OE fans"]],
    desc: "Higher-capacity core for towing or hot climates. Drops coolant temps under sustained load."
  },
  {
    id: "p-017", sku: "AIS-WPT-190", oem: "16100-09471", brand: "Aisin", grade: "oem",
    title: "Aisin Engine Water Pump with Gasket", category: "cooling", sub: "Water Pumps",
    art: "pump", position: "na", price: 31499, unit: "Each",
    rating: 4.8, reviews: 140, stock: 13, shipsToday: true,
    fits: ["toyota-camry-25", "honda-civic-20"],
    specs: [["Impeller", "Cast iron"], ["Includes", "Gasket"], ["Supplier", "OE supplier"]],
    desc: "OE-supplier pump. Replace the thermostat at the same time while the system is drained."
  },
  {
    id: "p-018", sku: "MIS-TH-180", oem: null, brand: "Mishimoto", grade: "performance",
    title: "Mishimoto Racing Thermostat 160 °F", category: "cooling", sub: "Thermostats",
    art: "thermostat", position: "na", price: 12599, unit: "Each",
    rating: 4.4, reviews: 58, stock: 0,
    fits: ["vw-golf-gti", "honda-civic-15t"],
    specs: [["Opening temp", "160 °F / 71 °C"], ["Seal", "Viton gasket"]],
    desc: "Lower-temperature thermostat for tuned engines. Expect slower warm-up in cold weather."
  },
  {
    id: "p-019", sku: "ODY-94R-850", oem: null, brand: "Odyssey", grade: "performance",
    title: "Odyssey Performance AGM Battery Group 94R", category: "electrical", sub: "Batteries",
    art: "battery", position: "na", price: 69999, unit: "Each + Rs 6,200 core",
    rating: 4.8, reviews: 377, stock: 9, core: 6200,
    fits: ["bmw-g20-m340i", "bmw-g20-330i", "vw-golf-gti", "ford-f150-35"],
    specs: [["Group", "94R / H7"], ["CCA", "850 A"], ["Reserve capacity", "140 min"], ["Chemistry", "AGM"]],
    desc: "Requires battery registration on BMW models after install. A refundable Rs 6,200 core charge applies until the old battery is returned."
  },
  {
    id: "p-020", sku: "DEN-210-0812", oem: "BL3T-10300-AA", brand: "Denso", grade: "oem",
    title: "Denso Remanufactured Alternator 200 A", category: "electrical", sub: "Alternators",
    art: "alternator", position: "na", price: 80099, unit: "Each + Rs 12,600 core",
    rating: 4.6, reviews: 92, stock: 5, core: 12600,
    fits: ["ford-f150-35", "ford-f150-50"],
    specs: [["Output", "200 A"], ["Voltage", "12 V"], ["Pulley", "6-groove clutch"], ["Condition", "Remanufactured, tested"]],
    desc: "Fully remanufactured to OE spec and load-tested before shipping."
  },
  {
    id: "p-021", sku: "BOS-15734", oem: null, brand: "Bosch", grade: "oem",
    title: "Bosch Premium Oxygen Sensor (Upstream)", category: "electrical", sub: "Sensors",
    art: "sensor", position: "na", price: 22399, unit: "Each",
    rating: 4.7, reviews: 211, stock: 22, shipsToday: true,
    fits: ["toyota-camry-25", "honda-civic-20", "honda-civic-15t"],
    specs: [["Type", "Air/fuel ratio, wideband"], ["Wires", "4"], ["Thread", "M18 × 1.5"]],
    desc: "Sensor 1, before the catalytic converter. Pre-applied anti-seize on the threads."
  },
  {
    id: "p-022", sku: "BORLA-140735", oem: null, brand: "Borla", grade: "performance",
    title: "Borla S-Type Cat-Back Exhaust System", category: "exhaust", sub: "Cat-Back",
    art: "exhaust", position: "na", price: 416899, was: 447699, unit: "Complete system",
    rating: 4.9, reviews: 37, stock: 2,
    fits: ["ford-f150-50"],
    specs: [["Tubing", "3.0 in T-304 stainless"], ["Tips", "4.0 in polished"], ["Sound", "Moderate, no drone at cruise"]],
    desc: "Mandrel-bent cat-back with a straight-through muffler. Bolts to factory hangers."
  },
  {
    id: "p-023", sku: "WAL-50-0141", oem: null, brand: "Walker", grade: "oem",
    title: "Walker Exhaust Gasket & Hardware Kit", category: "exhaust", sub: "Gaskets & Hardware",
    art: "gasket", position: "na", price: 3599, unit: "Kit",
    rating: 4.3, reviews: 88, stock: 64, shipsToday: true,
    fits: ["universal"],
    specs: [["Includes", "2 donut gaskets, 4 spring bolts"], ["Flange", "2.25 – 2.5 in"]],
    desc: "Universal fitment — measure your flange diameter before ordering."
  },
  {
    id: "p-024", sku: "WAG-QC1234", oem: null, brand: "Wagner", grade: "oem",
    title: "Wagner QuickStop Semi-Metallic Rear Brake Pads", category: "brakes", sub: "Pads",
    art: "pads", position: "rear", price: 9799, unit: "Rear axle",
    rating: 4.4, reviews: 156, stock: 37, shipsToday: true,
    fits: ["ford-f150-35", "ford-f150-50", "toyota-camry-25", "toyota-camry-35", "honda-civic-15t", "honda-civic-20"],
    specs: [["Compound", "Semi-metallic"], ["Hardware", "Abutment clips included"], ["Use", "Daily / towing"]],
    desc: "Budget-friendly semi-metallic pad with strong cold bite. A sensible choice for work trucks."
  }
];
