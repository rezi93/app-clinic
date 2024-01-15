create database doctor;

use doctor;
create table dtable(
id int,
first_name nvarchar(100),
last_name nvarchar(250),
email varchar(100),
password varchar(100),
id_number varchar(50),
category nvarchar(250),
rating varchar(10),
descri nvarchar(max),
thumbnail varchar(MAX),
images varchar(MAX)
);


INSERT INTO dtable(id, first_name, last_name, email, password, id_number, category, rating, descri, thumbnail, images)
VALUES(
  1,
  N'გიორგი',
  N'ხორავა',
  'clinic@gmail.com',
  '11111111',
  '000000',
  N'კარდიოლოგი, არითმოლოგი',
  '5',
  N'2017 - დღემდე, ჩვენი კლინიკის გენერალური დირექტორი,2002 - დღემდე, ჩვენი კომპიუტერული ტომოგრაფიის განყოფილების ხელმძღვანელი,1995 - დღემდე, კარდიოლოგი / არითმოლოგი',
  'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
  'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg'
);

INSERT INTO dtable(id, first_name, last_name,email, password, id_number, category, rating, descri, thumbnail, images)
VALUES(
  2,
  N'ნატალია ',
  N'გოგოხია',
  'clinic@gmail.com',
  '22222222',
  '000000',
  N'ბავშვთა და მოზრდილთა კარდიოლოგი',
  '5',
   N'2017 - დღემდე, ჩვენი კლინიკის  დირექტორი,2005 - დღემდე, ჩვენი კომპიუტერული ტომოგრაფიის განყოფილების ხელმძღვანელი,1995 - დღემდე, კარდიოლოგი / არითმოლოგი',
 'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
 ' https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg='),
(
  3,
  N'ანა  ',
  N'ნინიძე',
  'clinic@gmail.com',
  '33333333',
  '000000',
  N'კარდიოქირურგი',
  '5',
   N'2017 - დღემდე, ჩვენი კლინიკის გენერალური დირექტორი,2002 - დღემდე, ჩვენი კომპიუტერული ტომოგრაფიის განყოფილების ხელმძღვანელი,1995 - დღემდე, კარდიოლოგი / არითმოლოგი',
'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
 ' https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg='),
(
  4,
  N'გიორგი  ',
  N'გაბიტაშვილი',
  'clinic@gmail.com',
  '44444444',
  '000000',
  N'კარდიოლოგი / არითმოლოგი',
  '5',
   N'2017 - დღემდე, ჩვენი კლინიკის გენერალური დირექტორი,2002 - დღემდე, ჩვენი კომპიუტერული ტომოგრაფიის განყოფილების ხელმძღვანელი,1995 - დღემდე, კარდიოლოგი / არითმოლოგი',
  'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
  'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg'),
(
  5,
  N'ბარბარე   ',
  N'ქორთუა',
  'clinic@gmail.com',
  '55555555',
  '000000',
  N'კარდიოქირურგი',
  '5',
   N'2017 - დღემდე, ჩვენი კლინიკის გენერალური დირექტორი,2002 - დღემდე, ჩვენი კომპიუტერული ტომოგრაფიის განყოფილების ხელმძღვანელი,1995 - დღემდე, კარდიოლოგი / არითმოლოგი',
 'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
 ' https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg='),
(
  6,
  N'სოფია   ',
  N'გოგიაშვილი',
  'clinic@gmail.com',
  '66666666',
  '000000',
  N'ბავშვთა და მოზრდილთა კარდიოლოგი',
  '5',
   N'2017 - დღემდე, ჩვენი კლინიკის გენერალური დირექტორი,2002 - დღემდე, ჩვენი კომპიუტერული ტომოგრაფიის განყოფილების ხელმძღვანელი,1995 - დღემდე, კარდიოლოგი / არითმოლოგი',
  (SELECT BulkColumn FROM OPENROWSET(BULK N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\image\Ellipse 4.png', SINGLE_BLOB) AS Image),
  (SELECT BulkColumn FROM OPENROWSET(BULK N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\image\Ellipse 30.png', SINGLE_BLOB) AS Image)
),
(
  7,
  N'სოფი   ',
  N'გოგაშვილი',
  'clinic@gmail.com',
  '77777777',
  '000000',
  N' კარდიოლოგი',
  '5',
   N'2017 - დღემდე, ჩვენი კლინიკის გენერალური დირექტორი,2002 - დღემდე, ჩვენი კომპიუტერული ტომოგრაფიის განყოფილების ხელმძღვანელი,1995 - დღემდე, კარდიოლოგი / არითმოლოგი',
  'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
 ' https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg='
),
(
  8,
  N'ნიკო   ',
  N'გოგიძე',
  'clinic@gmail.com',
  '88888888',
  '000000',
  N' ქირურგი',
  '5',
   N'2017 - დღემდე, ჩვენი კლინიკის გენერალური დირექტორი,2002 - დღემდე, ჩვენი კომპიუტერული ტომოგრაფიის განყოფილების ხელმძღვანელი,1995 - დღემდე, კარდიოლოგი / არითმოლოგი',
   'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
  'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg'),
(
  9,
  N'ბექა   ',
  N'დარჩია',
  'clinic@gmail.com',
  '99999999',
  '000000',
  N' ტრავმატოლოგი',
  '5',
   N'2017 - დღემდე, ჩვენი კლინიკის გენერალური დირექტორი,2002 - დღემდე, ჩვენი კომპიუტერული ტომოგრაფიის განყოფილების ხელმძღვანელი,1995 - დღემდე, კარდიოლოგი / არითმოლოგი',
   'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
  'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg');

select *from dtable;


CREATE PROCEDURE ChangeDoctorPassword
    @Id INT,
    @CurrentPassword NVARCHAR(100),
    @NewPassword NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dtable
    SET password = @NewPassword
    WHERE id = @Id
        AND password = @CurrentPassword;
END