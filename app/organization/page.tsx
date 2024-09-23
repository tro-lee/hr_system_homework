"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Employee {
  id: number;
  name: string;
}

interface Position {
  id: number;
  name: string;
}

interface EmployeeOrganization {
  employee: Employee;
  position: Position;
  hireDate: string;
  phone: string;
}

interface OrganizationNode {
  id: number;
  name: string;
  children?: OrganizationNode[];
  employeeOrganizations?: EmployeeOrganization[];
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
        {node.employeeOrganizations && (
          <span className="ml-2 text-sm text-gray-500">
            ({node.employeeOrganizations.length} 名员工)
          </span>
        )}
      </div>
      {isExpanded && (
        <div className="ml-6">
          {node.children &&
            node.children.map((child) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          {node.employeeOrganizations && (
            <div className="mt-2">
              {node.employeeOrganizations.map((eo, index) => (
                <div key={index} className="flex items-center py-1">
                  <User className="h-3 w-3 mr-2" />
                  <span className="text-sm">{eo.employee.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    - {eo.position.name}
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

const defaultOrgStructure: OrganizationNode = {
  id: 0,
  name: "默认组织",
  children: [],
  employeeOrganizations: [],
};

export default function OrganizationStructure() {
  const [orgStructure, setOrgStructure] = useState<OrganizationNode | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

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
          setOrgStructure(defaultOrgStructure); // 使用默认组织结构
        }
      } catch (error) {
        console.error("Error fetching organization structure:", error);
        setOrgStructure(defaultOrgStructure); // 出错时也使用默认组织结构
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrgStructure();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
