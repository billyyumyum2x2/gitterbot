# pull down wiki files

# CD into wiki submodule
cd freeCodeCamp.wiki
git fetch
git checkout master
git pull origin master
cd ..

pwd

rm data/wiki/*

cp freeCodeCamp.wiki/deprecatedwiki/*.md data/wiki

#git add data/wiki
#git commit -am "wiki update and merge"
#git fetch
#git push -u
