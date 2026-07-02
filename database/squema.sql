DROP DATABASE IF EXISTS tarefas_dados;
CREATE DATABASE tarefas_dados;
USE tarefas_dados;

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id_user BIGINT AUTO_INCREMENT PRIMARY KEY,
    name_user VARCHAR(50) NOT NULL,
    password_user VARCHAR(30) NOT NULL,
    email_user VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tasks (
	id_task BIGINT AUTO_INCREMENT PRIMARY KEY,
    who_task BIGINT NOT NULL,
    task_name VARCHAR(100) NOT NULL,
    task_date DATETIME NOT NULL,
    CONSTRAINT fk_who_task FOREIGN KEY (who_task) 
		REFERENCES users(id_user)
);

CREATE TABLE log_operation (
	id_log BIGINT AUTO_INCREMENT PRIMARY KEY,
    how_table VARCHAR(40) NOT NULL,
    type_operation ENUM("INSERT", "DELETE", "UPDATE") NOT NULL,
    date_operation TIMESTAMP NOT NULL
);

DELIMITER $$

CREATE TRIGGER tr_log_insert_users AFTER INSERT
ON users
FOR EACH ROW
BEGIN
	INSERT INTO log_operation (how_table, type_operation, date_operation)
    VALUES ("users", "INSERT", NOW());
END $$

CREATE TRIGGER tr_log_delete_users AFTER DELETE
ON users
FOR EACH ROW
BEGIN
	INSERT INTO log_operation (how_table, type_operation, date_operation)
    VALUES ("users", "DELETE", NOW());
END $$

CREATE TRIGGER tr_log_update_users AFTER UPDATE
ON users
FOR EACH ROW
BEGIN
	INSERT INTO log_operation (how_table, type_operation, date_operation)
    VALUES ("users", "UPDATE", NOW());
END $$

CREATE TRIGGER tr_log_insert_tasks AFTER INSERT
ON tasks
FOR EACH ROW
BEGIN
	INSERT INTO log_operation (how_table, type_operation, date_operation)
    VALUES ("tasks", "INSERT", NOW());
END $$

CREATE TRIGGER tr_log_delete_tasks AFTER DELETE
ON tasks
FOR EACH ROW
BEGIN
	INSERT INTO log_operation (how_table, type_operation, date_operation)
    VALUES ("tasks" , "DELETE", NOW());
END $$

CREATE TRIGGER tr_log_update_tasks AFTER UPDATE
ON tasks
FOR EACH ROW
BEGIN
	INSERT INTO log_operation (how_table, type_operation, date_operation)
    VALUES ("tasks", "UPDATE", NOW());
END $$

DELIMITER ;