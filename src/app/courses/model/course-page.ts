import { Courses } from "./courses";

export interface CoursePage {
  courses: Courses[];
  totalElements: number;
  totalPages: number;
}
