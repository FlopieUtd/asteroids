import atomPNG from "../images/atom.png";
import bulletPNG from "../images/bullet.png";
import energyPNG from "../images/energy.png";
import buckshotPNG from "../images/buckshot.png";

export const body = document.querySelector("body");
export const iconSize = 25;
export const minBulletSpeed = 24;
export const maxBulletSpeed = 6;
export const chanceOfUpgrade = 0.2;
export const canvas = document.getElementById("canvas");
export const context = canvas.getContext("2d");
export const pointsSpan = document.getElementById("points");
export const shieldTrack = document.getElementById("shield-track");
export const shieldBar = document.getElementById("shield-bar");
export const newAsteroidEveryNSeconds = 16;

canvas.width = body.clientWidth;
canvas.height = body.clientHeight;

export const bulletIcon = new Image(iconSize, iconSize);
bulletIcon.src = bulletPNG;

export const atomIcon = new Image(iconSize, iconSize);
atomIcon.src = atomPNG;

export const shieldIcon = new Image(iconSize, iconSize);
shieldIcon.src = energyPNG;

export const shotgunIcon = new Image(iconSize, iconSize);
shotgunIcon.src = buckshotPNG;
