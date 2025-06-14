
import { Switch } from "@/components/ui/switch"

import { useState } from "react"
import { Plus, Edit, Trash2, ExternalLink, Github, Linkedin, Twitter, Globe, Youtube, Instagram } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label"

export function SocialLinks({ tutor }) {
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "LinkedIn", url: "https://www.linkedin.com/in/saroj-kumar-sah-74a495276/", icon: Linkedin },
    { id: 2, platform: "GitHub", url: "https://github.com/Sarojshah1", icon: Github },
  ])

  const [isAddingLink, setIsAddingLink] = useState(false)
  const [newLink, setNewLink] = useState({ platform: "", url: "" })

  const availablePlatforms = [
    { name: "LinkedIn", icon: Linkedin, color: "text-blue-600" },
    { name: "GitHub", icon: Github, color: "text-gray-800 dark:text-gray-200" },
    { name: "Twitter", icon: Twitter, color: "text-blue-400" },
    { name: "YouTube", icon: Youtube, color: "text-red-600" },
    { name: "Instagram", icon: Instagram, color: "text-pink-600" },
    { name: "Personal Website", icon: Globe, color: "text-green-600" },
  ]

  const handleAddLink = () => {
    if (newLink.platform && newLink.url) {
      const platform = availablePlatforms.find((p) => p.name === newLink.platform)
      setSocialLinks((prev) => [
        ...prev,
        {
          id: Date.now(),
          platform: newLink.platform,
          url: newLink.url,
          icon: platform?.icon || Globe,
        },
      ])
      setNewLink({ platform: "", url: "" })
      setIsAddingLink(false)
    }
  }

  const handleDeleteLink = (id) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Social Media & Links</CardTitle>
              <CardDescription>Connect your social media accounts and websites</CardDescription>
            </div>
            <Button
              onClick={() => setIsAddingLink(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Link Form */}
          {isAddingLink && (
            <div className="border rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-medium">Add New Social Link</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <select
                    id="platform"
                    value={newLink.platform}
                    onChange={(e) => setNewLink((prev) => ({ ...prev, platform: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select platform</option>
                    {availablePlatforms.map((platform) => (
                      <option key={platform.name} value={platform.name}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={newLink.url}
                    onChange={(e) => setNewLink((prev) => ({ ...prev, url: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddLink} size="sm">
                  Add Link
                </Button>
                <Button onClick={() => setIsAddingLink(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Existing Social Links */}
          <div className="space-y-3">
            {socialLinks.map((link) => {
              const platform = availablePlatforms.find((p) => p.name === link.platform)
              const IconComponent = link.icon

              return (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${platform?.color || "text-gray-600"}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{link.platform}</h3>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        {link.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteLink(link.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {socialLinks.length === 0 && !isAddingLink && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No social links added yet</p>
              <p className="text-sm">Connect your social media accounts to showcase your online presence</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile and social links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Public Profile</h3>
              <p className="text-sm text-gray-500">Make your profile visible to everyone</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Show Social Links</h3>
              <p className="text-sm text-gray-500">Display social media links on your public profile</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Contact Information</h3>
              <p className="text-sm text-gray-500">Allow students to see your contact details</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Professional Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Portfolio</CardTitle>
          <CardDescription>Showcase your work and achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio Website</Label>
              <Input
                id="portfolio"
                type="url"
                placeholder="https://yourportfolio.com"
                defaultValue="https://sarahjohnson.dev"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume/CV Link</Label>
              <Input id="resume" type="url" placeholder="https://link-to-your-resume.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio</Label>
            <textarea
              id="bio"
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Write a brief professional bio that will appear on your public profile..."
              defaultValue="Passionate educator and software engineer with 8+ years of experience in web development and data science. I specialize in teaching complex technical concepts in an accessible way, helping students build real-world projects and advance their careers."
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Save Social Links
        </Button>
      </div>
    </div>
  )
}
