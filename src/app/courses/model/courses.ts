import { Lesson } from "./lesson";

export interface Courses {
  _id: string;
  name: string;
  category: string;
  lessons?: Lesson[];
}
