"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Download, Eye, Filter } from "lucide-react";

// 模拟薪资数据
const salaryData = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "张三",
    department: "技术部",
    position: "高级工程师",
    baseSalary: 20000,
    bonus: 5000,
    deductions: 2000,
    netSalary: 23000,
    paymentDate: "2023-05-01",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "李四",
    department: "市场部",
    position: "市场经理",
    baseSalary: 18000,
    bonus: 3000,
    deductions: 1800,
    netSalary: 19200,
    paymentDate: "2023-05-01",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "王五",
    department: "人力资源部",
    position: "HR专员",
    baseSalary: 15000,
    bonus: 2000,
    deductions: 1500,
    netSalary: 15500,
    paymentDate: "2023-05-01",
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "赵六",
    department: "财务部",
    position: "财务主管",
    baseSalary: 22000,
    bonus: 4000,
    deductions: 2200,
    netSalary: 23800,
    paymentDate: "2023-05-01",
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "钱七",
    department: "销售部",
    position: "销售代表",
    baseSalary: 12000,
    bonus: 8000,
    deductions: 1200,
    netSalary: 18800,
    paymentDate: "2023-05-01",
  },
];

export default function SalaryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const filteredSalaryData = salaryData.filter(
    (employee) =>
      (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDepartment === "all" ||
        employee.department === selectedDepartment)
  );

  const totalSalary = filteredSalaryData.reduce(
    (sum, employee) => sum + employee.netSalary,
    0
  );
  const averageSalary = totalSalary / filteredSalaryData.length || 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">薪资管理系统</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="搜索员工或ID..."
              className="pl-8 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择部门" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有部门</SelectItem>
              <SelectItem value="技术部">技术部</SelectItem>
              <SelectItem value="市场部">市场部</SelectItem>
              <SelectItem value="人力资源部">人力资源部</SelectItem>
              <SelectItem value="财务部">财务部</SelectItem>
              <SelectItem value="销售部">销售部</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> 高级筛选
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> 导出报表
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">总薪资支出</h3>
          <p className="text-2xl font-bold text-blue-600">
            ¥ {totalSalary.toLocaleString()}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">平均薪资</h3>
          <p className="text-2xl font-bold text-green-600">
            ¥{" "}
            {averageSalary.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">员工数量</h3>
          <p className="text-2xl font-bold text-purple-600">
            {filteredSalaryData.length}
          </p>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>员工ID</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>部门</TableHead>
              <TableHead>职位</TableHead>
              <TableHead>基本工资</TableHead>
              <TableHead>奖金</TableHead>
              <TableHead>扣除</TableHead>
              <TableHead>净工资</TableHead>
              <TableHead>发放日期</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSalaryData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>¥ {employee.baseSalary.toLocaleString()}</TableCell>
                <TableCell>¥ {employee.bonus.toLocaleString()}</TableCell>
                <TableCell>¥ {employee.deductions.toLocaleString()}</TableCell>
                <TableCell className="font-semibold">
                  ¥ {employee.netSalary.toLocaleString()}
                </TableCell>
                <TableCell>{employee.paymentDate}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          薪资详情 - {selectedEmployee?.name}
                        </DialogTitle>
                        <DialogDescription>
                          员工ID: {selectedEmployee?.employeeId}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="base-salary" className="text-right">
                            基本工资
                          </Label>
                          <Input
                            id="base-salary"
                            value={selectedEmployee?.baseSalary}
                            className="col-span-3"
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="bonus" className="text-right">
                            奖金
                          </Label>
                          <Input
                            id="bonus"
                            value={selectedEmployee?.bonus}
                            className="col-span-3"
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="deductions" className="text-right">
                            扣除
                          </Label>
                          <Input
                            id="deductions"
                            value={selectedEmployee?.deductions}
                            className="col-span-3"
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="net-salary" className="text-right">
                            净工资
                          </Label>
                          <Input
                            id="net-salary"
                            value={selectedEmployee?.netSalary}
                            className="col-span-3"
                            readOnly
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
