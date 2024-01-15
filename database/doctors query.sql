create table dtable(
id int,
first_name nvarchar(100),
last_name nvarchar(250),
category nvarchar(250),
rating varchar(10),
thumbnail VARBINARY(MAX),
images VARBINARY(MAX)
);


INSERT INTO dtable(id, first_name, last_name, category, rating, thumbnail, images)
VALUES(
  1,
  N'გიორგი',
  N'ხორავა',
  N'კარდიოლოგი, არითმოლოგი',
  '5',
  (SELECT BulkColumn FROM OPENROWSET(BULK N'C:\Users\reziq\Desktop\image\Ellipse 5.png', SINGLE_BLOB) AS Image),
  (SELECT BulkColumn FROM OPENROWSET(BULK N'C:\Users\reziq\Desktop\Ellipse 23.png', SINGLE_BLOB) AS Image)
);
 select *from dtable;
 alter table dtable
 ALTER COLUMN thumbnail varchar(MAX) ;

 alter table dtable
 ALTER COLUMN images varchar(MAX) ;

DECLARE @category NVARCHAR(250);
SELECT @category = category FROM dtable;

alter table dtable
add descri nvarchar(max);


