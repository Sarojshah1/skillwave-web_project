import { useState } from "react"
import { Edit, Plus, Trash2, Briefcase, GraduationCap, Award, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Badge } from "@/components/ui/badge"

export function ProfessionalInfo({ tutor }) {
  const [isEditing, setIsEditing] = useState(false)
  const [experience, setExperience] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Corp",
      duration: "2020 - Present",
      description: "Leading development of web applications using React and Node.js",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      duration: "2018 - 2020",
      description: "Built scalable web applications and mentored junior developers",
    },
  ])

  const [education, setEducation] = useState([
    {
      id: 1,
      degree: "Master of Computer Science",
      institution: "Stanford University",
      year: "2018",
      description: "Specialized in Machine Learning and Data Science",
    },
    {
      id: 2,
      degree: "Bachelor of Computer Science",
      institution: "UC Berkeley",
      year: "2016",
      description: "Graduated Magna Cum Laude",
    },
  ])

  const [certifications, setCertifications] = useState([
    { id: 1, name: "AWS Certified Solutions Architect", issuer: "Amazon", year: "2023" },
    { id: 2, name: "Google Cloud Professional", issuer: "Google", year: "2022" },
    { id: 3, name: "React Developer Certification", issuer: "Meta", year: "2021" },
  ])

  const [skills, setSkills] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Machine Learning",
    "Data Science",
    "AWS",
    "Docker",
    "MongoDB",
    "PostgreSQL",
  ])

  return (
    <div className="space-y-6">
      {/* Work Experience */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Work Experience
              </CardTitle>
              <CardDescription>Your professional work history</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </CardTitle>
              <CardDescription>Your educational background</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certifications
              </CardTitle>
              <CardDescription>Your professional certifications and achievements</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{cert.issuer}</p>
                    <p className="text-xs text-gray-500">{cert.year}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Skills & Expertise
              </CardTitle>
              <CardDescription>Your technical and professional skills</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
              >
                {skill}
                <Button variant="ghost" size="icon" className="h-4 w-4 ml-2 hover:bg-red-100 hover:text-red-600">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
