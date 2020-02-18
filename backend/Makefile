create-user-model:
	@ npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

run-migrations:
	@ npx sequelize-cli db:migrate

rollback-migrations:
	@ npx sequelize-cli db:migrate:undo:all

rollback-table:
	@ npx sequelize-cli db:migrate:undo --name $(table)

seed-database:
	@ npx sequelize-cli db:seed:all