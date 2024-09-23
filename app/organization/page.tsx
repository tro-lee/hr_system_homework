"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";

// 更新组织结构数据，包含员工信息和职位
const initialOrgStructure = {
  id: 1,
  name: "公司总部",
  children: [
    {
      id: 2,
      name: "产品研发BU",
      children: [
        {
          id: 3,
          name: "移动产品BG",
          children: [
            {
              id: 4,
              name: "Android开发部",
              children: [
                {
                  id: 5,
                  name: "Android框架组",
                  employees: [
                    { name: "张三", position: "高级Android工程师" },
                    { name: "李四", position: "Android工程师" },
                  ],
                },
                {
                  id: 6,
                  name: "Android应用组",
                  employees: [
                    { name: "王五", position: "Android应用开发主管" },
                    { name: "赵六", position: "Android应用开发工程师" },
                  ],
                },
              ],
            },
            {
              id: 7,
              name: "iOS开发部",
              children: [
                {
                  id: 8,
                  name: "iOS框架组",
                  employees: [
                    { name: "孙七", position: "高级iOS工程师" },
                    { name: "周八", position: "iOS工程师" },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 9,
          name: "Web产品BG",
          children: [
            {
              id: 10,
              name: "前端开发部",
              children: [
                {
                  id: 11,
                  name: "React开发组",
                  employees: [
                    { name: "吴九", position: "高级前端工程师" },
                    { name: "郑十", position: "前端工程师" },
                  ],
                },
              ],
            },
            {
              id: 12,
              name: "后端开发部",
              children: [
                {
                  id: 13,
                  name: "Java开发组",
                  employees: [
                    { name: "冯十一", position: "后端架构师" },
                    { name: "蒋十二", position: "Java工程师" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 14,
      name: "质量保障BU",
      children: [
        {
          id: 15,
          name: "测试BG",
          children: [
            {
              id: 16,
              name: "自动化测试部",
              children: [
                {
                  id: 17,
                  name: "UI自动化组",
                  employees: [
                    { name: "韩十三", position: "高级测试工程师" },
                    { name: "杨十四", position: "测试工程师" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

interface Employee {
  name: string;
  position: string;
}

interface TreeNodeProps {
  node: {
    id: number;
    name: string;
    children?: TreeNodeProps["node"][];
    employees?: Employee[];
  };
  level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`ml-${level * 4}`}>
      <div className="flex items-center py-2">
        {node.children && node.children.length > 0 ? (
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 p-0 mr-1"
            onClick={toggleExpand}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <span className="w-6 h-6 mr-1"></span>
        )}
        <Users className="h-4 w-4 mr-2" />
        <span className="font-semibold">{node.name}</span>
        {node.employees && (
          <span className="ml-2 text-sm text-gray-500">
            ({node.employees.length} 名员工)
          </span>
        )}
      </div>
      {isExpanded && (
        <div className="ml-6">
          {node.children &&
            node.children.map((child) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          {node.employees && (
            <div className="mt-2">
              {node.employees.map((employee, index) => (
                <div key={index} className="flex items-center py-1">
                  <User className="h-3 w-3 mr-2" />
                  <span className="text-sm">{employee.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    - {employee.position}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function OrganizationStructure() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">组织架构管理</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <TreeNode node={initialOrgStructure} level={0} />
      </div>
    </div>
  );
}
