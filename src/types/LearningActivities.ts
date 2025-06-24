// Types for Learning Activities data structure

export interface StatItem {
  statName: string;
  value: number;
  trend: string;
  isRising: boolean;
}

export interface DataItem {
  name: string;
  value: number;
  trend: string;
  isRising: boolean;
}

export interface Activity {
  name: string;
  stats: StatItem[];
  data: DataItem[];
}

export interface LearningActivitiesResponse {
  success: boolean;
  result: {
    message: string;
    data: Activity[];
  };
  error: null | string;
}

export interface TooltipData {
  [activityName: string]: {
    stats?: { [statName: string]: string };
    data?: { [dataName: string]: string };
  };
}

export type DonutKey = "library" | "quizzes" | "ilt_vilt" | "courses";

export const activityKeyMap: Record<string, string> = {
  "Courses": "courses",
  "ILT": "ilt_vilt",
  "VILT": "ilt_vilt",
  "Quizzes": "quizzes",
  "Library": "library"
};

export const donutKeys: DonutKey[] = ["library", "quizzes", "ilt_vilt", "courses"];
