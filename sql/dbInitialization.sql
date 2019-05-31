INSERT INTO `herflow`.`organizations` (`name`, `code`, `createdAt`, `updatedAt`) VALUES ('Test organization', 'TEST', '2018-01-01', '2018-01-01');

set @ORG_ID = LAST_INSERT_ID();

INSERT INTO `herflow`.`workflows` (`name`, `createdAt`, `updatedAt`, `organizationId`) VALUES ('Workflow Test', '2018-01-01', '2018-01-01', @ORG_ID);

set @WF_ID = LAST_INSERT_ID();

INSERT INTO `herflow`.`activities` (`name`, `isMain`, `type`, `createdAt`, `updatedAt`, `workflowId`) VALUES ('Test workflow main', '1', 'Sequence', '2018-01-01', '2018-01-01', @WF_ID);

set @AC_MAIN = LAST_INSERT_ID();

INSERT INTO `herflow`.`activities` (`name`, `isMain`, `type`, `createdAt`, `updatedAt`, `workflowId`, `parentActivityId`) VALUES ('Start', '0', 'Initial', '2018-01-01', '2018-01-01', @WF_ID, @AC_MAIN);

INSERT INTO `herflow`.`activities` (`name`, `isMain`, `type`, `createdAt`, `updatedAt`, `workflowId`, `parentActivityId`, `previousActivityId`) VALUES ('Task', '0', 'Task', '2018-01-01', '2018-01-01',  @WF_ID, @AC_MAIN, LAST_INSERT_ID());

INSERT INTO `herflow`.`activities` (`name`, `isMain`, `type`, `createdAt`, `updatedAt`, `workflowId`, `parentActivityId`, `previousActivityId`) VALUES ('Final', '0', 'Final', '2018-01-01', '2018-01-01',  @WF_ID, @AC_MAIN, LAST_INSERT_ID());

