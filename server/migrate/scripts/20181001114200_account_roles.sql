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

-- // account roles
-- Migration SQL that makes the change goes here.

CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
	role VARCHAR(500),
	PRIMARY KEY (id)
)
;
CREATE TABLE accounts_x_roles (
	id INT NOT NULL AUTO_INCREMENT,
	accounts_id INT,
	roles_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (accounts_id) REFERENCES accounts(id),
	FOREIGN KEY (roles_id) REFERENCES roles(id)
)
;

INSERT INTO roles (role) VALUES ('admin')
;

-- //@UNDO
-- SQL to undo the change goes here.


DROP TABLE accounts_x_roles
;
DROP TABLE roles
;
