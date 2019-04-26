import { GithubApiService } from './GithubApiService'
import { User } from './User';
import { Repo } from './Repo';
import * as _ from 'lodash'

let svc: GithubApiService = new GithubApiService()

if(process.argv.length < 3) {
  console.log('必须有用户名')
}else {
  svc.getUserInfo(process.argv[2], (user: User) => {
    svc.getRepos(user.login, (repos: Repo[]) => {
      let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.forks_count * -1])
      user.repos = sortedRepos
      console.log(user)
    })
  })
}
