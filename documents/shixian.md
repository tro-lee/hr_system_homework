六 . 数据库设计与实现

6.11. 安全性验证
· 验证:
· 确保存储过程和触发器的输入参数符合预期，避免 SQL 注入等安全问题。
· 使用参数化查询来防止 SQL 注入攻击。
· 对敏感数据进行加密存储，特别是密码等信息。
· 实施最小权限原则，确保每个用户和角色只能访问其所需的最小数据集。
· 定期审计数据库访问日志，监控异常活动。
· 使用预编译语句来执行动态 SQL，而不是直接拼接 SQL 字符串。
· 在触发器中添加适当的错误处理和日志记录机制。

```sql
-- 示例：使用参数化查询的存储过程
DELIMITER //
CREATE PROCEDURE GetEmployeeById(IN p_id INT)
BEGIN
    SELECT * FROM Employee WHERE id = p_id;
END //
DELIMITER ;

-- 调用存储过程
CALL GetEmployeeById(1);
```

通过实施这些安全措施，可以显著提高数据库的安全性和可靠性。

6.12. 完整性约束设计

1. 实体完整性约束
   - 主键约束：确保每个表都有唯一标识的主键。
   - 唯一性约束：确保某些字段或字段组合的值在表中是唯一的。

```sql
-- 为 Employee 表的 email 字段添加唯一性约束
ALTER TABLE Employee ADD CONSTRAINT uk_employee_email UNIQUE (email);

-- 为 Candidate 表的 email 字段添加唯一性约束
ALTER TABLE Candidate ADD CONSTRAINT uk_candidate_email UNIQUE (email);
```

2. 参照完整性约束
   - 外键约束：确保表之间的关系完整性。

```sql
-- 为 Employee 表添加外键约束
ALTER TABLE Employee
ADD CONSTRAINT fk_employee_organization
FOREIGN KEY (organizationId) REFERENCES Organization(id);

-- 为 Application 表添加外键约束
ALTER TABLE Application
ADD CONSTRAINT fk_application_candidate
FOREIGN KEY (candidateId) REFERENCES Candidate(id);

ALTER TABLE Application
ADD CONSTRAINT fk_application_jobopening
FOREIGN KEY (jobOpeningId) REFERENCES JobOpening(id);
```

3. 域完整性约束
   - CHECK 约束：确保字段值满足特定条件。
   - DEFAULT 约束：为字段指定默认值。
   - NOT NULL 约束：确保字段不能为空。

```sql
-- 为 Employee 表的 hireDate 字段添加 CHECK 约束
ALTER TABLE Employee
ADD CONSTRAINT chk_employee_hiredate
CHECK (hireDate <= CURRENT_DATE);

-- 为 SalaryBill 表的 amount 字段添加 CHECK 约束
ALTER TABLE SalaryBill
ADD CONSTRAINT chk_salarybill_amount
CHECK (amount > 0);

-- 为 JobOpening 表的 status 字段添加 DEFAULT 约束
ALTER TABLE JobOpening
ALTER COLUMN status SET DEFAULT 'open';

-- 为 Employee 表的 name 字段添加 NOT NULL 约束
ALTER TABLE Employee
MODIFY COLUMN name VARCHAR(255) NOT NULL;
```

4. 业务规则约束
   - 使用触发器或存储过程来实现复杂的业务规则约束。

```sql
-- 创建触发器，确保员工的薪资不会降低
DELIMITER //
CREATE TRIGGER prevent_salary_decrease
BEFORE UPDATE ON SalaryStructure
FOR EACH ROW
BEGIN
    IF NEW.baseSalary < OLD.baseSalary THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Salary cannot be decreased';
    END IF;
END //
DELIMITER ;
```

5. 用户自定义完整性约束
   - 使用存储过程或应用程序逻辑来实现特定的业务需求。

```sql
-- 创建存储过程，确保部门人数不超过限制
DELIMITER //
CREATE PROCEDURE check_department_size(IN p_organizationId INT, IN p_maxSize INT)
BEGIN
    DECLARE current_size INT;

    SELECT COUNT(*) INTO current_size
    FROM Employee
    WHERE organizationId = p_organizationId;

    IF current_size >= p_maxSize THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Department size limit exceeded';
    END IF;
END //
DELIMITER ;

-- 在添加新员工时调用此存储过程
CALL check_department_size(1, 50);
```

通过实施这些完整性约束，可以确保数据的一致性、准确性和有效性。这些约束有助于防止错误数据的输入，维护数据之间的关系，并强制执行业务规则。在设计数据库时，应根据具体的业务需求和数据特性来选择和实施适当的完整性约束。
