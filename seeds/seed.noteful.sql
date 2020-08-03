insert into folders (name)
values
  ('Important'),
  ('Super'),
  ('Spangley');
insert into notes (name, modified, content, folder_id)
values
  ('name1', now(), 'content1', 1),
  ('name2', now(), 'content2', 1),
  ('name3', now(), 'content3', 1),
  ('name4', now(), 'content4', 2),
  ('name5', now(), 'content5', 2),
  ('name6', now(), 'content6', 2),
  ('name7', now(), 'content7', 3),
  ('name8', now(), 'content8', 3),
  ('name9', now(), 'content9', 3),
  ('name0', now(), 'content0', 1);