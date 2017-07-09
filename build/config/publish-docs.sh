REPO_PATH=git@github.com:dvabuzyarov/moq.ts.git
DOCS_PATH=docs
COMMIT_USER="Documentation Builder"
COMMIT_EMAIL="documentation@moq.ts"
CHANGESET=$(git rev-parse --verify HEAD)


rm -rf ${DOCS_PATH}
mkdir -p ${DOCS_PATH}
git clone -b gh-pages "${REPO_PATH}" --single-branch ${DOCS_PATH}

cd ${DOCS_PATH}
git rm -rf .
cd -

npm run docs


cd ${DOCS_PATH}
git add .
git config user.name "${COMMIT_USER}"
git config user.email "${COMMIT_EMAIL}"
git commit -m "Automated documentation build for changeset ${CHANGESET}."
git push origin gh-pages
cd -
