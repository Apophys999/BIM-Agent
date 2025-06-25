'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type Stakeholder = {
  role: string;
  name: string;
  company: string;
  email: string;
};

export default function BEPlannerForm() {
  const [formData, setFormData] = useState({
    projectName: '',
    projectId: '',
    clientName: '',
    location: '',
    projectType: '',
    startDate: '',
    endDate: ''
  });

  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    { role: 'Project Manager', name: '', company: '', email: '' },
    { role: 'BIM Manager', name: '', company: '', email: '' }
  ]);

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStakeholderChange = (
    index: number,
    field: keyof Stakeholder,
    value: string
  ) => {
    const updated = [...stakeholders];
    updated[index][field] = value;
    setStakeholders(updated);
  };

  const addStakeholder = () => {
    setStakeholders([...stakeholders, { role: '', name: '', company: '', email: '' }]);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log("Project Info:", formData);
    console.log("Stakeholders:", stakeholders);
    alert("Form submitted! Check the console.");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-10">
      {/* Project Info */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h1 className="text-2xl font-bold">BEPlanner – Project Info</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: "projectName", label: "Project Name" },
              { id: "projectId", label: "Project ID" },
              { id: "clientName", label: "Client Name" },
              { id: "location", label: "Location" },
              { id: "projectType", label: "Project Type" }
            ].map(({ id, label }) => (
              <div key={id}>
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  name={id}
                  value={(formData as any)[id]}
                  onChange={handleProjectChange}
                />
              </div>
            ))}
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleProjectChange}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleProjectChange}
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Stakeholders */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold">Project Stakeholders</h2>
          {stakeholders.map((person, index) => (
            <div key={index} className="grid sm:grid-cols-4 gap-4">
              <Input
                placeholder="Role"
                value={person.role}
                onChange={(e) => handleStakeholderChange(index, 'role', e.target.value)}
              />
              <Input
                placeholder="Name"
                value={person.name}
                onChange={(e) => handleStakeholderChange(index, 'name', e.target.value)}
              />
              <Input
                placeholder="Company"
                value={person.company}
                onChange={(e) => handleStakeholderChange(index, 'company', e.target.value)}
              />
              <Input
                placeholder="Email"
                value={person.email}
                onChange={(e) => handleStakeholderChange(index, 'email', e.target.value)}
              />
            </div>
          ))}
          <Button type="button" onClick={addStakeholder}>
            + Add Stakeholder
          </Button>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button type="submit" onClick={handleSubmit}>
          Submit All
        </Button>
      </div>
    </div>
  );
}
