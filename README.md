# web-adventures

May the journey be joined.

###todo for bare-minimum canvas/dom interactions

####general
- potentially convert to JSPM and ES6
- it will be less hackable, but the modules will be really helpful for forks :/
- generalize interaction model for either DOM or canvas

####hero

- rename to "hero"
- diagonal movement
- attack animation hook
- collision detection for attack and movement

###extended todo for generalizable canvas web game 

####general

- quadtree for collision detection

####hero

- factor out NPC mixin for non-combatants and all sprites
- factor out character mixin for enemies and heroes
- factor out keyboard interactions mixin for the hero(s) to inherit
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
