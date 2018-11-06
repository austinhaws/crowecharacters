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

-- // image cateogry images
-- Migration SQL that makes the change goes here.

ALTER TABLE image_category ADD image_file VARCHAR(500)
;

UPDATE image_category SET image_file = 'Boots.png' WHERE guid = 'body'
;
UPDATE image_category SET image_file = 'Boots.png' WHERE guid = 'boots'
;
UPDATE image_category SET image_file = 'Chest.png' WHERE guid = 'chest'
;
UPDATE image_category SET image_file = 'Cloak.png' WHERE guid = 'cloak'
;
UPDATE image_category SET image_file = 'Hands.png' WHERE guid = 'hands'
;
UPDATE image_category SET image_file = 'Head.png' WHERE guid = 'head'
;
UPDATE image_category SET image_file = 'Pants.png' WHERE guid = 'pants'
;
UPDATE image_category SET image_file = 'Waist.png' WHERE guid = 'waist'
;
UPDATE image_category SET image_file = 'Weapon.png' WHERE guid = 'weapon'
;

-- //@UNDO
-- SQL to undo the change goes here.


ALTER TABLE image_category DROP COLUMN image_file
;