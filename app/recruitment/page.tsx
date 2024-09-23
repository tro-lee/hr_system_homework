"use client";

import React, { useState, useEffect } from "react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Calendar,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function RecruitmentManagement() {
  const [activeTab, setActiveTab] = useState("job-openings");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [isGeneratingOffer, setIsGeneratingOffer] = useState(false);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchRecruitmentData();
  }, []);

  const fetchRecruitmentData = async () => {
    try {
      const response = await fetch("/api/recruitment");
      const data = await response.json();
      setJobOpenings(data.jobOpenings);
      setCandidates(data.candidates);
      setOffers(data.offers);
    } catch (error) {
      console.error("Error fetching recruitment data:", error);
    }
  };

  const filteredJobs = jobOpenings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === "all" ||
        job.organization.name === selectedDepartment)
  );

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.applications.some((app) =>
        app.jobOpening.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const filteredOffers = offers.filter(
    (offer) =>
      offer.application.candidate.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      offer.application.jobOpening.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleGenerateOffer = () => {
    setIsGeneratingOffer(true);
    // 模拟offer生成过程
    setTimeout(() => {
      setIsGeneratingOffer(false);
      // 更新offer状态
      const updatedOffers = offers.map((offer) =>
        offer.id === selectedOffer.id ? { ...offer, status: "待审批" } : offer
      );
      // 这里应该更新状态，但由于我们使用的是模拟数据，所以这步在这个例子中被省略
      setSelectedOffer({ ...selectedOffer, status: "待审批" });
    }, 2000);
  };

  const handleApproveOffer = () => {
    // 更新offer状态
    const updatedOffers = offers.map((offer) =>
      offer.id === selectedOffer.id ? { ...offer, status: "已批准" } : offer
    );
    // 这里应该更新状态，但由于我们使用的是模拟数据，所以这步在这个例子中被省略
    setSelectedOffer({ ...selectedOffer, status: "已批准" });
  };

  const handleSendOffer = () => {
    // 更新offer状态
    const updatedOffers = offers.map((offer) =>
      offer.id === selectedOffer.id ? { ...offer, status: "已发送" } : offer
    );
    // 这里应该更新状态，但由于我们使用的是模拟数据，所以这步在这个例子中被省略
    setSelectedOffer({ ...selectedOffer, status: "已发送" });
  };

  async function handleAcceptOffer(offerId: number) {
    try {
      const response = await fetch("/api/recruitment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: offerId,
          status: "accepted",
          isAccepted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to accept offer");
      }

      const data = await response.json();
      // 处理响应，例如更新UI或显示消息
      console.log(data.message);
      if (data.employee) {
        console.log("New employee created:", data.employee);
      }
    } catch (error) {
      console.error("Error accepting offer:", error);
      // 处理错误，例如显示错误消息
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">人才招聘管理系统</h1>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="job-openings">职位管理</TabsTrigger>
          <TabsTrigger value="candidates">候选人管理</TabsTrigger>
          <TabsTrigger value="offers">Offer管理</TabsTrigger>
        </TabsList>

        <TabsContent value="job-openings">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索职位..."
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
                  {jobOpenings.map((job) => (
                    <SelectItem key={job.id} value={job.organization.name}>
                      {job.organization.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 发布新职位
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>职位名称</TableHead>
                  <TableHead>所属部门</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>申请人数</TableHead>
                  <TableHead>面试人数</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.organization.name}</TableCell>
                    <TableCell>{job.status}</TableCell>
                    <TableCell>{job.applications.length}</TableCell>
                    <TableCell>
                      {
                        job.applications.filter(
                          (app) => app.interviews.length > 0
                        ).length
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedJob(job)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="candidates">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="搜索候选人..."
                className="pl-8 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 添加候选人
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>姓名</TableHead>
                  <TableHead>应聘职位</TableHead>
                  <TableHead>当前状态</TableHead>
                  <TableHead>下一步骤</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>{candidate.name}</TableCell>
                    <TableCell>
                      {candidate.applications
                        .map((app) => app.jobOpening.title)
                        .join(", ")}
                    </TableCell>
                    <TableCell>
                      {candidate.applications
                        .map((app) => app.status)
                        .join(", ")}
                    </TableCell>
                    <TableCell>
                      {candidate.applications
                        .map((app) => app.nextStep)
                        .join(", ")}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedCandidate(candidate)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                候选人详情 - {selectedCandidate?.name}
                              </DialogTitle>
                              <DialogDescription>
                                应聘职位:{" "}
                                {selectedCandidate?.applications
                                  .map((app) => app.jobOpening.title)
                                  .join(", ")}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">
                                  当前状态
                                </Label>
                                <Input
                                  id="status"
                                  value={selectedCandidate?.applications
                                    .map((app) => app.status)
                                    .join(", ")}
                                  className="col-span-3"
                                  readOnly
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="next-step"
                                  className="text-right"
                                >
                                  下��步骤
                                </Label>
                                <Input
                                  id="next-step"
                                  value={selectedCandidate?.applications
                                    .map((app) => app.nextStep)
                                    .join(", ")}
                                  className="col-span-3"
                                  readOnly
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="offers">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="搜索Offer..."
                className="pl-8 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 创建新Offer
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>候选人</TableHead>
                  <TableHead>职位</TableHead>
                  <TableHead>薪资范围</TableHead>
                  <TableHead>入职日期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell>{offer.application.candidate.name}</TableCell>
                    <TableCell>{offer.application.jobOpening.title}</TableCell>
                    <TableCell>{offer.salary}</TableCell>
                    <TableCell>
                      {offer.startDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{offer.status}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedOffer(offer)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                              <DialogTitle>
                                Offer详情 -{" "}
                                {selectedOffer?.application.candidate.name}
                              </DialogTitle>
                              <DialogDescription>
                                职位:{" "}
                                {selectedOffer?.application.jobOpening.title} |
                                状态: {selectedOffer?.status}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="salary-range"
                                  className="text-right"
                                >
                                  薪资范围
                                </Label>
                                <Input
                                  id="salary-range"
                                  value={selectedOffer?.salary}
                                  className="col-span-3"
                                  readOnly
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="start-date"
                                  className="text-right"
                                >
                                  入职日期
                                </Label>
                                <Input
                                  id="start-date"
                                  value={selectedOffer?.startDate.toLocaleDateString()}
                                  className="col-span-3"
                                  readOnly
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="offer-details"
                                  className="text-right"
                                >
                                  Offer详情
                                </Label>
                                <Textarea
                                  id="offer-details"
                                  className="col-span-3"
                                  rows={4}
                                  placeholder="Offer详细信息..."
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              {selectedOffer?.status === "待生成" && (
                                <Button
                                  onClick={handleGenerateOffer}
                                  disabled={isGeneratingOffer}
                                >
                                  {isGeneratingOffer
                                    ? "生成中..."
                                    : "生成Offer"}
                                </Button>
                              )}
                              {selectedOffer?.status === "待审批" && (
                                <Button onClick={handleApproveOffer}>
                                  <CheckCircle className="mr-2 h-4 w-4" />{" "}
                                  批准Offer
                                </Button>
                              )}
                              {selectedOffer?.status === "已批准" && (
                                <Button onClick={handleSendOffer}>
                                  <Mail className="mr-2 h-4 w-4" /> 发送Offer
                                </Button>
                              )}
                              {selectedOffer?.status === "已发送" && (
                                <Button
                                  onClick={() =>
                                    handleAcceptOffer(selectedOffer.id)
                                  }
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />{" "}
                                  接受Offer
                                </Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden">查看职位详情</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>职位详情 - {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              部门: {selectedJob?.organization.name} | 状态:{" "}
              {selectedJob?.status}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="job-description" className="text-right">
                职位描述
              </Label>
              <Textarea
                id="job-description"
                className="col-span-3"
                rows={4}
                placeholder="请输入职位描述..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="requirements" className="text-right">
                任职要求
              </Label>
              <Textarea
                id="requirements"
                className="col-span-3"
                rows={4}
                placeholder="请输入任职要求..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary-range" className="text-right">
                薪资范围
              </Label>
              <Input
                id="salary-range"
                className="col-span-3"
                placeholder="例如：15k-25k"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
