import React from 'react';
import { Search, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function StudyGroupsHeader({ searchTerm, onSearchChange, onCreateGroup }) {
  return (
    <div className="bg-gradient-to-r from-[#49BBBD] to-[#3da5a7] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Study Groups</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join collaborative learning communities and accelerate your growth together
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search study groups..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-3 w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/70 focus:bg-white/20 focus:border-white/40"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>

            <Button onClick={onCreateGroup} className="bg-white text-[#49BBBD] hover:bg-white/90 font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
