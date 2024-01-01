# Flappy Bird

## Description
Based on the hit phone app Flappy Bird!

## Overview
The idea of the game is to keep the bird afloat and avoid pipes.

## How It Works
I used the Phaser game engine for Javascript. The game comprises of a scrolling background and pipes. This is handled by changing their co-ordinates constantly. Collision between the bird and objects is handled by the game engines physics functionality. You can setup a 'collider' object and add the objects and callback function for when a collision happens. The bird's angle changes as it fly's up and down, this is handled by accessing the Y velocity and multiplying it by 0.15. Math.min is used to choose the smallest value between 90 and Y velocity * 0.15.  

## Final Thoughts
Flappy Bird is a good project to get used to moving objects and managing collisions. Phaser is a nice library to work with.
