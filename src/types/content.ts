export interface Entry {
  title: string;
  /** shown in parentheses after the title, e.g. "mesh.applied, 2026 to present" */
  meta: string;
  /** HTML allowed. Paragraphs are separated by a blank line. */
  body: string;
  link?: string;
}

export interface SiteContent {
  name: string;
  intro: string;
  bio: string;
  photo: string;
  social: { github: string; linkedin: string; email: string };
  githubUser: string;
  now: Entry[];
  research: Entry[];
  work: Entry[];
  writing: Entry[];
  talks: Entry[];
  code: Entry[];
}
