import { Repo } from "./repo";

export interface Profile {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  type: string;
  name: string;
  company: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  repos_url: string;
  repo: Repo [];
}
