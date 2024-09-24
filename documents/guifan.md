八 .规范化检查和说明
8.1. 第一范式 (1NF)
定义：一个表在第一范式中，要求每个字段都必须是原子性的，即每个字段只能包含一个值，且每个记录都是唯一的。
检查：
· 所有表的每个字段都只包含单一值。
· 没有重复的列。
说明：
· Organization 表：id、name、parentId 都是原子值。
· Employee 表：id、name、position、hireDate、phone、organizationId 都是原子值。
· JobOpening 表：id、title、description、requirements、salaryRange、status、createdAt、updatedAt、organizationId 都是原子值。
· Candidate 表：id、name、email、phone 都是原子值。
· Application 表：id、candidateId、jobOpeningId、status、nextStep、createdAt、updatedAt 都是原子值。
· Interview 表：id、applicationId、scheduledAt、feedback、status 都是原子值。
· Offer 表：id、applicationId、salary、startDate、status、isAccepted、createdAt、updatedAt 都是原子值。
· ResignationApplication 表：id、employeeId、reason、status、createdAt、updatedAt 都是原子值。
· FormerEmployeeAccount 表：id、employeeId、email、phone、lastWorkingDay、createdAt、updatedAt 都是原子值。
· SalaryBill 表：id、employeeId、amount、billDate、status、createdAt、updatedAt 都是原子值。
· BillApplication 表：id、salaryBillId、applicantId、reason、status、createdAt、updatedAt 都是原子值。
· SalaryStructure 表：id、employeeId、baseSalary、allowances、benefits、startDate、endDate、createdAt、updatedAt 都是原子值。
· SalaryAdjustment 表：id、employeeId、oldSalary、newSalary、adjustmentDate、reason、approvedBy、createdAt、updatedAt 都是原子值。
· Bonus 表：id、employeeId、amount、type、description、issueDate、createdAt、updatedAt 都是原子值。
· Attendance 表：id、employeeId、date、checkIn、checkOut、status、note、createdAt、updatedAt 都是原子值。
· Deduction 表：id、employeeId、salaryBillId、type、amount、description、createdAt、updatedAt 都是原子值。

8.2. 第二范式 (2NF)
定义：一个表在第二范式中，要求它必须满足第一范式，并且所有非主属性必须完全依赖于主键。
检查：
· 确保没有部分依赖，即非主键字段不能依赖于主键的一部分。
说明：
· Organization 表：所有字段（name、parentId）都完全依赖于 id。
· Employee 表：所有字段（name、position、hireDate、phone、organizationId）都完全依赖于 id。
· JobOpening 表：所有字段（title、description、requirements、salaryRange、status、createdAt、updatedAt、organizationId）都完全依赖于 id。
· Candidate 表：所有字段（name、email、phone）都完全依赖于 id。
· Application 表：所有字段（candidateId、jobOpeningId、status、nextStep、createdAt、updatedAt）都完全依赖于 id。
· Interview 表：所有字段（applicationId、scheduledAt、feedback、status）都完全依赖于 id。
· Offer 表：所有字段（applicationId、salary、startDate、status、isAccepted、createdAt、updatedAt）都完全依赖于 id。
· ResignationApplication 表：所有字段（employeeId、reason、status、createdAt、updatedAt）都完全依赖于 id。
· FormerEmployeeAccount 表：所有字段（employeeId、email、phone、lastWorkingDay、createdAt、updatedAt）都完全依赖于 id。
· SalaryBill 表：所有字段（employeeId、amount、billDate、status、createdAt、updatedAt）都完全依赖于 id。
· BillApplication 表：所有字段（salaryBillId、applicantId、reason、status、createdAt、updatedAt）都完全依赖于 id。
· SalaryStructure 表：所有字段（employeeId、baseSalary、allowances、benefits、startDate、endDate、createdAt、updatedAt）都完全依赖于 id。
· SalaryAdjustment 表：所有字段（employeeId、oldSalary、newSalary、adjustmentDate、reason、approvedBy、createdAt、updatedAt）都完全依赖于 id。
· Bonus 表：所有字段（employeeId、amount、type、description、issueDate、createdAt、updatedAt）都完全依赖于 id。
· Attendance 表：所有字段（employeeId、date、checkIn、checkOut、status、note、createdAt、updatedAt）都完全依赖于 id。
· Deduction 表：所有字段（employeeId、salaryBillId、type、amount、description、createdAt、updatedAt）都完全依赖于 id。

8.3. 第三范式 (3NF)
定义：一个表在第三范式中，要求它必须满足第二范式，并且所有非主属性必须直接依赖于主键，而不是依赖于其他非主属性。
检查：
· 确保没有传递依赖，即非主键字段不能依赖于其他非主键字段。
说明：
· Organization 表：所有字段直接依赖于 id，没有传递依赖。
· Employee 表：所有字段直接依赖于 id，没有传递依赖。
· JobOpening 表：所有字段直接依赖于 id，没有传递依赖。
· Candidate 表：所有字段直接依赖于 id，没有传递依赖。
· Application 表：所有字段直接依赖于 id，没有传递依赖。
· Interview 表：所有字段直接依赖于 id，没有传递依赖。
· Offer 表：所有字段直接依赖于 id，没有传递依赖。
· ResignationApplication 表：所有字段直接依赖于 id，没有传递依赖。
· FormerEmployeeAccount 表：所有字段直接依赖于 id，没有传递依赖。
· SalaryBill 表：所有字段直接依赖于 id，没有传递依赖。
· BillApplication 表：所有字段直接依赖于 id，没有传递依赖。
· SalaryStructure 表：所有字段直接依赖于 id，没有传递依赖。
· SalaryAdjustment 表：所有字段直接依赖于 id，没有传递依赖。
· Bonus 表：所有字段直接依赖于 id，没有传递依赖。
· Attendance 表：所有字段直接依赖于 id，没有传递依赖。
· Deduction 表：所有字段直接依赖于 id，没有传递依赖。

8.4. 规范化总结
· Organization 表：
· 主键：id
· 字段：name、parentId
· 满足 1NF、2NF 和 3NF。
· Employee 表：
· 主键：id
· 字段：name、position、hireDate、phone、organizationId
· 满足 1NF、2NF 和 3NF。
· JobOpening 表：
· 主键：id
· 字段：title、description、requirements、salaryRange、status、createdAt、updatedAt、organizationId
· 满足 1NF、2NF 和 3NF。
· Candidate 表：
· 主键：id
· 字段：name、email、phone
· 满足 1NF、2NF 和 3NF。
· Application 表：
· 主键：id
· 字段：candidateId、jobOpeningId、status、nextStep、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
· Interview 表：
· 主键：id
· 字段：applicationId、scheduledAt、feedback、status
· 满足 1NF、2NF 和 3NF。
· Offer 表：
· 主键：id
· 字段：applicationId、salary、startDate、status、isAccepted、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
· ResignationApplication 表：
· 主键：id
· 字段：employeeId、reason、status、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
· FormerEmployeeAccount 表：
· 主键：id
· 字段：employeeId、email、phone、lastWorkingDay、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
· SalaryBill 表：
· 主键：id
· 字段：employeeId、amount、billDate、status、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
· BillApplication 表：
· 主键：id
· 字段：salaryBillId、applicantId、reason、status、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
· SalaryStructure 表：
· 主键：id
· 字段：employeeId、baseSalary、allowances、benefits、startDate、endDate、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
· SalaryAdjustment 表：
· 主键：id
· 字段：employeeId、oldSalary、newSalary、adjustmentDate、reason、approvedBy、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
· Bonus 表：
· 主键：id
· 字段：employeeId、amount、type、description、issueDate、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
· Attendance 表：
· 主键：id
· 字段：employeeId、date、checkIn、checkOut、status、note、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
· Deduction 表：
· 主键：id
· 字段：employeeId、salaryBillId、type、amount、description、createdAt、updatedAt
· 满足 1NF、2NF 和 3NF。
