-- Older and imported Pakistan-market cars that the TECK supplier filters fit.
-- Run once in the Supabase SQL editor after schema.sql (safe to re-run; existing ids are left alone).
-- Years are the Pakistan-market run; admins can edit or delete any of these on Admin → Vehicles.

insert into public.vehicles (id, make, model, engine, year_from, year_to) values
  ('suzuki-fx',            'Suzuki',   'FX',                  '0.8L F8B',                        1982, 1988),
  ('suzuki-mehran-om',     'Suzuki',   'Mehran (old model)',  '0.8L F8B carburettor',            1989, 2012),
  ('suzuki-alto-om',       'Suzuki',   'Alto (old model)',    '1.0L F10A',                       2000, 2012),
  ('suzuki-bolan',         'Suzuki',   'Bolan',               '0.8L F8B',                        1988, 2026),
  ('suzuki-ravi',          'Suzuki',   'Ravi',                '0.8L F8B',                        1988, 2026),
  ('suzuki-potohar',       'Suzuki',   'Potohar (SJ410)',     '1.0L F10A',                       1985, 2002),
  ('suzuki-khyber',        'Suzuki',   'Khyber',              '1.0L G10',                        1989, 2000),
  ('suzuki-margalla',      'Suzuki',   'Margalla',            '1.3L G13',                        1992, 1998),
  ('suzuki-cultus-om',     'Suzuki',   'Cultus (old model)',  '1.0L G10',                        2000, 2017),
  ('suzuki-baleno',        'Suzuki',   'Baleno',              '1.3L G13',                        1998, 2006),
  ('suzuki-liana',         'Suzuki',   'Liana',               '1.3L M13A',                       2006, 2014),
  ('suzuki-swift-om',      'Suzuki',   'Swift (old model)',   '1.3L M13A',                       2010, 2021),
  ('suzuki-every',         'Suzuki',   'Every',               '0.66L K6A / R06A',                2005, 2026),
  ('daihatsu-cuore',       'Daihatsu', 'Cuore',               '0.85L ED-10',                     2000, 2012),
  ('daihatsu-mira',        'Daihatsu', 'Mira',                '0.66L KF',                        2006, 2026),
  ('daihatsu-hijet',       'Daihatsu', 'Hijet',               '0.66L KF',                        2000, 2026),
  ('daihatsu-terios-kid',  'Daihatsu', 'Terios Kid',          '0.66L EF',                        1998, 2012),
  ('hyundai-santro',       'Hyundai',  'Santro',              '1.0L Epsilon G4HC',               2003, 2014),
  ('toyota-vitz',          'Toyota',   'Vitz / Passo / Belta','1.0L 1KR-FE',                     2005, 2026),
  ('toyota-corolla-om',    'Toyota',   'Corolla (2002-2008)', '1.3L 2NZ-FE / 1.6L 3ZZ-FE',       2002, 2008),
  ('toyota-corolla-13',    'Toyota',   'Corolla',             '1.3L 2NZ-FE (XLi / GLi)',         2009, 2021),
  ('honda-city-0308',      'Honda',    'City (2003-2008)',    '1.3L / 1.5L L-series i-DSI',      2003, 2008),
  ('honda-city-0921',      'Honda',    'City (2009-2021)',    '1.3L L13Z / 1.5L L15A i-VTEC',    2009, 2021),
  ('honda-civic-reborn',   'Honda',    'Civic Reborn',        '1.8L R18A i-VTEC',                2006, 2012),
  ('honda-civic-rebirth',  'Honda',    'Civic Rebirth',       '1.8L R18Z i-VTEC',                2012, 2016),
  ('honda-vezel',          'Honda',    'Vezel',               '1.5L LEB hybrid',                 2014, 2026),
  ('suzuki-stingray',      'Suzuki',   'Wagon R Stingray',    '0.66L R06A',                      2012, 2026),
  ('suzuki-ciaz',          'Suzuki',   'Ciaz',                '1.4L K14B',                       2017, 2021),
  ('daihatsu-charade',     'Daihatsu', 'Charade',             '1.0L CB',                         1984, 1993),
  ('hyundai-shehzore',     'Hyundai',  'Shehzore',            '2.6L D4BB diesel',                2004, 2013),
  ('hyundai-porter',       'Hyundai',  'Porter H-100',        '2.5L D4CB diesel',                2021, 2026),
  ('hyundai-sonata',       'Hyundai',  'Sonata',              '2.0L / 2.5L Smartstream',         2021, 2026),
  ('hyundai-elantra',      'Hyundai',  'Elantra',             '1.6L / 2.0L Nu',                  2021, 2026),
  ('nissan-dayz',          'Nissan',   'Dayz',                '0.66L BR06',                      2013, 2026),
  ('nissan-moco',          'Nissan',   'Moco',                '0.66L R06A',                      2006, 2016),
  ('nissan-sunny',         'Nissan',   'Sunny',               '1.3L GA13 / 1.7L CD17 diesel',    1990, 2008),
  ('honda-n-one',          'Honda',    'N-One',               '0.66L S07A',                      2012, 2026),
  ('honda-civic-9600',     'Honda',    'Civic (1996-2000)',   '1.6L D16',                        1996, 2000),
  ('honda-civic-0106',     'Honda',    'Civic VTi Oriel (2001-2006)', '1.6L D16 / 1.7L D17',     2001, 2006),
  ('toyota-corolla-8501',  'Toyota',   'Corolla (1985-2001)', '1.3L 2E / 1.6L 4A',               1985, 2001),
  ('toyota-prius',         'Toyota',   'Prius',               '1.5L 1NZ-FXE / 1.8L 2ZR-FXE hybrid', 2004, 2015),
  ('toyota-aqua',          'Toyota',   'Aqua',                '1.5L 1NZ-FXE hybrid',             2012, 2026),
  ('toyota-hilux-vigo',    'Toyota',   'Hilux Vigo',          '2.5L 2KD / 3.0L 1KD diesel',      2005, 2015),
  ('toyota-land-cruiser',  'Toyota',   'Land Cruiser V8',     '4.5L 1VD / 4.6L 1UR',             2008, 2021),
  ('toyota-hiace',         'Toyota',   'Hiace',               '2.7L 2TR / 3.0L 1KD',             2005, 2026),
  ('mazda-titan',          'Mazda',    'Titan',               'Diesel truck',                    1990, 2010)
on conflict (id) do nothing;

-- Non-car departments for the TECK import (Lubricants go under the existing 'oils').
insert into public.categories (id, name, sort) values
  ('tractor',   'Tractors & Parts',        7),
  ('medical',   'Medical & Walking Aids',  8),
  ('cosmetics', 'Cosmetics',               9)
on conflict (id) do nothing;
