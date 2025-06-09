import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


export function ProfileBioFeature({ bio, onBioChange }) {
  const maxLength = 1000
  const remainingChars = maxLength - bio?.length

  return (
    <div className="space-y-2">
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        value={bio}
        onChange={(e) => onBioChange(e.target.value)}
        placeholder="Tell us about yourself..."
        className="min-h-[120px] resize-none"
        maxLength={maxLength}
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>Share a bit about yourself</span>
        <span className={remainingChars < 50 ? "text-orange-500" : ""}>{remainingChars} characters remaining</span>
      </div>
    </div>
  )
}
