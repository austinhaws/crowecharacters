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

-- // doll fields
-- Migration SQL that makes the change goes here.

ALTER TABLE doll ADD name VARCHAR(500)
;
ALTER TABLE doll ADD image_set_id INT
;
ALTER TABLE doll ADD CONSTRAINT doll_imageset_fk FOREIGN KEY (image_set_id) REFERENCES image_set(id)
;


-- //@UNDO
-- SQL to undo the change goes here.

ALTER TABLE doll DROP COLUMN name
;
ALTER TABLE doll DROP FOREIGN KEY doll_imageset_fk
;
ALTER TABLE doll DROP COLUMN image_set_id
;