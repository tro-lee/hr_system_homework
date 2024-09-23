三 .数据字典
3.1 实体及属性
| 实体 | 属性 | 数据类型 | 描述 |
|------|------|----------|------|
| Organization | id | INT (PK) | 唯一标识每个组织的编号。 |
| | name | VARCHAR(255) | 组织的名称。 |
| | parentId | INT (FK) | 父组织的编号，可为空。 |
| | children | ARRAY | 子组织列表。 |
| | employees | ARRAY | 该组织下的员工列表。 |
| | jobOpenings | ARRAY | 该组织发布的职位列表。 |
| Employee | id | INT (PK) | 唯一标识每位员工的编号。 |
| | name | VARCHAR(255) | 员工的姓名。 |
| | position | VARCHAR(255) | 员工的职位。 |
| | hireDate | DATE | 员工的入职日期。 |
| | phone | VARCHAR(255) | 员工的联系电话。 |
| | organizationId | INT (FK) | 员工所属组织的编号。 |
| | ResignationApplication | ARRAY | 员工的离职申请列表。 |
| | FormerEmployeeAccount | ARRAY | 员工的离职人员账户列表。 |
| | salaryBills | ARRAY | 员工的薪资账单列表。 |
| | billApplications | ARRAY | 员工的账单申请列表。 |
| | salaryStructures | ARRAY | 员工的薪资结构列表。 |
| | salaryAdjustments | ARRAY | 员工的薪资调整列表。 |
| | bonuses | ARRAY | 员工的奖金列表。 |
| | attendances | ARRAY | 员工的考勤记录列表。 |
| | deductions | ARRAY | 员工的扣除项列表。 |
| JobOpening | id | INT (PK) | 唯一标识每个职位的编号。 |
| | title | VARCHAR(255) | 职位的标题。 |
| | description | TEXT | 职位的描述。 |
| | requirements | TEXT | 职位的要求。 |
| | salaryRange | VARCHAR(255) | 职位的薪资范围。 |
| | status | VARCHAR(50) | 职位的状态，例如：'开放', '已关闭'。 |
| | createdAt | DATETIME | 职位的创建时间。 |
| | updatedAt | DATETIME | 职位的更新时间。 |
| | organizationId | INT (FK) | 发布该职位的组织编号。 |
| | applications | ARRAY | 该职位收到的申请列表。 |
| Candidate | id | INT (PK) | 唯一标识每位候选人的编号。 |
| | name | VARCHAR(255) | 候选人的姓名。 |
| | email | VARCHAR(255) (UNIQUE) | 候选人的邮箱，唯一。 |
| | phone | VARCHAR(255) | 候选人的电话，可选。 |
| | applications | ARRAY | 候选人提交的申请列表。 |
| Application | id | INT (PK) | 唯一标识每个申请的编号。 |
| | candidateId | INT (FK) | 候选人的编号。 |
| | jobOpeningId | INT (FK) | 申请职位的编号。 |
| | status | VARCHAR(50) | 申请状态，例如：'初筛通过', '待安排面试', 'offer 待发'。 |
| | nextStep | VARCHAR(255) | 下一步操作，可选。 |
| | createdAt | DATETIME | 申请的创建时间。 |
| | updatedAt | DATETIME | 申请的更新时间。 |
| | interviews | ARRAY | 该申请相关的面试列表。 |
| | offer | OBJECT | 该申请相关的 offer，可能为空。 |
| Interview | id | INT (PK) | 唯一标识每个面试的编号。 |
| | applicationId | INT (FK) | 关联的申请编号。 |
| | scheduledAt | DATETIME | 面试安排时间。 |
| | feedback | TEXT | 面试反馈，可选。 |
| | status | VARCHAR(50) | 面试状态，例如：'待进行', '已完成', '已取消'。 |
| Offer | id | INT (PK) | 唯一标识每个 offer 的编号。 |
| | applicationId | INT (FK) (UNIQUE) | 关联的申请编号，唯一。 |
| | salary | VARCHAR(255) | Offer 的薪资。 |
| | startDate | DATE | Offer 的入职日期。 |
| | status | VARCHAR(50) | Offer 的状态，例如：'待生成', '待审批', '已批', '已发送'。 |
| | isAccepted | BOOLEAN | 表示 Offer 是否被接受。 |
| | createdAt | DATETIME | Offer 的创建时间。 |
| | updatedAt | DATETIME | Offer 的更新时间。 |
| ResignationApplication | id | INT (PK) | 唯一标识每个离职申请的编号。 |
| | employeeId | INT (FK) | 申请离职的员工编号。 |
| | reason | TEXT | 离职原因。 |
| | status | VARCHAR(50) | 离职申请状态，例如：'待审批', '已批准', '已拒绝'。 |
| | createdAt | DATETIME | 离职申请的创建时间。 |
| | updatedAt | DATETIME | 离职申请的更新时间。 |
| FormerEmployeeAccount | id | INT (PK) | 唯一标识每个离职人员账户的编号。 |
| | employeeId | INT (FK) | 离职员工编号。 |
| | email | VARCHAR(255) (UNIQUE) | 离职员工邮箱，唯一。 |
| | phone | VARCHAR(255) | 离职员工电话，可选。 |
| | lastWorkingDay | DATE | 最后工作日。 |
| | createdAt | DATETIME | 离职人员账户的创建时间。 |
| | updatedAt | DATETIME | 离职人员账户的更新时间。 |
| SalaryBill | id | INT (PK) | 唯一标识每个薪资账单的编号。 |
| | employeeId | INT (FK) | 关联的员工编号。 |
| | amount | DECIMAL(10,2) | 薪资总额。 |
| | billDate | DATE | 账单日期。 |
| | status | VARCHAR(50) | 账单状态，例如：'待支付', '已支付', '已取消'。 |
| | createdAt | DATETIME | 薪资账单的创建时间。 |
| | updatedAt | DATETIME | 薪资账单的更新时间。 |
| | billApplications | ARRAY | 与该账单相关的申请。 |
| | deductions | ARRAY | 该账单的扣除项。 |
| BillApplication | id | INT (PK) | 唯一标识每个账单申请的编号。 |
| | salaryBillId | INT (FK) | 关联的薪资账单编号。 |
| | applicantId | INT (FK) | 申请人（员工）编号。 |
| | reason | TEXT | 申请原因。 |
| | status | VARCHAR(50) | 申请状态，例如：'待审核', '已批准', '已拒绝'。 |
| | createdAt | DATETIME | 账单申请的创建时间。 |
| | updatedAt | DATETIME | 账单申请的更新时间。 |
| SalaryStructure | id | INT (PK) | 唯一标识每个薪资结构的编号。 |
| | employeeId | INT (FK) | 关联的员工编号。 |
| | baseSalary | DECIMAL(10,2) | 基本工资。 |
| | allowances | DECIMAL(10,2) | 津贴。 |
| | benefits | DECIMAL(10,2) | 福利。 |
| | startDate | DATE | 生效开始日期。 |
| | endDate | DATE | 生效结束日期，可为空（表示当前有效）。 |
| | createdAt | DATETIME | 薪资结构的创建时间。 |
| | updatedAt | DATETIME | 薪资结构的更新时间。 |
| SalaryAdjustment | id | INT (PK) | 唯一标识每个薪资调整的编号。 |
| | employeeId | INT (FK) | 关联的员工编号。 |
| | oldSalary | DECIMAL(10,2) | 调整前的薪资。 |
| | newSalary | DECIMAL(10,2) | 调整后的薪资。 |
| | adjustmentDate | DATE | 调整日期。 |
| | reason | TEXT | 调整原因。 |
| | approvedBy | VARCHAR(255) | 批准人。 |
| | createdAt | DATETIME | 薪资调整的创建时间。 |
| | updatedAt | DATETIME | 薪资调整的更新时间。 |
| Bonus | id | INT (PK) | 唯一标识每个奖金的编号。 |
| | employeeId | INT (FK) | 关联的员工编号。 |
| | amount | DECIMAL(10,2) | 奖金金额。 |
| | type | VARCHAR(50) | 奖金类型，例如：'年终奖', '季度绩效', '项目奖金'。 |
| | description | TEXT | 奖金描述。 |
| | issueDate | DATE | 发放日期。 |
| | createdAt | DATETIME | 奖金的创建时间。 |
| | updatedAt | DATETIME | 奖金的更新时间。 |
| Attendance | id | INT (PK) | 唯一标识每个考勤记录的编号。 |
| | employeeId | INT (FK) | 关联的员工编号。 |
| | date | DATE | 考勤日期。 |
| | checkIn | DATETIME | 签到时间。 |
| | checkOut | DATETIME | 签退时间，可为空。 |
| | status | VARCHAR(50) | 考勤状态，例如：'正常', '迟到', '早退', '缺勤'。 |
| | note | TEXT | 备注，可为空。 |
| | createdAt | DATETIME | 考勤记录的创建时间。 |
| | updatedAt | DATETIME | 考勤记录的更新时间。 |
| Deduction | id | INT (PK) | 唯一标识每个扣除项的编号。 |
| | employeeId | INT (FK) | 关联的员工编号。 |
| | salaryBillId | INT (FK) | 关联的薪资账单编号。 |
| | type | VARCHAR(50) | 扣除类型，例如：'所得税', '社保', '公积金', '其他扣除'。 |
| | amount | DECIMAL(10,2) | 扣除金额。 |
| | description | TEXT | 扣除描述，可为空。 |
| | createdAt | DATETIME | 扣除项的创建时间。 |
| | updatedAt | DATETIME | 扣除项的更新时间。 |

3.2 数据关系
| 关系名称 | 参与实体 | 基数 | 关系属性 |
|---------------|---------------------------|----------|--------------------------------------|
| OrganizationHierarchy | Organization, Organization | 多对一 | 无 |
| employs | Organization, Employee | 一对多 | 无 |
| posts | Organization, JobOpening | 一对多 | 无 |
| submits | Employee, ResignationApplication | 一对多 | 无 |
| has | Employee, FormerEmployeeAccount | 一对多 | 无 |
| receives | Employee, SalaryBill | 一对多 | 无 |
| requests | Employee, BillApplication | 一对多 | 无 |
| has | Employee, SalaryStructure | 一对多 | 无 |
| undergoes | Employee, SalaryAdjustment | 一对多 | 无 |
| earns | Employee, Bonus | 一对多 | 无 |
| records | Employee, Attendance | 一对多 | 无 |
| has | Employee, Deduction | 一对多 | 无 |
| receives | JobOpening, Application | 一对多 | 无 |
| submits | Candidate, Application | 一对多 | 无 |
| schedules | Application, Interview | 一对多 | 无 |
| results | Application, Offer | 一对一 | 无 |
| includes | SalaryBill, Deduction | 一对多 | 无 |
| receives | SalaryBill, BillApplication | 一对多 | 无 |

3.3 实体-关系说明
3.3.1 OrganizationHierarchy（组织与父组织）
· 参与实体：Organization, Organization
· 基数：多对一（Many-to-One）
· 描述：每个组织可以有一个父组织，一个父组织可以有多个子组织。
· 参与类型：
· 组织：部分参与（一个组织可以没有父组织）
· 父组织：全程参与（每个父组织可以有多个子组织）

3.3.2 employs（组织与员工）
· 参与实体：Organization, Employee
· 基数：一对多（One-to-Many）
· 描述：每个组织可以有多个员工，每个员工只能属于一个组织。
· 参与类型：
· 组织：全程参与（每个组织必须有员工）
· 员工：全程参与（每个员工必须属于一个组织）

3.3.3 posts（组织与职位开放）
· 参与实体：Organization, JobOpening
· 基数：一对多（One-to-Many）
· 描述：每个组织可以发布多个职位开放，每个职位开放只能属于一个组织。
· 参与类型：
· 组织：部分参与（一个组织可以没有职位开放）
· 职位开放：全程参与（每个职位开放必须属于一个组织）

3.3.4 submits（员工与离职申请）
· 参与实体：Employee, ResignationApplication
· 基数：一对多（One-to-Many）
· 描述：每个员工可以提交多个离职申请，每个离职申请只能对应一个员工。
· 参与类型：
· 员工：部分参与（一个员工可以没有离职申请）
· 离职申请：全程参与（每个离职申请必须关联一个员工）

3.3.5 has（员工与离职人员账户）
· 参与实体：Employee, FormerEmployeeAccount
· 基数：一对多（One-to-Many）
· 描述：每个员工可以有多个离职人员账户，每个离职人员账户只能对应一个员工。
· 参与类型：
· 员工：部分参与（一个员工可以没有离职人员账户）
· 离职人员账户：全程参与（每个离职人员账户必须关联一个员工）

3.3.6 receives（员工与薪资账单）
· 参与实体：Employee, SalaryBill
· 基数：一对多（One-to-Many）
· 描述：每个员工可以有多个薪资账单，每个薪资账单只能对应一个员工。
· 参与类型：
· 员工：部分参与（一个员工可以没有薪资账单）
· 薪资账单：全程参与（每个薪资账单必须关联一个员工）

3.3.7 requests（员工与账单申请）
· 参与实体：Employee, BillApplication
· 基数：一对多（One-to-Many）
· 描述：每个员工可以提交多个账单申请，每个账单申请只能对应一个员工。
· 参与类型：
· 员工：部分参与（一个员工可以没有账单申请）
· 账单申请：全程参与（每个账单申请必须关联一个员工）

3.3.8 has（员工与薪资结构）
· 参与实体：Employee, SalaryStructure
· 基数：一对多（One-to-Many）
· 描述：每个员工可以有多个薪资结构，每个薪资结构只能对应一个员工。
· 参与类型：
· 员工：部分参与（一个员工可以没有薪资结构）
· 薪资结构：全程参与（每个薪资结构必须关联一个员工）

3.3.9 undergoes（员工与薪资调整）
· 参与实体：Employee, SalaryAdjustment
· 基数：一对多（One-to-Many）
· 描述：每个员工可以有多个薪资调整，每个薪资调整只能对应一个员工。
· 参与类型：
· 员工：部分参与（一个员工可以没有薪资调整）
· 薪资调整：全程参与（每个薪资调整必须关联一个员工）

3.3.10 earns（员工与奖金）
· 参与实体：Employee, Bonus
· 基数：一对多（One-to-Many）
· 描述：每个员工可以有多个奖金，每个奖金只能对应一个员工。
· 参与类型：
· 员工：部分参与（一个员工可以没有奖金）
· 奖金：全程参与（每个奖金必须关联一个员工）

3.3.11 records（员工与考勤记录）
· 参与实体：Employee, Attendance
· 基数：一对多（One-to-Many）
· 描述：每个员工可以有多个考勤记录，每个考勤记录只能对应一个员工。
· 参与类型：
· 员工：部分参与（一个员工可以没有考勤记录）
· 考勤记录：全程参与（每个考勤记录必须关联一个员工）

3.3.12 has（员工与扣除项）
· 参与实体：Employee, Deduction
· 基数：一对多（One-to-Many）
· 描述：每个员工可以有多个扣除项，每个扣除项只能对应一个员工。
· 参与类型：
· 员工：部分参与（一个员工可以没有扣除项）
· 扣除项：全程参与（每个扣除项必须关联一个员工）

3.3.13 receives（职位开放与申请）
· 参与实体：JobOpening, Application
· 基数：一对多（One-to-Many）
· 描述：每个职位开放可以有多个申请，每个申请只能对应一个职位开放。
· 参与类型：
· 职位开放：部分参与（一个职位开放可以没有申请）
· 申请：全程参与（每个申请必须关联一个职位开放）

3.3.14 submits（候选人与申请）
· 参与实体：Candidate, Application
· 基数：一对多（One-to-Many）
· 描述：每个候选人可以有多个申请，每个申请只能对应一个候选人。
· 参与类型：
· 候选人：部分参与（一个候选人可以没有申请）
· 申请：全程参与（每个申请必须关联一个候选人）
