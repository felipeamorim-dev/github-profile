import { Repo } from './../../models/repo';
import { Profile } from './../../models/profile';
import { GithubService } from './../../services/github.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showProfile: boolean = false;

  formulario: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]]
  });

  profile: Profile = {
    login: '',
    id: 0,
    avatar_url: '',
    url: '',
    type: '',
    name: '',
    company: '',
    location: '',
    email: '',
    bio: '',
    public_repos: 0,
    followers: 0,
    following: 0,
    repos_url: '',
    repo: []
  };

  constructor(private formBuilder: FormBuilder, private githubService: GithubService) { }

  ngOnInit(): void {
  }

  submit(){
    this.showProfile = false;
    this.githubService.username(this.formulario.value.username).subscribe({
      next: data => {
        this.profile.id = data.id;
        this.profile.login = data.login;
        this.profile.avatar_url = data.avatar_url;
        this.profile.name = data.name;
        this.profile.email = data.email;
        this.profile.location = data.location;
        this.profile.url = data.url;
        this.profile.type = data.type;
        this.profile.company = data.company;
        this.profile.public_repos = data.public_repos;
        this.profile.repos_url = data.repos_url;
        this.profile.bio = data.bio;
        this.profile.followers = data.followers;
        this.profile.following = data.following;
        this.repo(this.profile.repos_url);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private repo(repos_url: string){
    this.githubService.repo(repos_url).subscribe({
      next: data => {
        data.forEach((element: any) => {
          const repositorio = {
            name: '',
            html_url: ''
          }

          if(this.profile.repo.length < 3) {
            repositorio.name = element.name;
            repositorio.html_url = element.html_url;
            this.profile.repo.push(repositorio);
          }
        });
        this.showProfile = true;
        this.clean();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private clean(){
    this.formulario.reset();
  }
}
