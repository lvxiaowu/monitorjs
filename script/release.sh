set -e

if [[ -z $1 ]]; then
	echo "Enter new version: "
	read VERSION
else
	VERSION=$1
fi

read -p "Releasing v$VERSION - are you sure? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
	echo "Releasing v$VERSION ..."

	# build 
	npm run build
	# VERSION=$VERSION npm run build

	# version
	npm version $VERSION --no-git-tag-version 

	# commit
	git add -A
	git commit -m "[build] v$VERSION"

	# tag
	git tag -a "v$VERSION" -m "v$VERSION"

	# publish
	npm publish --access public --registry https://registry.npmjs.org

	# push
	# git push origin refs/tags/v$VERSION
	git push origin 
fi