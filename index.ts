import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'admin',
  port: 15432,
});

/*
 * +-----------------+
 * | 人力资源管理系统 |
 * +-----------------+
 *
 * 系统架构概览：
 * +----------+    +----------+    +------+
 * | 业务群组 | <- | 业务单元 | <- | 部门 |
 * +----------+    +----------+    +------+
 *                                    ^
 *                                    |
 *                                 +------+
 *                                 | 团队 |
 *                                 +------+
 *                                    ^
 *                                    |
 *              +------------+    +--------+    +-----------+
 *              | 管理员账户 | <- | 员工   | <- |  账户     |
 *              +------------+    +--------+    +-----------+
 *
 * 表关系说明：
 * 1. 员工 (employees):
 *    - 属于一个部门 (departments)
 *    - 可能属于一个团队 (teams)
 *    - 可能是其他员工的管理者
 *    - 可能有一个关联的账户 (accounts)
 *    - 可能是一个管理员 (administrators)
 * 
 * 2. 部门 (departments):
 *    - 属于一个业务单元 (business_units)
 *    - 包含多个员工
 *    - 可能包含多个团队
 * 
 * 3. 团队 (teams):
 *    - 属于一个部门
 *    - 包含多个员工
 * 
 * 4. 业务群组 (business_groups):
 *    - 包含多个业务单元
 * 
 * 5. 业务单元 (business_units):
 *    - 属于一个业务群组
 *    - 包含多个部门
 * 
 * 6. 管理员 (administrators):
 *    - 关联到一个员工
 * 
 * 7. 账户 (accounts):
 *    - 关联到一个员工
 */

// 创建员工表
async function createEmployeesTable() {
  const query = `
    CREATE TABLE employees (
      employee_id SERIAL PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      hire_date DATE NOT NULL,
      job_title VARCHAR(100) NOT NULL,
      salary DECIMAL(10, 2) NOT NULL,
      department_id INTEGER,
      team_id INTEGER,
      manager_id INTEGER REFERENCES employees(employee_id)
    )
  `;
  try {
    await pool.query(query);
    console.log('员工表创建成功');
  } catch (err) {
    console.error('创建员工表时出错:', err);
  }
}

// 创建部门表
async function createDepartmentsTable() {
  const query = `
    CREATE TABLE departments (
      department_id SERIAL PRIMARY KEY,
      department_name VARCHAR(100) NOT NULL,
      bu_id INTEGER
    )
  `;
  try {
    await pool.query(query);
    console.log('部门表创建成功');
  } catch (err) {
    console.error('创建部门表时出错:', err);
  }
}

// 创建团队表
async function createTeamsTable() {
  const query = `
    CREATE TABLE teams (
      team_id SERIAL PRIMARY KEY,
      team_name VARCHAR(100) NOT NULL,
      department_id INTEGER
    )
  `;
  try {
    await pool.query(query);
    console.log('团队表创建成功');
  } catch (err) {
    console.error('创建团队表时出错:', err);
  }
}

// 创建业务群组表
async function createBusinessGroupsTable() {
  const query = `
    CREATE TABLE business_groups (
      bg_id SERIAL PRIMARY KEY,
      bg_name VARCHAR(100) NOT NULL
    )
  `;
  try {
    await pool.query(query);
    console.log('业务群组表创建成功');
  } catch (err) {
    console.error('创建业务群组表时出错:', err);
  }
}

// 创建业务单元表
async function createBusinessUnitsTable() {
  const query = `
    CREATE TABLE business_units (
      bu_id SERIAL PRIMARY KEY,
      bu_name VARCHAR(100) NOT NULL,
      bg_id INTEGER
    )
  `;
  try {
    await pool.query(query);
    console.log('业务单元表创建成功');
  } catch (err) {
    console.error('创建业务单元表时出错:', err);
  }
}

// 创建管理员表
async function createAdministratorsTable() {
  const query = `
    CREATE TABLE administrators (
      admin_id SERIAL PRIMARY KEY,
      employee_id INTEGER UNIQUE,
      admin_level INTEGER NOT NULL
    )
  `;
  try {
    await pool.query(query);
    console.log('管理员表创建成功');
  } catch (err) {
    console.error('创建管理员表时出错:', err);
  }
}

// 创建账户表
async function createAccountsTable() {
  const query = `
    CREATE TABLE accounts (
      account_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      employee_id INTEGER UNIQUE,
      is_active BOOLEAN DEFAULT true,
      last_login TIMESTAMP
    )
  `;
  try {
    await pool.query(query);
    console.log('账户表创建成功');
  } catch (err) {
    console.error('创建账户表时出错:', err);
  }
}

// 建立表之间的关系
// 数据库架构图:
//
// +----------------+     +----------------+     +----------------+
// | business_groups| <-- | business_units | <-- |  departments   |
// +----------------+     +----------------+     +----------------+
//                                                       ^
//                                                       |
//                                                       v
// +----------------+     +----------------+     +----------------+
// |  administrators| --> |   employees    | <-- |     teams      |
// +----------------+     +----------------+     +----------------+
//                               ^
//                               |
//                        +----------------+
//                        |    accounts    |
//                        +----------------+
//

async function createTableRelationships() {
  const queries = [
    `
    ALTER TABLE employees
    ADD CONSTRAINT fk_employee_department
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
    `,
    `
    ALTER TABLE employees
    ADD CONSTRAINT fk_employee_team
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
    `,
    `
    ALTER TABLE departments
    ADD CONSTRAINT fk_department_bu
    FOREIGN KEY (bu_id) REFERENCES business_units(bu_id)
    `,
    `
    ALTER TABLE teams
    ADD CONSTRAINT fk_team_department
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
    `,
    `
    ALTER TABLE business_units
    ADD CONSTRAINT fk_bu_bg
    FOREIGN KEY (bg_id) REFERENCES business_groups(bg_id)
    `,
    `
    ALTER TABLE administrators
    ADD CONSTRAINT fk_admin_employee
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    `,
    `
    ALTER TABLE accounts
    ADD CONSTRAINT fk_account_employee
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    `
  ];

  for (const query of queries) {
    try {
      await pool.query(query);
      console.log('表关系建立成功');
    } catch (err) {
      console.error('建立表关系时出错:', err);
    }
  }
}

// 删除所有表
async function dropAllTables() {
  const tables = [
    'accounts',
    'administrators',
    'employees',
    'teams',
    'departments',
    'business_units',
    'business_groups'
  ];

  for (const table of tables) {
    try {
      await pool.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
      console.log(`表 ${table} 删除成功（如果存在）`);
    } catch (err) {
      console.error(`删除表 ${table} 时出错:`, err);
    }
  }
}

// 执行所有 DDL
async function executeDDL() {
  /*
   * 执行顺序：
   * 1. 删除所有已存在的表
   * 2. 创建新表
   * 3. 建立表关系
   */
  await dropAllTables();
  await createBusinessGroupsTable();
  await createBusinessUnitsTable();
  await createDepartmentsTable();
  await createTeamsTable();
  await createEmployeesTable();
  await createAdministratorsTable();
  await createAccountsTable();
  await createTableRelationships();
  console.log('所有 DDL 执行完成');
}

executeDDL();


