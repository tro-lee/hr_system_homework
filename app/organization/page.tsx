"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Employee {
  id: number;
  name: string;
  position: string; // 新增字段
  hireDate: string;
  phone: string;
}

interface OrganizationNode {
  id: number;
  name: string;
  children?: OrganizationNode[];
  employees?: Employee[]; // 更新字段名
}

interface TreeNodeProps {
  node: OrganizationNode;
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
              {node.employees.map((employee) => (
                <div key={employee.id} className="flex items-center py-1">
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
  const [orgStructure, setOrgStructure] = useState<OrganizationNode | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrgStructure() {
      try {
        const response = await fetch("/api/organization");
        if (!response.ok) {
          throw new Error("Failed to fetch organization structure");
        }
        const data = await response.json();
        if (data.length > 0) {
          setOrgStructure(data[0]); // 使用第一个组织作为根节点
        } else {
          setOrgStructure(null); // 无组织数据
        }
      } catch (error) {
        console.error("Error fetching organization structure:", error);
        setError("Error fetching organization structure");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrgStructure();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">组织架构管理</h1>
      <div className="bg-white rounded-lg shadow p-4">
        {orgStructure ? (
          <TreeNode node={orgStructure} level={0} />
        ) : (
          <div>无组织数据</div>
        )}
      </div>
    </div>
  );
}
