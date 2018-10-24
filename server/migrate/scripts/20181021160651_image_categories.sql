--
--    Copyright 2010-2016 the original author or authors.
--
--    Licensed under the Apache License, Version 2.0 (the "License");
--    you may not use this file except in compliance with the License.
--    You may obtain a copy of the License at
--
--       http://www.apache.org/licenses/LICENSE-2.0
--
--    Unless required by applicable law or agreed to in writing, software
--    distributed under the License is distributed on an "AS IS" BASIS,
--    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
--    See the License for the specific language governing permissions and
--    limitations under the License.
--

-- // image categories
-- Migration SQL that makes the change goes here.

ALTER TABLE image_category ADD display_order INT
;

INSERT INTO image_category (guid, name, display_order) VALUES
   ('body', 'Body', 0)
;
INSERT INTO image_category (guid, name, display_order) VALUES
   ('head', 'Head', 1)
;
INSERT INTO image_category (guid, name, display_order) VALUES
   ('chest', 'Chest', 2)
;
INSERT INTO image_category (guid, name, display_order) VALUES
   ('pants', 'Pants', 3)
;
INSERT INTO image_category (guid, name, display_order) VALUES
   ('weapon', 'Weapon', 4)
;
INSERT INTO image_category (guid, name, display_order) VALUES
   ('boots', 'Boots', 5)
;
INSERT INTO image_category (guid, name, display_order) VALUES
   ('hands', 'Hands', 6)
;
INSERT INTO image_category (guid, name, display_order) VALUES
   ('waist', 'Waist', 7)
;
INSERT INTO image_category (guid, name, display_order) VALUES
   ('cloak', 'Cloak', 8)
;

-- //@UNDO
-- SQL to undo the change goes here.


DELETE FROM image_category
;
ALTER TABLE image_category DROP display_order
;