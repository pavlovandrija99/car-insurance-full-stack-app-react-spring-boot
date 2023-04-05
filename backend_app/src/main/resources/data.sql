insert into payment_mode (id, name) values (1, 'cheque');
insert into payment_mode (id, name) values (2, 'card');
insert into payment_mode (id, name) values (3, 'bank');

insert into user_role (id, name) values (1, 'admin');
insert into user_role (id, name) values (2, 'agent');

insert into card_type (id, name) values (1, 'Visa');
insert into card_type (id, name) values (2, 'MasterCard');

insert into subscriber_role (id, name) values (1, 'legal entity');
insert into subscriber_role (id, name) values (2, 'person');

insert into country (id, name) values (1, 'Serbia');
insert into country (id, name) values (2, 'Hungary');
insert into country (id, name) values (3, 'Romania');
insert into country (id, name) values (4, 'Croatia');
insert into country (id, name) values (5, 'Slovakia');
insert into country (id, name) values (6, 'Austria');
insert into country (id, name) values (7, 'Switzerland');
insert into country (id, name) values (8, 'France');
insert into country (id, name) values (9, 'Germany');
insert into country (id, name) values (10, 'United Kingdom');

insert into city (id, name, country_id) values (1, 'Novi Sad', 1);
insert into city (id, name, country_id) values (2, 'Belgrade', 1);
insert into city (id, name, country_id) values (3, 'Budapest', 2);
insert into city (id, name, country_id) values (4, 'Niš', 1);
insert into city (id, name, country_id) values (5, 'Kragujevac', 1);
insert into city (id, name, country_id) values (6, 'Osijek', 4);
insert into city (id, name, country_id) values (7, 'Zagreb', 4);
insert into city (id, name, country_id) values (8, 'Split', 4);
insert into city (id, name, country_id) values (9, 'Bucharest', 3);
insert into city (id, name, country_id) values (10, 'Vienna', 6);
insert into city (id, name, country_id) values (11, 'Paris', 8);
insert into city (id, name, country_id) values (12, 'Berlin', 9);
insert into city (id, name, country_id) values (13, 'Bratislava', 5);
insert into city (id, name, country_id) values (14, 'Zürich', 7);
insert into city (id, name, country_id) values (15, 'London', 10);

insert into zip (id, zip_number, city_id) values (1, '21000', 1);
insert into zip (id, zip_number, city_id) values (2, '11000', 2);
insert into zip (id, zip_number, city_id) values (3, '21110', 1);
insert into zip (id, zip_number, city_id) values (4, '21120', 1);
insert into zip (id, zip_number, city_id) values (5, '18000', 4);
insert into zip (id, zip_number, city_id) values (6, '34000', 5);
insert into zip (id, zip_number, city_id) values (7, '1500', 3);
insert into zip (id, zip_number, city_id) values (8, '31000', 6);
insert into zip (id, zip_number, city_id) values (9, '10000', 7);
insert into zip (id, zip_number, city_id) values (10, '21000', 8);
insert into zip (id, zip_number, city_id) values (11, '12399', 9);
insert into zip (id, zip_number, city_id) values (12, '1050', 10);
insert into zip (id, zip_number, city_id) values (13, '75000', 11);
insert into zip (id, zip_number, city_id) values (14, '10115', 12);
insert into zip (id, zip_number, city_id) values (15, '2412', 13);
insert into zip (id, zip_number, city_id) values (16, '8000', 14);
insert into zip (id, zip_number, city_id) values (17, '533416', 15);

insert into address (id, street, street_number, city_id, zip_id) values (1, 'Bulevar Oslobođenja', '5', 1, 1);
insert into address (id, street, street_number, city_id, zip_id) values (2, 'Mičurinova', '25', 1, 1);
insert into address (id, street, street_number, city_id, zip_id) values (3, 'Bulevar kralja Aleksandra', '25', 2, 2);
insert into address (id, street, street_number, city_id, zip_id) values (4, 'Kneza Miloša', '25', 2, 2);
insert into address (id, street, street_number, city_id, zip_id) values (5, 'Futoški put', '7', 1, 3);
insert into address (id, street, street_number, city_id, zip_id) values (6, 'Železnička', '34', 1, 3);
insert into address (id, street, street_number, city_id, zip_id) values (7, 'Bulevar Oslobođenja', '100', 1, 1);
insert into address (id, street, street_number, city_id, zip_id) values (8, 'Bulevar Oslobođenja', '88', 1, 1);
insert into address (id, street, street_number, city_id, zip_id) values (9, 'Mariahilfer Straße', '134', 10, 12);
insert into address (id, street, street_number, city_id, zip_id) values (10, 'Rue de Vaugirard', '17', 11, 13);
insert into address (id, street, street_number, city_id, zip_id) values (11, 'Scheidemannstraße', '1', 12, 14);
insert into address (id, street, street_number, city_id, zip_id) values (12, 'Ferenciek tere', '10', 3, 7);
insert into address (id, street, street_number, city_id, zip_id) values (13, 'Rudnayovo námestie', '1', 13, 15);
insert into address (id, street, street_number, city_id, zip_id) values (14, 'Grossmünsterplatz', '1', 14, 16);
insert into address (id, street, street_number, city_id, zip_id) values (15, 'Brick Ln', '91', 15, 17);
insert into address (id, street, street_number, city_id, zip_id) values (16, 'Narodnog Fronta', '5', 1, 4);
insert into address (id, street, street_number, city_id, zip_id) values (17, 'Svetozara Markovića', '55', 5, 6);
insert into address (id, street, street_number, city_id, zip_id) values (18, 'Strada Benjamin Franklin', '1', 9, 11);
insert into address (id, street, street_number, city_id, zip_id) values (19, 'Srijemska', '60', 6, 8);
insert into address (id, street, street_number, city_id, zip_id) values (20, 'Velebitska', '79', 8, 10);
insert into address (id, street, street_number, city_id, zip_id) values (21, 'Slavonska avenija', '9', 7, 9);
insert into address (id, street, street_number, city_id, zip_id) values (22, 'Bulevar dr Zorana Đinđića', '10', 4, 5);

insert into contact (id, email, home_phone, mobile_phone) values (1, 'milos.andric1@synechron.com', null, '065123456');
insert into contact (id, email, home_phone, mobile_phone) values (2, 'andrija.pavlov@synechron.com', null, '0603702090');
insert into contact (id, email, home_phone, mobile_phone) values (3, 'nikola.jokic@gmail.com', null, '0641313226');
insert into contact (id, email, home_phone, mobile_phone) values (4, 'marko.markovic@gmail.com', null, '0621543226');
insert into contact (id, email, home_phone, mobile_phone) values (5, 'djuka.djukic@gmail.com', null, '0658456842');
insert into contact (id, email, home_phone, mobile_phone) values (6, 'jovan.jojic@gmail.com', null, '0676952485');
insert into contact (id, email, home_phone, mobile_phone) values (7, 'ivan.ivanovic@gmail.com', null, '0645782468');
insert into contact (id, email, home_phone, mobile_phone) values (8, 'stefan.stafanovic@gmail.com', null, '0629753451');
insert into contact (id, email, home_phone, mobile_phone) values (9, 'djordje.djordjevic@gmail.com', null, '0641123478');
insert into contact (id, email, home_phone, mobile_phone) values (10, 'nikola.nikolic@gmail.com', null, '0618453654');
insert into contact (id, email, home_phone, mobile_phone) values (11, 'petar.petrovic@gmail.com', null, '0692228887');
insert into contact (id, email, home_phone, mobile_phone) values (12, 'milos.milosevic@gmail.com', null, '0657894561');
insert into contact (id, email, home_phone, mobile_phone) values (13, 'stojan.stojanovic@gmail.com', null, '0608974578');
insert into contact (id, email, home_phone, mobile_phone) values (14, 'nemanja.jokic@gmail.com', null, '0608794563');
insert into contact (id, email, home_phone, mobile_phone) values (15, 'dejan.cukic@gmail.com', null, '0645789789');

insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (1, (CAST('2000-12-25 15:32:06.427' AS DateTime)), 'Andrija', 'Pavlov', '0311999800004', '12345', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 1);

insert into accident_history (id, description, time_happened, was_responsible, driver_id)
values (1, 'Driver fell asleep', (CAST('2000-12-25 15:32:06.427' AS DateTime)), true, 1);

insert into bank_payment (id, bank_name, transaction_no) values (1, 'Erste Bank', '00123132');

insert into brand (id, name) values (1, 'Opel');
insert into brand (id, name) values (2, 'Audi');
insert into brand (id, name) values (3, 'BMW');
insert into brand (id, name) values (4, 'Fiat');

insert into model (id, name, brand_id) values (1, 'Corsa', 1);
insert into model (id, name, brand_id) values (2, 'Astra', 1);
insert into model (id, name, brand_id) values (3, 'Insignia', 1);
insert into model (id, name, brand_id) values (4, 'Mokka', 1);
insert into model (id, name, brand_id) values (5, 'Vivaro', 1);
insert into model (id, name, brand_id) values (6, 'GrandLand', 1);

insert into model (id, name, brand_id) values (7, 'A1', 2);
insert into model (id, name, brand_id) values (8, 'A3', 2);
insert into model (id, name, brand_id) values (9, 'A4', 2);
insert into model (id, name, brand_id) values (10, 'A6', 2);
insert into model (id, name, brand_id) values (11, 'Q2', 2);
insert into model (id, name, brand_id) values (12, 'Q3', 2);
insert into model (id, name, brand_id) values (13, 'Q5', 2);

insert into model (id, name, brand_id) values (14, '1', 3);
insert into model (id, name, brand_id) values (15, 'X1', 3);
insert into model (id, name, brand_id) values (16, 'X3', 3);
insert into model (id, name, brand_id) values (17, 'X5', 3);
insert into model (id, name, brand_id) values (18, 'X7', 3);
insert into model (id, name, brand_id) values (19, '2', 3);
insert into model (id, name, brand_id) values (20, '3', 3);
insert into model (id, name, brand_id) values (21, '4', 3);
insert into model (id, name, brand_id) values (22, '6', 3);

insert into model (id, name, brand_id) values (23, 'Doblo', 4);
insert into model (id, name, brand_id) values (24, 'Panda', 4);
insert into model (id, name, brand_id) values (25, '500L', 4);
insert into model (id, name, brand_id) values (26, 'Tipo', 4);
insert into model (id, name, brand_id) values (27, '500', 4);

insert into model_years (model_id, years) values (1, 2001);
insert into model_years (model_id, years) values (1, 2002);
insert into model_years (model_id, years) values (1, 2006);
insert into model_years (model_id, years) values (1, 2009);
insert into model_years (model_id, years) values (1, 2010);

insert into model_years (model_id, years) values (2, 2001);
insert into model_years (model_id, years) values (2, 2004);
insert into model_years (model_id, years) values (2, 2006);
insert into model_years (model_id, years) values (2, 2012);
insert into model_years (model_id, years) values (2, 2015);

insert into model_years (model_id, years) values (3, 2002);
insert into model_years (model_id, years) values (3, 2008);
insert into model_years (model_id, years) values (3, 2017);
insert into model_years (model_id, years) values (3, 2020);
insert into model_years (model_id, years) values (3, 2021);

insert into model_years (model_id, years) values (4, 2004);
insert into model_years (model_id, years) values (4, 2007);
insert into model_years (model_id, years) values (4, 2012);
insert into model_years (model_id, years) values (4, 2019);
insert into model_years (model_id, years) values (4, 2022);

insert into model_years (model_id, years) values (5, 2003);
insert into model_years (model_id, years) values (5, 2006);
insert into model_years (model_id, years) values (5, 2010);
insert into model_years (model_id, years) values (5, 2015);
insert into model_years (model_id, years) values (5, 2018);

insert into model_years (model_id, years) values (6, 2001);
insert into model_years (model_id, years) values (6, 2021);
insert into model_years (model_id, years) values (6, 2019);
insert into model_years (model_id, years) values (6, 2017);
insert into model_years (model_id, years) values (6, 2008);

insert into model_years (model_id, years) values (7, 2001);
insert into model_years (model_id, years) values (7, 2010);
insert into model_years (model_id, years) values (7, 2020);

insert into model_years (model_id, years) values (8, 2006);
insert into model_years (model_id, years) values (8, 2010);
insert into model_years (model_id, years) values (8, 2016);

insert into model_years (model_id, years) values (9, 2016);
insert into model_years (model_id, years) values (9, 2015);
insert into model_years (model_id, years) values (9, 2021);

insert into model_years (model_id, years) values (10, 2009);
insert into model_years (model_id, years) values (10, 2019);
insert into model_years (model_id, years) values (10, 2015);

insert into model_years (model_id, years) values (11, 2008);
insert into model_years (model_id, years) values (11, 2018);
insert into model_years (model_id, years) values (11, 2021);

insert into model_years (model_id, years) values (12, 2005);
insert into model_years (model_id, years) values (12, 2015);
insert into model_years (model_id, years) values (12, 2017);

insert into model_years (model_id, years) values (13, 2002);
insert into model_years (model_id, years) values (13, 2012);
insert into model_years (model_id, years) values (13, 2020);

insert into model_years (model_id, years) values (14, 2007);
insert into model_years (model_id, years) values (14, 2015);
insert into model_years (model_id, years) values (14, 2022);
insert into model_years (model_id, years) values (14, 1985);
insert into model_years (model_id, years) values (14, 1986);
insert into model_years (model_id, years) values (14, 1987);
insert into model_years (model_id, years) values (14, 1988);
insert into model_years (model_id, years) values (14, 1989);
insert into model_years (model_id, years) values (14, 1990);
insert into model_years (model_id, years) values (14, 1991);
insert into model_years (model_id, years) values (14, 1992);
insert into model_years (model_id, years) values (14, 1993);
insert into model_years (model_id, years) values (14, 1994);
insert into model_years (model_id, years) values (14, 1995);
insert into model_years (model_id, years) values (14, 1996);
insert into model_years (model_id, years) values (14, 1997);

insert into model_years (model_id, years) values (15, 2006);
insert into model_years (model_id, years) values (15, 2019);
insert into model_years (model_id, years) values (15, 2004);

insert into model_years (model_id, years) values (16, 2010);
insert into model_years (model_id, years) values (16, 2015);
insert into model_years (model_id, years) values (16, 2021);

insert into model_years (model_id, years) values (17, 2011);
insert into model_years (model_id, years) values (17, 2021);
insert into model_years (model_id, years) values (17, 2016);

insert into model_years (model_id, years) values (18, 2012);
insert into model_years (model_id, years) values (18, 2019);
insert into model_years (model_id, years) values (18, 2021);

insert into model_years (model_id, years) values (19, 2008);
insert into model_years (model_id, years) values (19, 2017);
insert into model_years (model_id, years) values (19, 2020);

insert into model_years (model_id, years) values (20, 2009);
insert into model_years (model_id, years) values (20, 2011);
insert into model_years (model_id, years) values (20, 2018);

insert into model_years (model_id, years) values (21, 2018);
insert into model_years (model_id, years) values (21, 2012);
insert into model_years (model_id, years) values (21, 2009);

insert into model_years (model_id, years) values (22, 2006);
insert into model_years (model_id, years) values (22, 2021);
insert into model_years (model_id, years) values (22, 2017);

insert into model_years (model_id, years) values (23, 2011);
insert into model_years (model_id, years) values (23, 2017);
insert into model_years (model_id, years) values (23, 2020);

insert into model_years (model_id, years) values (24, 2009);
insert into model_years (model_id, years) values (24, 2019);
insert into model_years (model_id, years) values (24, 2013);

insert into model_years (model_id, years) values (25, 2007);
insert into model_years (model_id, years) values (25, 2017);
insert into model_years (model_id, years) values (25, 2020);

insert into model_years (model_id, years) values (26, 2011);
insert into model_years (model_id, years) values (26, 2017);
insert into model_years (model_id, years) values (26, 2020);

insert into model_years (model_id, years) values (27, 2010);
insert into model_years (model_id, years) values (27, 2019);
insert into model_years (model_id, years) values (27, 2015);

insert into car (id, year, model_id) values (1, 2006, 1);
insert into car (id, year, model_id) values (2, 2015, 2);
insert into car (id, year, model_id) values (3, 2017, 3);
insert into car (id, year, model_id) values (4, 2022, 4);
insert into car (id, year, model_id) values (5, 2010, 5);
insert into car (id, year, model_id) values (6, 2021, 6);
insert into car (id, year, model_id) values (7, 2001, 7);
insert into car (id, year, model_id) values (8, 2016, 8);
insert into car (id, year, model_id) values (9, 2015, 9);
insert into car (id, year, model_id) values (10, 2009, 10);
insert into car (id, year, model_id) values (11, 2018, 11);
insert into car (id, year, model_id) values (12, 2017, 12);
insert into car (id, year, model_id) values (13, 2012, 13);
insert into car (id, year, model_id) values (14, 2007, 14);
insert into car (id, year, model_id) values (15, 2006, 15);
insert into car (id, year, model_id) values (16, 2010, 16);
insert into car (id, year, model_id) values (17, 2021, 17);
insert into car (id, year, model_id) values (18, 2012, 18);
insert into car (id, year, model_id) values (19, 2015, 14);
insert into car (id, year, model_id) values (20, 2020, 19);
insert into car (id, year, model_id) values (21, 2018, 20);
insert into car (id, year, model_id) values (22, 2012, 21);
insert into car (id, year, model_id) values (23, 2006, 22);
insert into car (id, year, model_id) values (24, 2011, 23);
insert into car (id, year, model_id) values (25, 2013, 24);
insert into car (id, year, model_id) values (26, 2020, 25);
insert into car (id, year, model_id) values (27, 2011, 26);
insert into car (id, year, model_id) values (28, 2019, 27);
insert into car (id, year, model_id) values (29, 2010, 1);
insert into car (id, year, model_id) values (30, 2022, 14);
insert into car (id, year, model_id) values (31, 1985, 14);
insert into car (id, year, model_id) values (32, 1986, 14);
insert into car (id, year, model_id) values (33, 1987, 14);
insert into car (id, year, model_id) values (34, 1988, 14);
insert into car (id, year, model_id) values (35, 2021, 18);
insert into car (id, year, model_id) values (36, 2019, 18);
insert into car (id, year, model_id) values (37, 1989, 14);
insert into car (id, year, model_id) values (38, 1990, 14);
insert into car (id, year, model_id) values (39, 1991, 14);
insert into car (id, year, model_id) values (40, 1992, 14);
insert into car (id, year, model_id) values (41, 1993, 14);
insert into car (id, year, model_id) values (42, 1994, 14);
insert into car (id, year, model_id) values (43, 1995, 14);
insert into car (id, year, model_id) values (44, 1996, 14);
insert into car (id, year, model_id) values (45, 1997, 14);

insert into card_payment (id, card_holder, card_number, card_type_id) values (1, 'Andrija Pavlov', '546546546', 1);

insert into cheque_payment (id, cheque_date, cheque_no) values (1, (CAST('2000-12-25 15:32:06.427' AS DateTime)), '546546546');

insert into insurance_item (id, name, amount, franchise_percentage, is_optional) values (1, 'Nedostatak goriva', 500.0, 50, false);
insert into insurance_item (id, name, amount, franchise_percentage, is_optional) values (2, 'Manje popravke na licu mesta', 500.0, 50, false);
insert into insurance_item (id, name, amount, franchise_percentage, is_optional) values (3, 'Smestaj/prenociste', 500.0, 50, true);
insert into insurance_item (id, name, amount, franchise_percentage, is_optional) values (4, 'Vuca vozila u Srbiji', 500.0, 50, false);
insert into insurance_item (id, name, amount, franchise_percentage, is_optional) values (5, 'Zamensko vozilo', 500.0, 50, true);
insert into insurance_item (id, name, amount, franchise_percentage, is_optional) values (6, 'Nastavak putovanja - prevoz vozaca i putnika do odredista', 20.0, 50, true);
insert into insurance_item (id, name, amount, franchise_percentage, is_optional) values (7, 'Lezarina za osteceno vozilo', 20.0, 50, false);
insert into insurance_item (id, name, amount, franchise_percentage, is_optional) values (8, 'Info linija', 20.0, 50, false);
insert into insurance_item (id, name, amount, franchise_percentage, is_optional) values (9, 'Vuca vozila u Evropi', 20.0, 50, true);
insert into insurance_item (id, name, amount, franchise_percentage, is_optional) values (10, 'Zamena probusene gume', 20.0, 50, true);

insert into insurance_plan (id, is_premium, name) values (1, false, 'Osnovni paket');
insert into insurance_plan (id, is_premium, name) values (2, true, 'Premium paket');

insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (1, 1);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (1, 2);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (1, 4);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (1, 7);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (1, 8);

insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (2, 1);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (2, 2);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (2, 4);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (2, 7);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (2, 8);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (2, 5);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (2, 6);
insert into insurance_plans_insurance_items (insurance_plan_id, insurance_item_id) values (2, 9);

insert into payment (id, bank_payment_id, payment_mode_id) values (1, 1, 3);
insert into payment (id, card_payment_id, payment_mode_id) values (2, 1, 2);
insert into payment (id, cheque_payment_id, payment_mode_id) values (3, 1, 1);

insert into policy (id, amount, date_signed, money_received_date, payment_id)
values (1, 500.0, (CAST('2000-12-25 15:32:06.427' AS DateTime)), (CAST('2000-12-25 15:32:06.427' AS DateTime)), 1);

insert into risk (id, description) values (1, 'Driving after drinking alcohol or when impaired by drugs');
insert into risk (id, description) values (2, 'Not wearing seatbelts');
insert into risk (id, description) values (3, 'Use of mobile phones');
insert into risk (id, description) values (4, 'Driver fatigue');
insert into risk (id, description) values (5, 'Speeding and inappropriate travel speeds for the road or weather conditions');

insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (1, (CAST('1997-06-09 15:40:06.427' AS DateTime)), 'Milos', 'Andric', '0906997810056', 1, 1, 2);

insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (2, (CAST('1999-01-02 12:12:06.427' AS DateTime)), 'Andrija', 'Pavlov', '0311999800004', 2, 2, 1);

insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (3, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Nikola', 'Jokic', '0054782548854', 2, 3, 2);

insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (4, (CAST('1973-02-11 10:12:06.427' AS DateTime)), 'Marko', 'Markovic', '0054782541254', 2, 4, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (5, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Djuka', 'Djukic', '0024782541254', 2, 5, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (6, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Jovan', 'Jojic', '0884782541254', 2, 6, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (7, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Ivan', 'Ivanovic', '0054452541254', 2, 7, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (8, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Stefan', 'Stefanovic', '0054728541254', 2, 8, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (9, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Djordje', 'Djordjevic', '0054878541254', 2, 9, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (10, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Nikola', 'Nikolic', '0054782541644', 2, 10, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (11, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Petar', 'Petrovic', '0054782541974', 2, 11, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (12, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Milos', 'Milosevic', '2054782651254', 2, 12, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (13, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Stojan', 'Stojanovic', '2051482541254', 2, 13, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (14, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Nemanja', 'Jokic', '2054782599254', 2, 14, 2);
insert into subscriber (id, birth, first_name, last_name, jmbg, address_id, contact_id, subscriber_role_id)
values (15, (CAST('1985-12-11 10:12:06.427' AS DateTime)), 'Dejan', 'Cukic', '2054782599994', 2, 15, 2);

-- passwords are '1234'
insert into user (id, email, password, username, user_role_id)
values (1, 'milos.andric1@synechron.com', '$2a$12$IbbBIHAE3uPU7ddGy6vUJuDxryK8VF/h9yPmiefV5OCAcVoLjimH.', 'milos.andric1', 2);
insert into user (id, email, password, username, user_role_id)
values (2, 'admin@gmail.com', '$2a$12$IbbBIHAE3uPU7ddGy6vUJuDxryK8VF/h9yPmiefV5OCAcVoLjimH.', 'admin', 1);

insert into driver_risk (driver_id, risk_id) values (1, 1);

insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (1, 0.0, (CAST('2000-12-25 15:32:06.427' AS DateTime)), true, 0);

insert into franchise (id, percentage, insurance_item_id, proposal_id) values (1, 55, 1, 1);

insert into card_payment (id, card_holder, card_number, card_type_id) values (2, 'Andrija Pavlov', '546546546', 1);
insert into payment (id, card_payment_id, payment_mode_id) values (4, 2, 2);

insert into policy (id, amount, date_signed, money_received_date, payment_id)
values (2, 0.0, (CAST('2000-12-25 15:32:06.427' AS DateTime)), (CAST('2000-12-25 15:32:06.427' AS DateTime)), 4);

insert into card_payment (id, card_holder, card_number, card_type_id) values (3, 'Andrija Pavlov', '546546546', 1);
insert into payment (id, card_payment_id, payment_mode_id) values (5, 3, 2);

insert into policy (id, amount, date_signed, money_received_date, payment_id)
values (3, 0.0, (CAST('2000-12-25 15:32:06.427' AS DateTime)), (CAST('2000-12-25 15:32:06.427' AS DateTime)), 5);

insert into card_payment (id, card_holder, card_number, card_type_id) values (4, 'Andrija Pavlov', '546546546', 1);
insert into payment (id, card_payment_id, payment_mode_id) values (6, 4, 2);

insert into policy (id, amount, date_signed, money_received_date, payment_id)
values (4, 0.0, (CAST('2000-12-25 15:32:06.427' AS DateTime)), (CAST('2000-12-25 15:32:06.427' AS DateTime)), 6);

insert into proposal (id, amount, creation_date, is_valid, proposal_status, is_deleted)
values (2, 0.0, (CAST('2022-12-22 15:56:06.427' AS DateTime)), true, 0, true);
insert into proposal (id, amount, creation_date, is_valid, proposal_status, is_deleted)
values (3, 0.0, (CAST('2022-12-20 13:32:06.427' AS DateTime)), true, 0, true);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (4, 0.0, (CAST('2022-12-12 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (5, 0.0, (CAST('2022-12-15 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (6, 0.0, (CAST('2022-12-09 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (7, 0.0, (CAST('2022-12-06 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (8, 0.0, (CAST('2022-11-12 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (9, 0.0, (CAST('2022-10-12 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (10, 0.0, (CAST('2022-10-15 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (11, 0.0, (CAST('2022-11-18 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (12, 0.0, (CAST('2022-06-12 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (13, 0.0, (CAST('2022-12-22 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (14, 0.0, (CAST('2022-12-23 22:22:22.427' AS DateTime)), true, 0);
insert into proposal (id, amount, creation_date, is_valid, proposal_status)
values (15, 0.0, (CAST('2022-12-24 22:22:22.427' AS DateTime)), true, 0);

insert into contact (id, email, home_phone, mobile_phone) values (16, 'rooney@gmail.com', null, '9945789789');
insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (2, (CAST('1985-10-24 15:32:06.427' AS DateTime)), 'Wayne', 'Rooney', '2410985800004', '4856456', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 16);

insert into contact (id, email, home_phone, mobile_phone) values (17, 'anaivanovic@gmail.com', null, '8845789789');
insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (3, (CAST('1987-11-06 15:32:06.427' AS DateTime)), 'Ana', 'Ivanovic', '0611987800004', '4856457', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 17);

insert into contact (id, email, home_phone, mobile_phone) values (18, 'gerrad@gmail.com', null, '8745789789');
insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (4, (CAST('1980-05-30 15:32:06.427' AS DateTime)), 'Steven', 'Gerrard', '3005980800004', '565656', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 18);

insert into contact (id, email, home_phone, mobile_phone) values (19, 'rba@gmail.com', null, '8645789789');
insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (5, (CAST('1988-04-14 15:32:06.427' AS DateTime)), 'Roberto', 'Bautista Agut', '1404988800004', '5656506', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 19);

insert into contact (id, email, home_phone, mobile_phone) values (20, 'marijakaran@gmail.com', null, '8545789789');
insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (6, (CAST('1982-04-29 15:32:06.427' AS DateTime)), 'Marija', 'Karan', '2904982800004', '565612506', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 20);

insert into contact (id, email, home_phone, mobile_phone) values (21, 'navratilova@gmail.com', null, '8445789789');
insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (7, (CAST('1956-10-18 15:32:06.427' AS DateTime)), 'Martina', 'Navratilova', '1810956800004', '569352506', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 21);

insert into contact (id, email, home_phone, mobile_phone) values (22, 'anica.dobra@gmail.com', null, '840009789');
insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (8, (CAST('1963-06-03 15:32:06.427' AS DateTime)), 'Anica', 'Dobra', '0306963800004', '56053506', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 22);

insert into contact (id, email, home_phone, mobile_phone) values (23, 'milena.dravic@gmail.com', null, '820009789');
insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (9, (CAST('1940-10-05 15:32:06.427' AS DateTime)), 'Milena', 'Dravic', '0510940800004', '56053511', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 23);

insert into contact (id, email, home_phone, mobile_phone) values (24, 'bbogdanovic@gmail.com', null, '810109789');
insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (10, (CAST('1992-08-18 15:32:06.427' AS DateTime)), 'Bogdan', 'Bogdanovic', '1808992800004', '16012511', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 24);

insert into contact (id, email, home_phone, mobile_phone) values (25, 'nkalinic@gmail.com', null, '810190489');
insert into driver (id, birth, first_name, last_name, jmbg, licence_num, licence_obtained, years_insured, address_id, contact_id)
values (11, (CAST('1991-11-08 15:32:06.427' AS DateTime)), 'Nikola', 'Kalinic', '0811991800004', '16452511', (CAST('2000-12-25 15:32:06.427' AS DateTime)), 10, 1, 25);

insert into accident_history (id, description, time_happened, was_responsible, driver_id)
values (2, 'Rear-End collision', (CAST('2021-11-03 08:23:12.117' AS DateTime)), false, 2);
insert into accident_history (id, description, time_happened, was_responsible, driver_id)
values (3, 'Broad-Side collision', (CAST('2022-05-12 19:45:33.404' AS DateTime)), false, 3);
insert into accident_history (id, description, time_happened, was_responsible, driver_id)
values (4, 'Drunk driving', (CAST('2023-01-12 05:14:15.148' AS DateTime)), true, 4);
insert into accident_history (id, description, time_happened, was_responsible, driver_id)
values (5, 'Speeding', (CAST('2022-09-19 12:02:06.777' AS DateTime)), true, 5);
