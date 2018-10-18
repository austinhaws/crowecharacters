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

-- // image details
-- Migration SQL that makes the change goes here.

ALTER TABLE image ADD width INT NOT NULL
;
ALTER TABLE image ADD height INT NOT NULL
;
ALTER TABLE image ADD original_name VARCHAR(500) NOT NULL
;
ALTER TABLE image ADD disk_name  VARCHAR(500) NOT NULL
;

-- //@UNDO
-- SQL to undo the change goes here.

ALTER TABLE image DROP COLUMN width
;
ALTER TABLE image DROP COLUMN height
;
ALTER TABLE image DROP COLUMN original_name
;
ALTER TABLE image DROP COLUMN disk_name
;
