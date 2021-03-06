import { unique } from '../../utils'
import { Repos } from '../../lib'

export type ContributorsConfigType = {
  repos: Array<string>
}

async function run(config: ContributorsConfigType) {
  const prList = await Repos.getPRList(config.repos)
  const forkList = await Repos.getContributorsForks(config.repos)
  const issueContributor = await Repos.getIssuesContributors()

  console.log('Unique contributors who have opened PRs:', unique(prList).length)
  console.log('Unique contributors who have forked Mojaloop repos: (this includes organizations)', unique(forkList).length)
  console.log('Unique contributors from Issues(created or assigned to issues)', unique(issueContributor).length)
  console.log('Unique contributors from PRs, Forks and Issues: ', unique(prList.concat(forkList.concat(issueContributor))).length)
}

export default {
  run,
}