set -e

# Only run percy in master (including PRs); otherwise just cypress
# (Gotta ration our screenshots!)
if [ "$TRAVIS_BRANCH" = "master" ] 
then
  npx percy exec -- npx cypress run
else
  npx cypress run
fi
