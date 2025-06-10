import { Button } from "@/components/ui/button"
import { Save, X } from "lucide-react"


export function ProfileActionsFeature({ onSave, onCancel }) {
  return (
    <div className="flex justify-end space-x-4 pt-6 border-t">
      <Button variant="outline" onClick={onCancel} className="flex items-center space-x-2">
        <X className="h-4 w-4" />
        <span>Cancel</span>
      </Button>
      <Button onClick={onSave} className="flex items-center space-x-2">
        <Save className="h-4 w-4" />
        <span>Save Changes</span>
      </Button>
    </div>
  )
}
