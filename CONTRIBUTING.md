# Contributing

#### Table of Contents
* [Submissions](#submissions)
* [Documentation](#documentation)
* [General Coding Rules](#general-coding-rules)

### Submissions
To submit any type of change to a repository, please follow these steps:

1. Create a new branch for your submission, making sure master is up to date:
```
 git pull master
 git checkout -b fix/my-fix master
```
  - To help project administrators handle change requests please follow the naming
  conventions for changes:
    1. For features use **feature/my-new-feature**
    2. For bug fixes use **fix/my-fix**
    3. For general refactors use **users/<username>/my-refactor**

  _Not the use of the hypen as a word separator. Hyphen or underscores are preferred_

2. Test and build your changes using the repositories methods
3. Commit your changes to your branch
```
 git commit -a -m "feat(foo) adding foo bar"
```
  _use [standard version](https://github.com/conventional-changelog/standard-version)
  for commit message convention_

4. Push your changes to your remote branch
```
git push -u origin fix/my-fix
```
5. Create a pull request
6. If changes need to be made, commit those directly to your branch
  - Make sure you rebase  on master
```
git rebase master -i
git push -f`
```
7. Once your pull request is accepted and merged into master, you can delete your branch
```
git branch -d fix/my-fix
```

Some key points:
* Check for unnecessary whitespace with `git diff --check` before committing.
* Make sure your commit messages are in the proper format.
  - We use standard version to version our apps. Look on their website to determine the commit message convention
* Make sure you have added the necessary tests for your changes.
* Run **ALL** (Client and Server) tests and build to assure a faster pull request


### Documentation
* All public APIs must be documented in the code with the appropriate syntax. All comments must
be able to be extracted into a document that can be distributed.
