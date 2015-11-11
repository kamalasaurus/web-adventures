# web-adventures

May the journey be joined.

### how to launch

1. `git clone` this repository
2. `npm install -g jspm`
3. `npm install -g live-server`
4. `jspm install` in root directory
5. `live-server` in root directory

web-adventures is now a ES6/JSPM project! To work with it in development
mode, make sure to download a recent version of node via nvm. Since this is intended to just be a client, bundle up all the assets with jspm's `sfx-bundle` and drop the dist into
a backend of your choosing!

####hero

- attack animation hook
- collision detection for attack and movement

####general

- quadtree for collision detection

####hero

- add optional hero portrait

####enemies

- AI for pathing
- AI for attacking
- various sprites for various creatures

####player

- inventory
- bow and arrow action
- consumeable items

####map

- tilesets
- navigable and unnavigable (water, cliffs, house walls, trees)
- transmissable (water, unlike other unnavigable terrain, permits arrows to fly through)
- map editor create an image w/ colored squares for terrain type (land, water, trees, cliff, doors) and a map w/ pseudo-random tileset is generated.
- figure out way to create castles/houses/treehouses with similar approach.

