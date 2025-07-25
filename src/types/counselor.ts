import { LucideIcon } from "lucide-react";

export interface CounselorInterface {
  id: string;
  name: string;
  title: string;
  type: string;
  description: string;
  icon: LucideIcon;
  color: string;
  lightColor: string;
  borderColor: string;
  iconBgColor: string;
  features: string[];
  approach: string;
  personality: string;
}
