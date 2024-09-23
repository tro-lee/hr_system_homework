'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Users, Building, DollarSign, UserPlus, Send, ChevronRight } from 'lucide-react'

// 模拟数据
const employeeCount = 1250
const departmentCount = 8
const salarySummary = {
  total: 5250000,
  average: 42000,
  increase: 3.5
}
const candidateCount = 85
const offerCount = 12

const salaryData = [
  { month: '1月', amount: 5000000 },
  { month: '2月', amount: 5100000 },
  { month: '3月', amount: 5250000 },
]

export function DashboardComponent() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">人力资源管理系统</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              员工总数
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employeeCount}</div>
            <p className="text-xs text-muted-foreground">
              较上月增长 2.5%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              组织总数
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentCount}</div>
            <p className="text-xs text-muted-foreground">
              包含部门和子部门
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              候选人数量
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidateCount}</div>
            <p className="text-xs text-muted-foreground">
              本月新增 15 人
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              发放Offer数
            </CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offerCount}</div>
            <p className="text-xs text-muted-foreground">
              本月接受率 75%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>当季薪资发放情况</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>薪资概览</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    总薪资支出
                  </p>
                  <p className="text-2xl font-bold">
                    ¥{salarySummary.total.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    平均薪资
                  </p>
                  <p className="text-2xl font-bold">
                    ¥{salarySummary.average.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    同比增长
                  </p>
                  <p className="text-2xl font-bold">
                    {salarySummary.increase}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button>
          查看详细报告 <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}